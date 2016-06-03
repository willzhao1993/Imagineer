var express = require('express');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'app')));

app.get('/',routes.index);
//在线用户
var onlineUsers = [];
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket){
    console.log('a user connected');

    //监听新用户加入
    socket.on('login', function(obj){
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userId;
        //检查在线列表，如果不在里面就加入
        if(onlineUsers.length<1){
            onlineUsers.push(obj);
            //在线人数+1
            onlineCount++;
        }else{
            var number = true;
            for(var i = 0;i<onlineUsers.length;i++){
                if(onlineUsers[i].userId == obj.userId){
                    number = false;
                }
            }
            if(number){
                onlineUsers.push(obj);
                //在线人数+1
                onlineCount++;
            }
        }
        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
    });

    //监听用户退出
    socket.on('disconnect', function(){
        //将退出的用户从在线列表中删除
        for(var i = 0;i<onlineUsers.length;i++){
            if(onlineUsers[i].userId == socket.name){
                //退出用户的信息
                var obj = {userId:socket.name, userName:onlineUsers[i].userName};
                onlineUsers.splice(i,1);
                //在线人数-1
                onlineCount--;
                break;
            }
        }
        //向所有客户端广播用户退出
        io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
    });

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.userName+'说：'+obj.content);
    });

});

http.listen(3000,function(){
   console.log('listening on *:3000');
});