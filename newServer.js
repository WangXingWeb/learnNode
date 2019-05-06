var http=require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
function staticRoot (staticPath,req,res) {
    var pathObj=url.parse(req.url,true);
    if(pathObj.pathname==='/'){
        pathObj.pathname+='views/index.html';
    }
    var filePath=path.join(staticPath,pathObj.pathname);
    console.log(filePath);
    fs.readFile(filePath,'binary',function (err,fileContent) {
       if(err){
           console.log('404');
           console.log('kkkk');
           res.writeHead(404,'not found');
           res.end('<h1>404 not found</h1>');
       }else{
           res.writeHead(200,'OK');
           res.write(fileContent,'binary');
           res.end();
       }
    });
    //var fileContent=fs.readFileSync(filePath,'binary');
}
var server=http.createServer(function (request,response) {
    if(request.url!=="/favicon.ico"){  //清除第2此访问
        staticRoot(__dirname,request,response);
    }
});
console.log('Server  running  at  http://127.0.0.1:9000/');
server.listen(9000);
