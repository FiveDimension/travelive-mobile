'use strict';

/**
 * @ngdoc function
 * @name Travelive.service:ExampleService
 * @description
 * # ExampleService
 */
module.exports = [
    '$http',
    '$timeout',
    '$q',

    function( $http, $timeout, $q )
    {
      var kindOfPrivateVariable = 42;

      var doSomethingAsync = function() {
        var deferred = $q.defer();
        $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
        return deferred.promise;
      };

      var getAllKey = function() {
        var list =  window.localStorage.getItem("itinerary-list");
        if (list) {
          return JSON.parse(list);
        }
        return [];
      };


      var getByKey = function(key) {
        var itinerary =  window.localStorage.getItem("itinerary-item-" + key);
        if (itinerary) {
          return JSON.parse(list);
        }
        return undefined;
      };

      var addByKey = function(key, vp_id) {
        var item = get(key);
        if(item) {
          if(item.vp_ids.indexOf(vp_id) == -1){
            item.vp_ids.push(vp_id);
          }
          return true;
        }
        return false;
      };

      var removeByKey = function(key, vp_id) {
        var item = get(key);
        if(item) {
          var i = item.vp_ids.indexOf(vp_id);
          if(i == -1){
            return false;
          }
          item.vp_ids.splice(i, 1, 0);
          return true;
        }
        return false;
      };

      var fetchSomethingFromServer = function() {
        return $http({
            url: 'http://hipsterjesus.com/api',
            params: {
                paras: 2
            },
            method: 'GET'
          })
          .success(function(data) {
            console.log('fetched this stuff from server:', data);
          })
          .error(function(error) {
            console.log('an error occured', error);
          });
      };

      // public api
      return {
        getAllKey: getAllKey,
        getByKey: getByKey,
        addByKey: addByKey,
        removeByKey: removeByKey
      };
    }
];
