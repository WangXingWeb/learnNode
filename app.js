/**
 * Created by xingzai on 2019/5/9.
 */

var express=require('./lib/express');
var path=require('path');
var bodyParser=require('./lib/body-parser');

var app=express();


app.use(bodyParser);
app.use(express.static(path.join(__dirname,'static')));
app.set('views',path.join(__dirname,'views'));
app.use(function (req,res,next) {
    console.log('middleware 1');
    next();
});
app.use(function (req,res,next) {
    console.log('middleware 2');
    next();
});
app.use('/hello',function (req,res) {
    console.log('/hello');
    res.send('hello world');
});
app.use('/',function (req,res) {
    console.log('/hello');
    res.send('index');
});
app.use('/about',function (req,res) {
    res.render('about.html',{
        title:'学习使人进步',
        author:'王星',
        date:'2019.5.12',
        content:'学习node，转型全栈工程师'
    })
})
app.use('/getWeather',function (req,res) {
    res.send({url:'/getWeather',city:req.query.city});
});

app.use(function (req,res) {
    //res.send('404');
   res.send(404,'haha Not Found');
});

module.exports=app;

var express=require('express');
var app =express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var questions=[
    {
        data:213,
        num:444,
        age:12
    },
    {
        data:456,
        num:678,
        age:13
    }];
//写个接口123
app.get('/123',function(req,res){
    res.status(200),
    res.json(questions)
});
//配置服务端口
var server = app.listen(9000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host);
    console.log(port);

    console.log('Example app listening at http://%s:%s', host, port);
});

