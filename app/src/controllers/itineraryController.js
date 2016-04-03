'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    'ExampleService',
    '$state',

    function( $scope, ExampleService, $state )
    {
      $scope.myHTML = null;
      $scope.isLoading = true;
      // just an example...
      $scope.fetchRandomText = function() {
        ExampleService.doSomethingAsync()
          .then(ExampleService.fetchSomethingFromServer)
          .then(function(response) {
              $scope.myHTML = response.data.text;
              $scope.isLoading = false;
              $scope.itineraries = [{
                id: '1',
                image: 'http://ionicframework.com/img/docs/delorean.jpg',
                name: '超跑之旅1',
                user: {name: '', avatar: ''},
              }, {
                id: '2',
                image: 'http://ionicframework.com/img/docs/delorean.jpg',
                name: '超跑之旅2',
                user: {name: '', avatar: ''},
              }];
            // close pull to refresh loader
              $scope.$broadcast('scroll.refreshComplete');
          });
      };

      $scope.fetchRandomText();
      $scope.itineraries = [];
      $scope.createItinerary = function() {
        console.log($state);
        $state.go('app.itinerary_edit');
      }
    }
];
