/**
 * Created by xingzai on 2019/5/3.
 */
// 引入 events 模块
var events = require('events');
module.exports={
    createEventfun:function(){
        // 创建 eventEmitter 对象
        var eventEmitter = new events.EventEmitter();
        eventEmitter.on('connection', function () {
            console.log('触发了connention');
        });
        eventEmitter.emit('connection');
    }
}















