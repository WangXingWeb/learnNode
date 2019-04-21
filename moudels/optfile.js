/**
 * Created by xingzai on 2019/4/20.
 */
var  fs=  require('fs');
module.exports={
    readfile:function(path,callback){
        fs.readFile(path,function(err,  file)  {
            if  (err)  {
                console.log(err);
                return;
            }else{
                callback(file);
            }
        });
    },
    readImg:function(path,res){
        fs.readFile(path,'binary',function(err,  file)  {
            if  (err)  {
                console.log(err);
                return;
            }else{
                res.write(file,'binary');
                res.end();
            }
        });
    }
};
