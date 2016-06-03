define([
    'app',
    'dashboard/dashboard.ctrl'
],function(app){
    app.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.when('', '/');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            //登录界面
            .state('main',{
                url:'/',
                cache:false,
                views:{
                    'main':{
                        templateUrl:'dashboard/login.tpl.html'
                    }
                }
            })
            //聊天界面
            .state('dashboard',{
                url:'/dashboard',
                cache:false,
                views:{
                    'main':{
                        templateUrl:'dashboard/dashboard.tpl.html',
                        controller:'DashBoardCtrl'
                    }
                }
            })
    });
});