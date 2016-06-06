define([
    'app',
    'config'
],function(app,config){
    app.controller('mainCtrl',['$scope','$state',
        function($scope,$state){

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