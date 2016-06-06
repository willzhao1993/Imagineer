define([
    'app',
    'dashboard/dashboard.ctrl',
    'login/login.ctrl'
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
                        templateUrl:'login/login.tpl.html',
                        controller:'loginCtrl'
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
                        controller:'dashBoardCtrl'
                    }
                }
            })
    });
});