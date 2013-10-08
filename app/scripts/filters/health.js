'use strict';
angular.module('jizhiApp')
  .filter('health',function(){
   return function(input) {
           switch(input){
           	case 1:
           	 return '良好';
           	break;
           	case 2:
           	 return '一般';
           	break;
           	case 3:
           	 return '较差';
           	break;
           	case 4:
           	 return '生病';
           	break;
           }
        }
});
