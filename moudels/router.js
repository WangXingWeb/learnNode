var optfile=require('./optfile');
var url=require('url');
var querystring=require('querystring');
function  getRecall(req,res){
    res.writeHead(200,    {'Content-Type':    'text/html;    charset=utf-8'});
    function  recall(data){
        res.write(data);
        res.end('');//不写则没有http协议尾
    }
    return  recall;
}
module.exports={
    index:function(req,res){
        recall  =  getRecall(req,res);
        optfile.readfile('./views/index.html',recall);
    },
    login:function(req,res){
        recall=getRecall(req,res);
        optfile.readfile('./views/login.html',recall);
    },
    zhuce:function(req,res){
        recall  =  getRecall(req,res);
        optfile.readfile('./views/register.html',recall);
    },
    unfind:function (req,res) {
        recall  =  getRecall(req,res);
        optfile.readfile('./views/404.html',recall);
    },
    showImg:function(req,res){
        res.writeHead(200,    {'Content-Type':'image/jpeg'});
        optfile.readImg('./img/1.png',res);
    },
    loginMethod:function (req,res) {
        var that=this;
        //--------get方式接收参数----------------
        /**
         console.log('####################');
         console.log(req.url);
         var rdata=url.parse(req.url,true).query;
         console.log(rdata);
         console.log(rdata['name']);
         */
        var post='';//定义了一个post变量，用于暂存请求体的信息
        req.on('data',function(chunk){        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            console.log(chunk);
            post  +=  chunk;

        });
        req.on('end', function(){
            console.log(post);
            post = querystring.parse(post);
            console.log(post.name);
            if(post.name=='xingzai'){
                console.log('555');
                that.index(req,res);
            }
        });
        console.log(post);
    }
}