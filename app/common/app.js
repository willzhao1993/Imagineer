'use strict';

define([
    'mc-chat',
    'angular-ui-router'
],function($){

    var app = angular.module('myApp',[
        'chat.api',
        'ui.router'
    ]);
    return app;

});