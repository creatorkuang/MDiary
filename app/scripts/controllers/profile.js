'use strict';

angular.module('jizhiApp')
  .controller('UserSettingCtrl',['$scope','$routeParams','$window','jizhiUser',function ($scope,$routeParams,$window,jizhiUser) {

 
    $scope.profile={};
    $scope.updatePass=function(){
      if($scope.profile.password!=$scope.profile.password2){
        $scope.notMatch=true;
      }else{
        $scope.notMatch=false;
        jizhiUser.update($scope.me.id,{password:$scope.profile.password}).then(function(result){
          $scope.addAlert('success','更新成功');
          $window._gaq.push(['_trackEvent', 'users','updatePass',$scope.me.id]);
        },function(err){
          $scope.addAlert('error',err);
          $window._gaq.push(['_trackEvent', 'users','updatePass',$scope.me.id+"|error:"+err.message]);
        })
      }
    }
    $scope.updateNotify=function(){
       jizhiUser.update($scope.me.id,{notify:$scope.me.notify}).then(function(result){
          $scope.addAlert('success','更新成功');
          $window._gaq.push(['_trackEvent', 'users','updateNotify',$scope.me.id]);
        },function(err){
          $scope.addAlert('error',err);
          $window._gaq.push(['_trackEvent', 'users','updateNotify',$scope.me.id+"|error:"+err.message]);
        })
    }
 }]);
  
