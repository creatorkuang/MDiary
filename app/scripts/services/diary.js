'use strict';

angular.module('jizhiApp')
  .service('jzDiary',['$http' ,'$q','$angularCacheFactory','$rootScope',function ($http, $q,$angularCacheFactory,$rootScope) {
    $angularCacheFactory('jizhiDiary', {
        maxAge: 90000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 600000, // This cache will clear itself every hour.
       // storageMode: 'localStorage' ,
        aggressiveDelete: true // Items will be deleted from this cache right when they expire.
    });
    var baseUrl=HOST+"/diarys/",
       dataCache = $angularCacheFactory.get('jizhiDiary');
    return {
        query:function(option){
            var deferred = $q.defer();
            $http.get(baseUrl+'?'+JSON.stringify(option)).success(function (data){
                 deferred.resolve(data);
             });
            return deferred.promise;
        },
        queryAlls:function(option){
            var deferred = $q.defer();
             if (dataCache.get('diarys')){
                 deferred.resolve(dataCache.get('diarys'));
             }else{
                $http.get(baseUrl+'?'+JSON.stringify(option)).success(function (data) {
                  dataCache.put('diarys',data);
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
        update:function(uid,option){
         var deferred = $q.defer();
              $http.put(baseUrl+uid,JSON.stringify(option)).success(function (){
                      deferred.resolve();
               }).error(function(err){
                deferred.reject(err);
               });
            return deferred.promise;
        }
    };
}]);