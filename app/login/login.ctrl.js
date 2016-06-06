define([
    'app',
    'config'
],function(app,config){
    app.controller('loginCtrl',['$scope','$$chat','$state',
        function($scope,$$chat,$state){
            //提交用户名称
            $scope.userNameSubmit = function(){
                $state.go('dashboard');
            };

            //初始化
            var init = function(){

            };

            init();
        }]);
});