var fs = require("fs");
var optfile=require('./optfile');
var url=require('url');
var querystring=require('querystring');
var async=require('async');
var connectSQL=require('./connectSQL');
var OptPool = require('./sqlpool');
var events=require('./event');
var  UserBean  =  require('./UserBean');
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
        var readerStream = fs.createReadStream('./file/input.txt');
        readerStream.setEncoding('UTF8');
        var data = '';
        readerStream.on('data', function(chunk) {
            data += chunk;
        });
        var writerStream = fs.createWriteStream('./file/output.txt');
        readerStream.on('end',function(){
            writerStream.write(data,'UTF8');
            writerStream.end();
        });
        writerStream.on('finish', function() {
            console.log("写入完成。");
        });
        recall  =  getRecall(req,res);
        optfile.readfile('./views/index.html',recall);
    },
    video:function(req,res){
        recall  =  getRecall(req,res);
        optfile.readfile('./views/video.html',recall);
    },
    login:function(req,res){
        //connectSQL.insert([88,52]);
        //connectSQL.delect('88');
        //events.createEventfun();

        //recall=getRecall(req,res);
        //optfile.readfile('./views/login.html',recall);
        user  =  new  UserBean();
        user.eventEmit.once('zhuceSuc',function(uname,pwd){
            res.write('注册成功');
            console.log('传来uname:'+uname);
            console.log('传来pwd:'+pwd);
            user.login(req,res);
            res.end('');

        });//注册监听
        user.zhuce(req,res);
    },
    zhuce:function(req,res){
        /**
        function exec(){
            async.waterfall(
                [
                    function(done){
                        ii=0;
                        setInterval(function(){
                            console.log("aaa="+new Date());
                            ii++;
                            if(ii==3){
                                clearInterval(this);
                                done(null,'one完毕');
                            }
                        },1000);
                    },
                    function(preValue,done){
                        jj=0;
                        setInterval(function(){
                            console.log(preValue+"="+new Date());
                            jj++;
                            if(jj==3){
                                clearInterval(this);
                                done(null,preValue+',two完毕');
                            }
                        },1000);

                    }
                ],function(err,rs){
                    console.log(err);
                    console.log(rs);
                }
            )
        }
        exec();
        ***/
        var optPool = new OptPool();
        var pool = optPool.getPool();
        pool.getConnection(function(err,conn){
            //----插入
            var userAddSql = 'insert into user (uname,pwd) values(?,?)';
            var param = ['eee','eee'];
            conn.query(userAddSql,param,function(err,rs){
                if(err){
                    console.log('insert err:',err.message);
                    return;
                }
                console.log('insert success');
                //conn.release(); //放回连接池
            })
            //查询
            conn.query('SELECT * from user', function(err, rs) {
                if (err) {
                    console.log('[query] - :'+err);
                    return;
                }
                for(var i=0;i<rs.length;i++){
                    console.log(rs[i].uname);
                }
                conn.release(); //放回连接池
            });
        });




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
            function recall(data){
                var dataStr = data.toString();
                dataStr = dataStr.replace(/{name}/,post.name);
                res.write(dataStr);
                res.end('');//不写则没有http协议尾
            }
            optfile.readfile('./views/index.html',recall);
            /**
            if(post.name=='xingzai'){
                console.log('555');

                that.index(req,res);
            }
             */
        });
        console.log(post);
    }
}