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



