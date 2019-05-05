var http=require('http');
var server=http.createServer(function (request,response) {
    response.setHeader('Content-Type','text/css;charset=utf-8');
    //response.writeHead(200,  {'Content-Type':  'text/html;  charset=utf-8'});
    response.writeHead(200,'haha');
    response.write('<html><head><meta charset="utf-8"/></head>');
    response.write('<body>');
    response.write('<h1>你好</h1>');
    response.write('</body>');
    response.write('</html>');
    response.end();
});
console.log('Server  running  at  http://127.0.0.1:9000/');
server.listen(9000);
