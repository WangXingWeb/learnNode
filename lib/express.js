/**
 * Created by xingzai on 2019/5/10.
 */
var url=require('url');
var path=require('path');
var fs=require('fs');
var ejs=require('ejs');

function express(){
    var tasks=[];
    var app=function (req,res) {
        makeQuery(req);
        makeResponse(res);
        addRender(req,res,app);

        var i=0;

        function next() {
            var task=tasks[i++];
            if(!task){
                return
            }
            if(task.routePath===null || url.parse(req.url,true).pathname===task.routePath){
                task.middleWare(req,res,next);
            }else{
                next();
            }
        }

        next();
    }
    app.use=function(routePath,middleWare){
        if(typeof routePath ==='function'){
            middleWare=routePath;
            routePath=null;
        }
        tasks.push({
            routePath:routePath,
            middleWare:middleWare
        });
    }

    app.data={};
    app.set=function (key,value) {
        app.data[key]=value;
    }
    app.get=function (key) {
        return app.data[key];
    }

    return app;
}

express.static=function (staticPath) {
    return function (req,res,next) {
        var pathObj=url.parse(req.url,true);
        var filePath=path.join(staticPath,pathObj.pathname);
        console.log(filePath);
        fs.readFile(filePath,'binary',function (err,fileContent) {
            if(err){
                next();
            }else{
                res.writeHead(200,'OK');
                res.write(fileContent,'binary');
                res.end();
            }
        });
    }
}

module.exports=express;


function makeQuery(req) {
    var pathObj=url.parse(req.url,true);
    req.query=pathObj.query;
}
function makeResponse(res) {
    res.send=function (toSend) {
        if(typeof toSend==='string'){
            res.end(toSend);
        }
        if(typeof toSend === 'object'){
            res.end(JSON.stringify(toSend));
        }
        if(typeof toSend === 'number'){
            res.writeHead(toSend,arguments[1]);
            res.end();
        }
    }
}
function addRender(req,res,app) {
    res.render=function (tplPath,data) {
        var fullpath=path.join(app.get('views'),tplPath);
        ejs.renderFile(fullpath,data,{},function (err,str) {
            if(err){
                res.writeHead(503,'System error');
                res.end();
            }else{
                res.setHeader('contnet-type','text/html');
                res.writeHead(200,'OK');
                res.write(str);
                res.end();
            }
        })
    }
}

