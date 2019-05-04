var mysql=require('mysql');
module.exports={
    connect:function () {
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'shan1104',
            database : 'LEARNNODE'
        });
        connection.connect();
        return connection;
    },
    insert:function (param) {
        var _this=this;
        var connection=this.connect();
        var userAddSql = 'insert into user (uname,pwd) values(?,?)';
        connection.query(userAddSql,param,function(err,rs){
            if(err){
                console.log('insert err:',err.message);
                return;
            }
            console.log('insert success');
            _this.stopConnect(connection);
        });
    },
    delect:function(id){
        var _this=this;
        var connection=this.connect();
        connection.query('DELETE FROM user where uname=?',[id],function(error, results, fields) {
            if (error) {
                console.log(error);
                console.log('cuowu');
                return;
            }
            console.log(results);
            console.log(fields);
            _this.stopConnect(connection);
        });
    },
    query:function (id) {
        var _this=this;
        var connection=this.connect();
        connection.query('SELECT * from user where uid=?',[id],function(err, rs) {
            if (err) {
                console.log('[query] - :'+err);
                return;
            }
            console.log(rs);
            for(var i=0;i<rs.length;i++){
                console.log('The uname is: ', rs[i].uname);
            }
            _this.stopConnect(connection);
        });
    },
    stopConnect:function (connection) {
        connection.end(function(err){
            if(err){
                console.log(err.toString());
                return;
            }
            console.log('[connection end] succeed!');
        });
    }
}