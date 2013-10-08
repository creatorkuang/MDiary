'use strict';
angular.module('jizhiApp')
  .controller('IndexCtrl',['$scope','$rootScope','$location','$window','$http',function($scope,$rootScope,$location,$window,$http){
// google analysic

$scope.$on('$viewContentLoaded', function(event){
  var path=$location.path();
    $window._gaq.push(['_trackPageview', path]);
});
  
  //check if register success
 $scope.$on("register_success",function(event,user){
  $window.location.href="#/user/setting";
 })
}])
  .controller('LoginCtrl',['$scope','$rootScope','$window',function($scope,$rootScope,$window){
   // login
    $scope.form={};
    $scope.login=function(){
      dpd.users.login({username:$scope.form.username,password:$scope.form.password},function(session,err){
         if(session){
             dpd.users.me(function(result,err){
             if(result){
              $rootScope.me=result;
              $rootScope.isLogin=true;
              $rootScope.$apply();
              $window._gaq.push(['_trackEvent', 'users','login',"success:"+user.id]);
             }else{
                alert(err.message);
             }
           })
         }else{
            alert('用户名或密码错误');
            $window._gaq.push(['_trackEvent', 'users','login',"error:"+err.message]);
         }
      });
    };
  }]);
