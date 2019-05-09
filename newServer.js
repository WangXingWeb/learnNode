var http=require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');

var routes={
    '/a':function (req,res) {
        console.log('a');
        res.end(JSON.stringify(req.query));
    },
    '/b':function (req,res) {
        res.end('match /b');
    },
    '/a/c':function (req,res) {
        res.end('match /a/c');
    },
    '/search':function (req,res) {
        console.log(req.body);
        console.log('$$$$$$$$$$$');
        res.end('username='+req.body.username+',password='+req.body.password);
    }
}

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
function parseBody(body){
    console.log(body);
    var obj={};
    body.split('&').forEach(function (str) {
        obj[str.split('=')[0]]=str.split('=')[1];
    })
    return obj;
}
var server=http.createServer(function (request,response) {
    if(request.url!=="/favicon.ico"){  //清除第2此访问
        var pathObj=url.parse(request.url,true);
        var handleFn=routes[pathObj.pathname];
        console.log(request.url);
        console.log(pathObj);
        if(handleFn){
            request.query=pathObj.query;
            var body='';
            request.on('data',function (chunk) {
                body+=chunk;
            }).on('end',function () {
                request.body=parseBody(body);
                handleFn(request,response);
            })
        }else{
            staticRoot(__dirname,request,response);
        }
    }
});

console.log('Server  running  at  http://127.0.0.1:9000/');
server.listen(9000);
