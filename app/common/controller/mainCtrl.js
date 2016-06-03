define([
    'app',
    'config'
],function(app,config){
    app.controller('mainCtrl',['$scope','$state',
        function($scope,$state){

            //提交用户名称
            $scope.userNameSubmit = function(){
                //location.href='#/dashboard';
                $state.go('dashboard');
            };

            var init = function(){
                // 用户数据模板
                $scope.userInfo = {
                    userId:'',
                    userName:''
                };
            };
            init();

        }
    ]);
});