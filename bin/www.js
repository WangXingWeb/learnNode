/**
 * Created by xingzai on 2019/5/12.
 */
var app=require('../app');
var http=require('http');
console.log(app);
http.createServer(app).listen(8080);
console.log('open http://localhost:8080');