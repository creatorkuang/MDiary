'use strict';

angular.module('jizhiApp', ['ngSanitize','ui.bootstrap','angular-cache'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/index.html',
        controller: 'HomeCtrl',
      })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
    .when('/home/index', {
        templateUrl: 'views/homeIndex.html',
        controller: 'HomeCtrl',
      })
    // diary
    .when('/diary/new',{
      templateUrl: 'views/diaryNew.html',
      controller: 'diaryNewCtrl',
    })
    .when('/diary/archive',{
      templateUrl: 'views/diaryArchive.html',
      controller: 'diaryArchiveCtrl',
    })
    .when('/diary/:did',{
      templateUrl: 'views/diaryView.html',
      controller: 'diaryViewCtrl',
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
    .when('/user/setting',{
        templateUrl: 'views/userSetting.html',
        controller: 'UserSettingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(['$rootScope','jizhiUser','$document', '$http',function($rootScope,jizhiUser,$document, $http){
       jizhiUser.getMe().then(function(data){
         if(data){
          $rootScope.me=data;
          $rootScope.isLogin=true;
         }else{
          $rootScope.isLogin=false;
         }
       })
  }])
  .config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
   }]);
