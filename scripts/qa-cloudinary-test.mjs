// Offline integration smoke test: API + Cloudinary signed request shape, NO real credentials.
import assert from 'node:assert/strict';import crypto from 'node:crypto';import os from 'node:os';import fs from 'node:fs';import path from 'node:path';
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mh-cms-'));
process.env.CMS_DB_PATH=path.join(tmp,'content.json');
process.env.CMS_UPLOAD_PATH=path.join(tmp,'uploads');
process.env.ADMIN_PASSWORD='qa-only-test-password-never-ship';
process.env.CLOUDINARY_URL='cloudinary://test-key:test-secret@test-cloud';
delete process.env.CLOUDINARY_CLOUD_NAME;delete process.env.CLOUDINARY_API_KEY;delete process.env.CLOUDINARY_API_SECRET;
const calls=[];
globalThis.fetchCloudinaryOriginal=globalThis.fetch;
globalThis.fetch=async(input,options)=>{
 const url=String(input);
 if(!url.startsWith('https://api.cloudinary.com/'))return globalThis.fetchCloudinaryOriginal(input,options);
 const form=options.body, params=['public_id','timestamp','invalidate'].filter(n=>form.has(n)).sort().map(k=>`${k}=${form.get(k)}`).join('&');
 const signature=crypto.createHash('sha1').update(params+'test-secret').digest('hex');
 assert.equal(form.get('signature'),signature,'Cloudinary signature mismatch');
 assert.equal(form.get('api_key'),'test-key');
 calls.push({url,filename:form.get('file')?.name||null,file:typeof form.get('file')==='string'?form.get('file'):null,hasBlob:form.get('file') instanceof Blob});
 const result=url.endsWith('/destroy')?{result:'ok'}:{secure_url:`https://res.cloudinary.com/test-cloud/image/upload/${form.get('public_id')}.webp`,public_id:form.get('public_id'),resource_type: form.get('file') instanceof Blob&&form.get('file').type.startsWith('video/')?'video':'image',width:400,height:300};
 return new Response(JSON.stringify(result),{status:200,headers:{'Content-Type':'application/json'}});
};
const {createServer}=await import('../server/index.mjs');const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
async function request(path,method='GET',body,headers={}){
 const r=await globalThis.fetchCloudinaryOriginal(base+path,{method,body,headers:{'X-CMS-Request':'1',...headers}});return r;
}
try{
 let r=await request('/api/health');assert.equal((await r.json()).cloudinaryReady,true,'CLOUDINARY_URL not parsed');
 r=await request('/api/admin/state');assert.equal(r.status,401);
 r=await request('/api/admin/login','POST',JSON.stringify({password:process.env.ADMIN_PASSWORD}),{'Content-Type':'application/json'});assert.equal(r.status,200);const cookie=r.headers.get('set-cookie').split(';')[0];
 const auth={cookie};
 r=await request('/api/admin/media-import','POST',JSON.stringify({sourceUrl:'https://mihousespa.com/thumbs/example.webp'}),{'Content-Type':'application/json',...auth});assert.equal(r.status,200);const imported=await r.json();assert.equal(calls.at(-1).file,'https://mihousespa.com/thumbs/example.webp');assert.ok(imported.url.includes('res.cloudinary.com'));
 r=await request('/api/admin/media?filename=photo.png','POST',new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,0]),{'Content-Type':'application/octet-stream',...auth});assert.equal(r.status,200);const uploaded=await r.json();assert.equal(calls.at(-1).hasBlob,true);
 r=await request('/api/admin/media/'+encodeURIComponent(uploaded.id),'DELETE',null,auth);assert.equal(r.status,200);assert.ok(calls.at(-1).url.endsWith('/image/destroy'));
 r=await request('/api/admin/state','GET',null,auth);const state=await r.json();assert.equal(state.media.length,1);assert.equal(state.mediaMap['https://mihousespa.com/thumbs/example.webp'],imported.url);
 console.log(JSON.stringify({passed:true, checks:['health','auth','URL signing','remote Cloudinary import FormData','binary upload FormData','Cloudinary destroy signing','DB persistence'],cloudinaryCalls:calls.length},null,2));
}finally{server.close();fs.rmSync(tmp,{recursive:true,force:true});}
