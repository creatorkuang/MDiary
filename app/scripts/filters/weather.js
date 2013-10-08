'use strict';
angular.module('jizhiApp')
  .filter('weather',function(){
   return function(input) {
           switch(input){
           	case 1:
           	 return '晴朗';
           	break;
           	case 2:
           	 return '多云';
           	break;
           	case 3:
           	 return '阴天';
           	break;
           	case 4:
           	 return '小雨';
           	break;
           	case 5:
           	 return '大雨';
           	break;
           }
        }
});
