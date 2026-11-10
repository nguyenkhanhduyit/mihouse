// Local test harness (not shipped): offline React UMD preview + CMS API proxy.
import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.json':'application/json'};
http.createServer((req,res)=>{
 if(req.url.startsWith('/api/')){
  const proxy=http.request({hostname:'127.0.0.1',port:5551,path:req.url,method:req.method,headers:{...req.headers,host:'localhost:555'}},response=>{res.writeHead(response.statusCode,response.headers);response.pipe(res)});
  proxy.on('error',e=>{res.writeHead(502).end(e.message)});req.pipe(proxy);return;
 }
 const pathname=new URL(req.url,'http://localhost').pathname;
 const target=pathname==='/admin'?'/__qa_admin.html':pathname==='/'?'/__qa__home.html':pathname;
 let file=path.resolve(root,'.'+decodeURIComponent(target));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end('Not found');return;}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.QA_PORT||555),'127.0.0.1',()=>console.log('QA at http://localhost:'+String(process.env.QA_PORT||555)));
