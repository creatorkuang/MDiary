'use strict';

angular.module('jizhiApp')
  .service('jizhiUser',['$http' ,'$q','$angularCacheFactory','$rootScope',function ($http, $q,$angularCacheFactory,$rootScope) {
    $angularCacheFactory('jizhiUser', {
        maxAge: 90000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 600000, // This cache will clear itself every hour.
       // storageMode: 'localStorage' ,
        aggressiveDelete: true // Items will be deleted from this cache right when they expire.
    });
    var baseUrl=HOST+"/users/",
       dataCache = $angularCacheFactory.get('jizhiUser');
    return {
        getProfilebyId: function (id) {
            var deferred = $q.defer();
            if (dataCache.get(id)){
                deferred.resolve(dataCache.get(id));
            } else {
                $http.get(baseUrl+id+'?context=detail').success(function (data) {
                        dataCache.put(id,data);
                        deferred.resolve(data);
                    });
            }
            return deferred.promise;
        },
        query:function(option){
            var deferred = $q.defer();
            $http.get(baseUrl+'?'+JSON.stringify(option)).success(function (data){
                 deferred.resolve(data);
             });
            return deferred.promise;
        },
        queryUsers:function(option){
            var deferred = $q.defer();
             if (dataCache.get('users')){
                 deferred.resolve(dataCache.get('users'));
             }else{
                $http.get(baseUrl+'?'+JSON.stringify(option)).success(function (data) {
                  dataCache.put('users',data);
                  deferred.resolve(data);
             });
             }
            return deferred.promise;
        },
        post:function(option){
            var deferred = $q.defer();
            $http.post(baseUrl,JSON.stringify(option)).success(function (data) {
                 deferred.resolve(data);
             }).error(function(err){
                deferred.reject(err);
             })
            ;
            return deferred.promise;
        },
        getMe:function(){
        	var deferred = $q.defer();
            if (dataCache.get('me')) {
                deferred.resolve(dataCache.get('me'));
            } else {
                $http.get(baseUrl+'me').success(function (data) {
                	  if(data){
                	  	 dataCache.put('me',data);
                         deferred.resolve(data);
                      }else{
                      	 deferred.reject();
                      } 
                 });
            }
            return deferred.promise;
        },
        login:function(option){
            var deferred = $q.defer();
              $http.post(baseUrl+'login',JSON.stringify(option))
              .success(function () {
                      deferred.resolve();
               })
              .error(function(data){
                deferred.reject(data);
              });
            return deferred.promise;
        },
        logout:function(){
        	var deferred = $q.defer();
        	  $http.get(baseUrl+'logout').success(function () {
                      dataCache.remove('me');
                      deferred.resolve();
               });
        	return deferred.promise;
        },
        update:function(uid,option){
         var deferred = $q.defer();
              $http.put(baseUrl+uid,JSON.stringify(option)).success(function (){
                      deferred.resolve();
               }).error(function(err){
                deferred.reject(err);
               });
            return deferred.promise;
        },
        invite:function(option){
          var deferred=$q.defer();
          $http.post(HOST+'/invites',JSON.stringify(option)).success(function(data){
            deferred.resolve(data);
          })
          return deferred.promise;
        },
        sendFB:function(option){
          var deferred=$q.defer();
          $http.post(HOST+'/feedbacks',JSON.stringify(option)).success(function(data){
            deferred.resolve(data);
          })
          return deferred.promise;
        },
        getRec:function(id){
          var deferred = $q.defer();
            $http.get(HOST+'/recommends/users/'+id).success(function (data) {
                 deferred.resolve(data);
             }).error(function(err){
              deferred.reject(err);
             });
            return deferred.promise;
        }
    };
}]);