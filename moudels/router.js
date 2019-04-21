var  optfile  =  require('./optfile');
function  getRecall(req,res){
    res.writeHead(200,    {'Content-Type':    'text/html;    charset=utf-8'});
    function  recall(data){
        res.write(data);
        res.end('');//不写则没有http协议尾
    }
    return  recall;
}
module.exports={
    login:function(req,res){
        recall  =  getRecall(req,res);
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
    }
}