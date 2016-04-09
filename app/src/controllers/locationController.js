'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicHistory',
  '$http',
  '$stateParams',

  function ($scope, $rootScope, $state, $ionicHistory, $http, $stateParams) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.currentMap = $rootScope.currentMap;
  }
];
