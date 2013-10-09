
'use strict';

angular.module('jizhiApp')
  .controller('RegisterCtrl',['$scope','$rootScope','$location','$window','jizhiUser',function($scope,$rootScope,$location,$window,jizhiUser){
    $scope.$on('$viewContentLoaded', function(event){
        $window._gaq.push(['_trackPageview', $location.path()]);
    });

    $scope.rgform={};
    $scope.check={};
      $scope.registerUser=function(){
        $scope.isSending=true;
      	 if($scope.check.password!==$scope.rgform.password){
		    	$scope.notMatch=true;
    	   }else{
    	   	$scope.notMatch=false;
    	   	// register
          // set email notify to true
          $scope.rgform.notify=true;
          jizhiUser.post($scope.rgform).then(function(result){
             try{
                  jizhiUser.login({username:$scope.rgform.username,password:$scope.rgform.password}).then(function(){
                     jizhiUser.getMe().then(function(data){
                         if(data){
                           $rootScope.me=data;
                           $rootScope.isLogin=true;
                         }else{
                           $rootScope.isLogin=false;
                         }
                      $window.location.href="#/";
                      $window._gaq.push(['_trackEvent', 'users','registerUser',"userId:"+$scope.rgform.username]);
                     });
                  });
                }catch(err){
                  alert(err);
                  $window._gaq.push(['_trackEvent', 'users','registerUser',"error:"+err]);
                }
          },function(err){
                if(err.errors){
                alert("用户名已被占用");
               }else{
                 alert(err.message); 
               }
          });
    	
    	   }// end of check password
      };
  }]);
