'use strict';
angular.module('jizhiApp')
.controller('letMeInCtrl',['$scope','$rootScope','$location','$window','jizhiUser',function($scope,$rootScope,$location,$window,jizhiUser){
  $scope.form={};
  $scope.letMeIn=function(){
     jizhiUser.login({username:$scope.form.username,password:$scope.form.password}).then(function(){
        jizhiUser.getMe().then(function(data){
         if(data){
          $rootScope.me=data;
          $rootScope.isLogin=true;
           $window.location.href="#"+$location.path()+'/';
          $window._gaq.push(['_trackEvent', 'users','login',"success:"+data.id]);
         }else{
          $rootScope.isLogin=false;
         }
       })
      },function(err){
        alert('用户名或密码错误');
        $window._gaq.push(['_trackEvent', 'users','login',"error:"+err.message]);
      })
  }
}])
 .controller('LoginCtrl',['$scope','$rootScope','$window','jizhiUser',function($scope,$rootScope,$window,jizhiUser){
   // login
    $scope.form={};
    $scope.login=function(){
      jizhiUser.login({username:$scope.form.username,password:$scope.form.password}).then(function(){
        jizhiUser.getMe().then(function(data){
         if(data){
          $rootScope.me=data;
          $rootScope.isLogin=true;
          $window.location.href="#/";
          $window._gaq.push(['_trackEvent', 'users','login',"success:"+data.id]);
         }else{
          $rootScope.isLogin=false;
         }
       })
      },function(err){
        alert('用户名或密码错误');
        $window._gaq.push(['_trackEvent', 'users','login',"error:"+err.message]);
      })
    };
  }])
  .controller('LogoutCtrl',['$scope','$location','$rootScope','$window','jizhiUser',function($scope,$location,$rootScope,$window,jizhiUser){
    $scope.logout=function(){
     jizhiUser.logout().then(function(){
        $rootScope.me={};
        $rootScope.isLogin=false; 
     });
    };
  }])