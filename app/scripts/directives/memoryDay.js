'use strict';
angular.module('jizhiApp')
.directive('memoryDay',function () {
    return {
        restrict:'EAC',
        scope:{entity:'='},
        replace:true,
        template:
         '<div><input type="text" ng-model="newValue" ></input><a  ng-href="" class="btn mlm mbm" ng-click="add()">添加</a>'+
            '<ul class="unstyled row-fluid" >' +
                '<li  ng-repeat="(idx, item) in entity.mdays" class="bgwhite pas brs mbs">{{item}}<a href="" class="muted pull-right" ng-click="remove(idx)">X</a></li>' +
            '</ul></div>' ,
        link: function($scope,$element){
          if(!$scope.entity.mdays){
             $scope.entity.mdays=[];
          }
            $scope.add = function(){
                $scope.entity.mdays.push( $scope.newValue );
                $scope.newValue ='';
              };
            $scope.remove = function(idx){
                $scope.entity.mdays.splice( idx, 1 );
          };
       }  
      };
});