import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function loadDotEnv(){const p=path.join(ROOT,'.env');if(!fs.existsSync(p))return;for(const line of fs.readFileSync(p,'utf8').split(/\r?\n/)){const m=line.match(/^\s*([A-Z_][A-Z_0-9]*)\s*=\s*(.*)\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');}}
loadDotEnv();
// Cloudinary also documents CLOUDINARY_URL=cloudinary://KEY:SECRET@CLOUD_NAME.
// Parse exclusively on the server. Never return these values from an API.
function initializeCloudinaryFromUrl(){
 if(!process.env.CLOUDINARY_URL)return;
 try{
  const u=new URL(process.env.CLOUDINARY_URL);
  if(u.protocol!=='cloudinary:'||!u.hostname||!u.username||!u.password)throw Error('bad URL');
  process.env.CLOUDINARY_CLOUD_NAME ||= decodeURIComponent(u.hostname);
  process.env.CLOUDINARY_API_KEY ||= decodeURIComponent(u.username);
  process.env.CLOUDINARY_API_SECRET ||= decodeURIComponent(u.password);
 }catch{console.warn('[CMS] CLOUDINARY_URL không hợp lệ. Kiểm tra .env (không ghi khóa ra log).')}
}
initializeCloudinaryFromUrl();
const PORT=Number(process.env.CMS_PORT||5551),DB=process.env.CMS_DB_PATH?path.resolve(process.env.CMS_DB_PATH):path.join(ROOT,'server/data/content.json'),UPLOAD=process.env.CMS_UPLOAD_PATH?path.resolve(process.env.CMS_UPLOAD_PATH):path.join(ROOT,'public/uploads');
const DEFAULT={version:1,settings:{brand:'Mi House Spa',description:'Gội đầu dưỡng sinh - Massage body - Nail',phone:'0767882407',email:'nguyenquynhdiem1988@gmail.com',address:'43 đường Quang Trung, phường Gò Vấp, Thành phố Hồ Chí Minh',facebook:'https://www.facebook.com/mihousespa/',tiktok:'',contactLink:'https://zalo.me/0767882407',bookingLink:'https://zalo.me/0767882407',trainingNailTitle:'Đào tạo Nail',trainingNailImage:'',trainingHairTitle:'Đào tạo Gội đầu',trainingHairImage:'',trainingMassageTitle:'Đào tạo Massage',trainingMassageImage:'',maps:'https://maps.app.goo.gl/FGYh7DnPTGSz6qNc8',primary:'#8f624a',background:'#f8f3ed',reducedMotion:false},overrides:{},blocks:{},articles:[],services:[],prices:[],media:[],mediaMap:{},pageMeta:{},navigation:[]};
const sessions=new Map();const failures=new Map();
function readDb(){try{return {...structuredClone(DEFAULT),...JSON.parse(fs.readFileSync(DB,'utf8'))};}catch{return structuredClone(DEFAULT)}}
let db=readDb();
function save(){fs.mkdirSync(path.dirname(DB),{recursive:true});const file=DB+'.'+process.pid+'.tmp';fs.writeFileSync(file,JSON.stringify(db,null,2));fs.renameSync(file,DB);}
function send(res,code,data,headers={}){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(data));}
function cookie(req,name){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='))?.slice(name.length+1)||'';}
function authed(req){const token=cookie(req,'mh_admin');const s=sessions.get(token);if(!s)return false;if(s<Date.now()){sessions.delete(token);return false}return true;}
function requestAllowed(req){if(req.method==='GET'||req.method==='HEAD')return true;const origin=req.headers.origin;if(origin){try{const u=new URL(origin);const h=(req.headers.host||'').split(':')[0];if(u.hostname!==h&&!(u.hostname==='localhost'&&h==='127.0.0.1')&&!(u.hostname==='127.0.0.1'&&h==='localhost'))return false;}catch{return false}}return req.headers['x-cms-request']==='1';}
async function body(req,max=5*1024*1024){let bytes=0;const chunks=[];for await (const c of req){bytes+=c.length;if(bytes>max){const e=new Error('Tập tin/dữ liệu vượt giới hạn');e.code=413;throw e}chunks.push(c)}return Buffer.concat(chunks)}
async function json(req){const raw=await body(req);return JSON.parse(raw.toString('utf8')||'{}')}
const safeText=(v,max=30000)=>typeof v==='string'?v.slice(0,max):'';
const safeUrl=(v)=>{if(typeof v!=='string'||v.length>3000)return '';if(v.startsWith('/')&&!v.startsWith('//'))return v;try{const u=new URL(v);return ['https:','http:','tel:','mailto:'].includes(u.protocol)?u.href:''}catch{return ''}};
function safeDb(x){const out=structuredClone(DEFAULT);if(!x||typeof x!=='object')return out;
 if(x.settings&&typeof x.settings==='object')for(const key of Object.keys(out.settings)){const v=x.settings[key];if(typeof out.settings[key]==='boolean')out.settings[key]=Boolean(v);else if(typeof v==='string')out.settings[key]=v.slice(0,2000)}
 if(x.overrides&&typeof x.overrides==='object'){for(const [route,records] of Object.entries(x.overrides).slice(0,150)){if(!/^(?:\/[\w\-/?=&%]*|@navigation|@footer)$/.test(route)||!records||typeof records!=='object')continue;out.overrides[route]={};for(const [key,value] of Object.entries(records).slice(0,900)){if(!/^\d{1,5}$/.test(key)||!value||typeof value!=='object')continue;out.overrides[route][key]={text:safeText(value.text,20000),src:safeUrl(value.src),href:safeUrl(value.href),hidden:Boolean(value.hidden),alt:safeText(value.alt,300),editText:Boolean(value.editText),editSrc:Boolean(value.editSrc),editHref:Boolean(value.editHref)};}}}
 for(const field of ['blocks','pageMeta','mediaMap'])if(x[field]&&typeof x[field]==='object'&&!Array.isArray(x[field]))out[field]=x[field];
 for(const field of ['articles','services','prices','media','navigation'])if(Array.isArray(x[field]))out[field]=x[field].slice(0,2000);
 out.version=Number(x.version||1);return out;}
function credentialsReady(){return Boolean(process.env.CLOUDINARY_CLOUD_NAME&&process.env.CLOUDINARY_API_KEY&&process.env.CLOUDINARY_API_SECRET&&process.env.CLOUDINARY_API_SECRET!=='PASTE_SECRET_HERE')}
async function uploadCloudinary(data,filename,remoteUrl){const cloud=process.env.CLOUDINARY_CLOUD_NAME,apiKey=process.env.CLOUDINARY_API_KEY,secret=process.env.CLOUDINARY_API_SECRET;
 const timestamp=Math.floor(Date.now()/1000),publicId='mi-house/'+Date.now()+'-'+crypto.randomBytes(5).toString('hex');
 const toSign=`public_id=${publicId}&timestamp=${timestamp}${secret}`;
 const signature=crypto.createHash('sha1').update(toSign).digest('hex');
 const form=new FormData();form.set('timestamp',String(timestamp));form.set('public_id',publicId);form.set('api_key',apiKey);form.set('signature',signature);
 if(remoteUrl)form.set('file',remoteUrl);else form.set('file',new Blob([data],{type:detectMime(filename)}),filename);
 const result=await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/auto/upload`,{method:'POST',body:form,signal:AbortSignal.timeout(30000)});
 const resp=await result.json();if(!result.ok||!resp.secure_url)throw Error(resp.error?.message||'Cloudinary upload failed');return {url:resp.secure_url,publicId:resp.public_id,resourceType:resp.resource_type,width:resp.width,height:resp.height};}
async function destroyCloudinary(item){
 if(!item?.publicId||!credentialsReady()||item.publicId.startsWith('local/'))return;
 const cloud=process.env.CLOUDINARY_CLOUD_NAME, apiKey=process.env.CLOUDINARY_API_KEY,secret=process.env.CLOUDINARY_API_SECRET;
 const timestamp=Math.floor(Date.now()/1000), publicId=item.publicId;
 const signature=crypto.createHash('sha1').update(`invalidate=true&public_id=${publicId}&timestamp=${timestamp}${secret}`).digest('hex');
 const form=new FormData();form.set('public_id',publicId);form.set('timestamp',String(timestamp));form.set('invalidate','true');form.set('api_key',apiKey);form.set('signature',signature);
 const resourceType=item.resourceType==='video'?'video':'image';
 const response=await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/${resourceType}/destroy`,{method:'POST',body:form,signal:AbortSignal.timeout(30000)});
 const obj=await response.json();if(!response.ok||!['ok','not found'].includes(obj.result))throw Error(obj.error?.message||`Cloudinary không xóa được (${obj.result||response.status})`);
}
function validMediaBytes(data,mime){
 if(!data||data.length<12)return false;
 if(mime==='image/png')return data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
 if(mime==='image/jpeg')return data[0]===255&&data[1]===216&&data[2]===255;
 if(mime==='image/gif')return data.subarray(0,4).toString('ascii')==='GIF8';
 if(mime==='image/webp')return data.subarray(0,4).toString('ascii')==='RIFF'&&data.subarray(8,12).toString('ascii')==='WEBP';
 if(mime==='image/avif')return data.subarray(4,12).toString('ascii').includes('ftypavif')||data.subarray(4,16).toString('ascii').includes('ftypavis');
 if(mime==='video/webm')return data.subarray(0,4).equals(Buffer.from([0x1a,0x45,0xdf,0xa3]));
 if(mime==='video/mp4'||mime==='video/quicktime')return data.subarray(4,8).toString('ascii')==='ftyp';
 return false;
}
function detectMime(name){const ext=path.extname(name).toLowerCase();return {'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.avif':'image/avif','.mp4':'video/mp4','.webm':'video/webm','.mov':'video/quicktime'}[ext]||'application/octet-stream';}
async function handler(req,res){const u=new URL(req.url,'http://localhost');const pathname=u.pathname;
 try{
 if(pathname==='/api/health'&&req.method==='GET')return send(res,200,{ok:true,cloudinaryReady:credentialsReady(),adminConfigured:!!process.env.ADMIN_PASSWORD});
 if(pathname==='/api/public'&&req.method==='GET')return send(res,200,{settings:db.settings,overrides:db.overrides,blocks:db.blocks,articles:db.articles.filter(a=>a.status!=='draft'),services:db.services,prices:db.prices,mediaMap:db.mediaMap,pageMeta:db.pageMeta,navigation:db.navigation});
 if(!pathname.startsWith('/api/admin/'))return send(res,404,{error:'Không tìm thấy API'});
 if(!requestAllowed(req))return send(res,403,{error:'Yêu cầu khác nguồn hoặc thiếu xác nhận'});
 if(pathname==='/api/admin/login'&&req.method==='POST'){
  if(!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD==='CHANGE_THIS_TO_A_LONG_RANDOM_PASSWORD')return send(res,503,{error:'Cần cấu hình ADMIN_PASSWORD trong .env trên máy chủ'});
  const key=req.socket.remoteAddress||'unknown';const info=failures.get(key);if(info&&info.n>=8&&Date.now()-info.t<900000)return send(res,429,{error:'Quá nhiều lần đăng nhập sai, thử lại sau 15 phút'});
  const {password}=await json(req);const expected=crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD).digest(),given=crypto.createHash('sha256').update(typeof password==='string'?password:'').digest();
  if(!crypto.timingSafeEqual(expected,given)){failures.set(key,{n:(info?.n||0)+1,t:Date.now()});return send(res,401,{error:'Mật khẩu không đúng'})}
  failures.delete(key);const token=crypto.randomBytes(32).toString('hex');sessions.set(token,Date.now()+8*3600000);
  return send(res,200,{ok:true},{'Set-Cookie':`mh_admin=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=28800${req.socket.encrypted||req.headers['x-forwarded-proto']==='https'?'; Secure':''}`});
 }
 if(!authed(req))return send(res,401,{error:'Chưa đăng nhập hoặc phiên đã hết hạn'});
 if(pathname==='/api/admin/logout'&&req.method==='POST'){sessions.delete(cookie(req,'mh_admin'));return send(res,200,{ok:true},{'Set-Cookie':'mh_admin=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0'});}
 if(pathname==='/api/admin/session'&&req.method==='GET')return send(res,200,{ok:true,cloudinaryReady:credentialsReady()});
 if(pathname==='/api/admin/state'&&req.method==='GET')return send(res,200,db);
 if(pathname==='/api/admin/state'&&req.method==='PUT'){const x=await json(req);db=safeDb(x);save();return send(res,200,{ok:true});}
 if(pathname==='/api/admin/media'&&req.method==='POST'){
  const filename=path.basename(u.searchParams.get('filename')||'photo.webp').replace(/[^\w.\-]/g,'_').slice(0,140);const mime=detectMime(filename);if(mime==='application/octet-stream')return send(res,415,{error:'Chỉ chấp nhận JPG, PNG, WEBP, GIF, AVIF, MP4, WEBM, MOV'});
  const data=await body(req,30*1024*1024);if(!validMediaBytes(data,mime))return send(res,415,{error:'Nội dung tập tin không phù hợp với định dạng hình ảnh/video đã chọn'});
  let media;if(credentialsReady()){media=await uploadCloudinary(data,filename);}else{fs.mkdirSync(UPLOAD,{recursive:true});const id=crypto.randomBytes(12).toString('hex');const name=id+path.extname(filename).toLowerCase();fs.writeFileSync(path.join(UPLOAD,name),data);media={url:'/uploads/'+name,publicId:'local/'+id,resourceType:mime.startsWith('video/')?'video':'image'};}
  const item={id:crypto.randomUUID(),name:filename,createdAt:new Date().toISOString(),...media};db.media.unshift(item);save();return send(res,200,item);
 }
 if(pathname.startsWith('/api/admin/media/')&&req.method==='DELETE'){
  const id=decodeURIComponent(pathname.slice('/api/admin/media/'.length));
  const item=db.media.find(m=>m.id===id);
  if(!item)return send(res,404,{error:'Không thấy media'});
  await destroyCloudinary(item);
  if(item.publicId?.startsWith('local/')&&item.url?.startsWith('/uploads/')){
   const target=path.resolve(UPLOAD,path.basename(item.url));
   if(target.startsWith(UPLOAD+path.sep))fs.rmSync(target,{force:true});
  }
  db.media=db.media.filter(m=>m.id!==id);
  for(const [url,mapped] of Object.entries(db.mediaMap)){if(mapped===item.url)delete db.mediaMap[url]}
  save();return send(res,200,{ok:true});
 }
 if(pathname==='/api/admin/media-import'&&req.method==='POST'){
  if(!credentialsReady())return send(res,412,{error:'Cấu hình CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY và CLOUDINARY_API_SECRET trong .env trước'});
  const input=await json(req);const sourceUrl=safeUrl(input.sourceUrl);if(!/^https?:\/\//.test(sourceUrl))return send(res,400,{error:'URL ảnh/video phải dùng HTTP(S)'});
  const media=await uploadCloudinary(null,'remote',sourceUrl);const item={id:crypto.randomUUID(),name:sourceUrl.split('/').pop()?.slice(0,140)||'imported',sourceUrl,createdAt:new Date().toISOString(),...media};db.media.unshift(item);db.mediaMap[sourceUrl]=media.url;save();return send(res,200,item);
 }
 return send(res,404,{error:'Không tìm thấy chức năng'});
 }catch(error){console.error('[cms]',error.message);return send(res,error.code===413?413:500,{error:error.code===413?'Dữ liệu vượt kích thước cho phép':'Máy chủ gặp lỗi: '+error.message.slice(0,150)})}}
export function createServer(){return http.createServer((req,res)=>{if(req.method==='OPTIONS')return send(res,405,{error:'Method not allowed'});handler(req,res)})}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){createServer().listen(PORT,'127.0.0.1',()=>console.log(`[CMS] API http://127.0.0.1:${PORT} | ${process.env.ADMIN_PASSWORD?'Đã cấu hình mật khẩu':'CHƯA có ADMIN_PASSWORD trong .env'} | Cloudinary ${credentialsReady()?'ready':'chưa cấu hình'}`));}
