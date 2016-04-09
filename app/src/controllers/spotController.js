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
    var vp_id = $stateParams.id;
    $scope.open = function (spot) {
      spot.isOpen = !spot.isOpen;
    };
    //$scope.spot = $rootScope.CurrentMap;
    $http.post('http://58.40.126.144/api/getVpDetail', {vp_id: vp_id}).success(function(data){
      console.log(data);
      var spot = undefined;
      for(var i = 0; i < data.length; i++) {
        if(data[i].vp_id == vp_id) {
          spot = data[i];
        }
      }
      if(!spot) return;
      $scope.topic = spot.p_d_name;
      $scope.spot = {
        topic: spot.name,
        photo: spot.photo_url,
        introduce: spot.introduce,
        mapOptions: {
          resizeEnable: false,
          center: [spot.pin.location.lon, spot.pin.location.lat],
          zoom: 16,
          zoomEnable: false,
          dragEnable: false
        },
        markers: [{
          position: [spot.pin.location.lon, spot.pin.location.lat],
          image: spot.photo_url
        }],
        lives: spot.streams
      };
      $scope.modelSpot = angular.copy($scope.spot);
      $scope.modelSpot.mapOptions.pluginScale = true;
      $scope.modelSpot.mapOptions.pluginToolBar = true;
      $scope.modelSpot.mapOptions.showInfoWindow = true;
      $scope.modelSpot.mapOptions.zoomEnable = true;
      $scope.modelSpot.mapOptions.dragEnable = true;
    });

    $scope.openMap = function() {
      $rootScope.CurrentMap = angular.copy($scope.modelSpot);
      $state.go('app.location');
    };

    $scope.openVideo = function(stream_id) {
      console.log('openVideo');
    }

    $scope.addFollow = function($event, id) {
      $event.stopPropagation();
      console.log('addFollow', id);
    }
  }
];
