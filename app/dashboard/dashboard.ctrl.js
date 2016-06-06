define([
    'app',
    'config'
],function(app,config){
    app.controller('dashBoardCtrl',['$scope','$$chat','$timeout','$rootScope','$location','$state','$stateParams',
        function($scope,$$chat,$timeout,$rootScope,$location,$state,$stateParams){

            //随机生成用户id
            var genUid = function(){
                return new Date().getTime()+""+Math.floor(Math.random()*899+100);
            };

            //让浏览器滚动条保持在最低部
            var scrollToBottom = function(){
                window.scrollTo(0, $('#message')[0].clientHeight);
            };

            //退出
            $scope.logout = function(){
                //$state.go('main');
                location.href='/';
            };

            //提交聊天消息内容
            $scope.submit = function(){
                if($scope.content != ''){
                    var obj = {
                        userId: $scope.userInfo.userId,
                        userName: $scope.userInfo.userName,
                        content: $scope.content
                    };
                    $scope.socket.emit('message', obj);
                    $scope.content = '';
                }
                return false;
            };

            $scope.enter = function(ev){
                if (ev.keyCode !== 13){
                    return;
                }else{
                    $scope.submit();
                }
            };

            //更新系统消息，本例中在用户加入、退出的时候调用
            var updateSysMsg = function(o, action){
                //当前在线用户列表
                $scope.onlineUsers = angular.copy(o.onlineUsers);
                //当前在线人数
                $scope.onlineCount = angular.copy(o.onlineCount);
                //新加入用户的信息
                $scope.user = o.user;
                //当前在线列表
                $scope.userHtml = '';
                var separator = '';
                angular.forEach($scope.onlineUsers,function(list){
                    $scope.userHtml+= separator + list.userName;
                    separator = '、';
                });
                $scope.$apply();

                //系统提示信息
                var html = '';
                html += '<div class="msg-system">';
                html += $scope.user.userName;
                html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
                html += '</div>';
                var section = document.createElement('section');
                section.className = 'system J-mjrlinkWrap J-cutMsg';
                section.innerHTML = html;
                document.getElementById("message").appendChild(section);
                scrollToBottom();
            };

            var init = function(){
                //当前在线用户列表
                $scope.onlineUsers = [];
                //当前在线人数
                $scope.onlineCount = null;

                //生成随机id
                $scope.userInfo.userId = genUid();

                //输入内容
                $scope.content = '';

                //浏览器保持最底部
                scrollToBottom();

                //连接websocket后端服务器
                $scope.socket = io.connect('localhost:3000');
                //$scope.socket = io.connect('http://6f3d2395.ngrok.natapp.cn');
                //告诉服务端有用户登录
                if($scope.userInfo.userName!=''){
                    $scope.socket.emit('login',{userId:$scope.userInfo.userId,userName:$scope.userInfo.userName});
                }else{
                    $state.go('main');
                }

                //监听新用户登录
                $scope.socket.on('login',function(e){
                    updateSysMsg(e,'login');
                });

                //监听用户退出
                $scope.socket.on('logout', function(e){
                    updateSysMsg(e, 'logout');
                });

                //监听消息发送
                $scope.socket.on('message', function(obj){
                    var isme = (obj.userId == $scope.userInfo.userId) ? true : false;
                    var contentDiv = '<div>'+obj.content+'</div>';
                    var usernameDiv = '<span>'+obj.userName+'</span>';

                    var section = document.createElement('section');
                    if(isme){
                        section.className = 'user';
                        section.innerHTML = contentDiv + usernameDiv;
                    } else {
                        section.className = 'service';
                        section.innerHTML = usernameDiv + contentDiv;
                    }
                    document.getElementById("message").appendChild(section);
                    scrollToBottom();
                });
            };

            init();

        }])
});