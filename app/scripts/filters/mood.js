'use strict';
angular.module('jizhiApp')
  .filter('mood',function(){
   return function(input) {
           switch(input){
           	case 1:
           	 return '开心';
           	break;
           	case 2:
           	 return '平静';
           	break;
           	case 3:
           	 return '低落';
           	break;
           }
        }
});
