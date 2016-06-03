define([
    'config',
    'angular'
],function(config){
    angular.module('chat.api',[])
        .factory('$$chat',['$http',
            function($http){

                return {

                }
            }
        ]);
});