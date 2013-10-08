'use strict';
angular.module('jizhiApp')
.controller('HeaderCtrl',['$scope',function($scope){
    
}])
  .controller('HomeCtrl',['$scope','$location','jizhiUser',function($scope,$location,jizhiUser){
    $scope.isActiveTab=function(route){
       return route===$location.path();
    }
  }]);