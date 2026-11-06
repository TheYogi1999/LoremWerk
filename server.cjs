/* Optional local HTTP server. No dependencies or telemetry. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,host='127.0.0.1',port=Number(process.env.PORT||4173);
const allow=new Set(['/','/index.html','/styles.css','/src/main.js','/src/terms.js','/src/engine.js','/icon.svg','/manifest.webmanifest','/service-worker.js']);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
 const target=new URL(req.url,'http://'+host+':'+port).pathname;
 if(!allow.has(target)){res.writeHead(404);res.end('Not Found');return;}
 const f=path.join(root,target==='/'?'index.html':target.slice(1));
 fs.readFile(f,(err,bytes)=>{if(err){res.writeHead(404);res.end('Not Found');return;}
 res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(bytes);});
}).listen(port,host,()=>console.log('LoremWerk v0.2.0: http://'+host+':'+port));
