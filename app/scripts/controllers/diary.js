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
.controller('diaryArchiveCtrl',['$scope','jzDiary','$filter',function($scope,jzDiary,$filter){
	$scope.drawCal=function(y,m){
		var first_day=new Date(y,m,1).getDay(),
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
	       	// check if numbers in the array
	       	   	$scope.monthdays[j]={num:j+1,id:''};
	       }
	       // get exsiting days in this month
	    jzDiary.query({date:{$gt:new Date(y,m,1).getTime(),$lt:new Date(y,m+1,0).getTime()}}).then(function(result){
	    	for(var l=0;l<result.length;l++){
	    		var exd=$filter('date')(result[l].date,['d']);
	    		$scope.monthdays[exd-1]={num:exd,id:result[l].id};
	    	}
	    })
	    // calculate the surplue
	       $scope.nextdays=[];
	       for(var k=0;k<surplus;k++){
	       	$scope.nextdays[k]=k+1;
	       }
  }// end of draw cal

   // drawcal of this month
   var date=new Date();
   $scope.year=date.getFullYear(),
   $scope.month=date.getMonth();
   $scope.drawCal($scope.year,$scope.month);
    $scope.preCal=function(){
      $scope.month=$scope.month-1;
      $scope.drawCal($scope.year,$scope.month);
    }
    $scope.nextCal=function(){
      $scope.month=$scope.month+1;
      $scope.drawCal($scope.year,$scope.month);
    }
    
}]);