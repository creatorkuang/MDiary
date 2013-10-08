'use strict';
angular.module('jizhiApp')
  .controller('MainCtrl',['$scope','$rootScope','$timeout','$location','$window','$routeParams',function($scope,$rootScope,$timeout,$location,$window,$routeParams){
// google analysic
$scope.$on('$viewContentLoaded', function(event){
  var path=$location.path();
    $window._gaq.push(['_trackPageview', path]);
});


// alert
	$scope.alerts =[];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.onTimeout=function(){
	  $scope.closeAlert();
	  $scope.showalert=false;
  };
  $scope.addAlert = function(type,message) {
    $scope.alerts.push({type:type,msg:message});
    $scope.showalert=true;
    $timeout($scope.onTimeout,3000);
  };
  $rootScope.addAlert = function(type,message) {
    $scope.alerts.push({type:type,msg:message});
    $scope.showalert=true;
    $timeout($scope.onTimeout,3000);
  };

  $rootScope.isActive=function(route){
      return route===$location.path();
  };

    $scope.openFeedback = function () {
        $scope.feedback = true;
    };

    $scope.closeFeedback = function () {
        $scope.feedback = false;
    };
      
    $scope.opts={
        backdropFade: true,
        dialogFade:true
    };
    $scope.feedbackf={};
    $scope.sendFeedback=function(){
      jizhiUser.sendFB({text:$scope.feedbackf.text}).then(function(result){
          $scope.closeFeedback();
          $window._gaq.push(['_trackEvent', 'users','sendFeedback',$scope.me.id]);
      },function(err){
         alert(err);
          $window._gaq.push(['_trackEvent', 'users','sendFeedback',$scope.me.id+"|error:"+err.message]);
      })
    }

        // setting global tinymce options
     $scope.tinymceSimple={
      language: "zh_CN",
      menubar: false,
      plugins: [
          "advlist autolink lists link image textcolor"
      ],
      toolbar: "bold italic link | bullist numlist | forecolor backcolor"
     }
}])
