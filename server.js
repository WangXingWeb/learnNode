var http=require('http');
var url=require('url');
var router=require('./moudels/router');
http.createServer(function  (request,  response)  {
    //response.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
    if(request.url!=="/favicon.ico"){  //清除第2此访问
        var pathname=url.parse(request.url).pathname;
        pathname=pathname.replace(/\//,'');//替换掉前面的/
        if(pathname==''){
            pathname='index';
        }
        console.log(pathname);
        try{
            router[pathname](request,response);
        }catch(err){
             console.log('用户输入了一个不存在的链接');
            router.unfind(request,response);
        }



    }
}).listen(8000);
console.log('Server  running  at  http://127.0.0.1:8000/');