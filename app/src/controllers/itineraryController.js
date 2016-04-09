'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    '$state',
    '$timeout',

    function( $scope, $state, $timeout )
    {
      $scope.isLoading = true;
      // just an example...
      //$scope.fetchRandomText = function() {
      //  ExampleService.doSomethingAsync()
      //    .then(ExampleService.fetchSomethingFromServer)
      //    .then(function(response) {
      //        $scope.myHTML = response.data.text;
      //
      //
      //      // close pull to refresh loader
      //        $scope.$broadcast('scroll.refreshComplete');
      //    });
      //};

      $timeout(function(){
        $scope.isLoading = false;
        $scope.itineraries = [{
          id: '1',
          image: 'http://dimg03.c-ctrip.com/images/tg/916/807/115/387aee47fc7a4439918c3cdc3e427db6_C_640_320.jpg',
          name: '闺蜜夏日——厦门、永定土楼、鼓浪屿',
          user: {name: '', avatar: ''},
        }, {
          id: '2',
          image: 'http://dimg02.c-ctrip.com/images/fd/tg/g5/M00/B1/10/CggYsVbRY5qAbkIuAATpTEgUDSw460_R_640_320.jpg',
          name: '苏。恋——姑苏梦，同里情',
          user: {name: '', avatar: ''},
        }];
      }, 2000);
      $scope.itineraries = [];
      $scope.createItinerary = function() {
        console.log($state);
        $state.go('app.itinerary_edit');
      }
    }
];
