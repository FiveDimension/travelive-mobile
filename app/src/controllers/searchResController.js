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
    console.log($stateParams);
    //$scope.currentMap = angular.copy($rootScope.currentMap);
    $scope.currentMap = angular.copy($rootScope.currentMap);


    $http.post('http://10.3.2.52:8000/api/getVpDetail', {vp_id: $rootScope.currentMap.vp_id}).success(function(data){
      console.log(data);
    })

  }
];
