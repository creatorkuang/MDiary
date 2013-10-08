'use strict';
angular.module('jizhiApp')
.controller('diaryNewCtrl',['$scope','jzDiary','$location',function($scope,jzDiary,$location){
    var myDate=new Date();
    $scope.now=myDate.getTime();
    $scope.diary={};
    $scope.diary.getup=myDate;
    $scope.diary.sleep=myDate;
    $scope.saveDiary=function(){
    	// change format
    	$scope.diary.getup=$scope.diary.getup.getTime();
    	$scope.diary.sleep=$scope.diary.sleep.getTime();
    
    	jzDiary.post($scope.diary).then(function(result){
    		$scope.addAlert('success','更新成功');
    		$location.path('/diary/'+result.id);
    	},function(err){
    		$scope.addAlert('error',err.message);
    	});
    }
}])
.controller('diaryViewCtrl',['$scope','jzDiary','$routeParams',function($scope,jzDiary,$routeParams){
   $scope.diary={};
   jzDiary.query({id:$routeParams.did}).then(function(result){
   	$scope.diary=result;
   })
   $scope.updateDiary=function(){
   	console.log($scope.diary);
   	jzDiary.update($routeParams.did,$scope.diary).then(function(){
   		$scope.addAlert('success','更新成功');
   		$scope.diary.edit=false;
   	},function(err){
   		$scope.addAlert('error',err.message);
   	})
   }
}])
.controller('diaryArchiveCtrl',['$scope','jzDiary',function($scope,jzDiary){
	var date=new Date(),
	    y=date.getFullYear(),
	    m=date.getMonth(),
	    d=date.getDate(),
	    first_day=new Date(y,m,1).getDay(),
	    final_day=new Date(y,m+1,0).getDate(),
	    last_day=new Date(y,m,0).getDate(),
	    surplus=42-first_day-final_day;
	
	// calculater last month days   
    	$scope.lastdays=[];
    	for(var i=0;i<first_day;i++){
    		$scope.lastdays[i]=last_day-(first_day-1)+i;
    	}
    //calculate this month days
       $scope.monthdays=[];
       for(var j=0;j<final_day;j++){
       	$scope.monthdays[j]=j+1;
       }
    // calculate the surplue
       $scope.nextdays=[];
       for(var k=0;k<surplus;k++){
       	$scope.nextdays[k]=k+1;
       }
    
}]);