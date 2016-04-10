'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    'ItineraryService',
    '$timeout',

    function( $scope, ItineraryService, $timeout )
    {
      $scope.isLoading = true;
      // just an example...
      $scope.fetchRandomText = function() {
        getData(function(){
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $timeout(function(){
        getData();
      }, 100);

      var getData = function(cb){
        $scope.isLoading = false;
        $scope.itineraries = [];
        var keys = ItineraryService.getAllKey();
        for(var i = 0; i < keys.length; i++) {
          if (keys[i] == 'cache') {
            continue;
          }
          var ii = ItineraryService.getByKey(keys[i]);
          $scope.itineraries.push({
            image: 'http://dimg03.c-ctrip.com/images/tg/916/807/115/387aee47fc7a4439918c3cdc3e427db6_C_640_320.jpg',
            name: ii.name,
            vpIds: ii.vp_ids
          })
        }
        if(cb){
          cb();
        }
      };
      $scope.itineraries = [];
      //$scope.createItinerary = function() {
      //  console.log($state);
      //  $state.go('app.itinerary_edit');
      //}
    }
];
