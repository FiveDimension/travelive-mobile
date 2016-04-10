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
  'PlayHistoryService',

  function ($scope, $rootScope, $state, $ionicHistory, $http, $stateParams, PlayHistoryService) {
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

      $scope.spot.lives = $scope.spot.lives.sort(function (a, b) {
        if(a.status== b.status){
          return getTimeFormST(b.st_id) - getTimeFormST(a.st_id);
        }
        return a.status==='online'? -1: 1;
      });

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

    $scope.openVideo = function(live) {
      if(live.status === 'online'){
        var data = {
          chatUrl: 'http://182.254.135.18:3000/?user='+ $scope.user.username +
          "&uid="+ $scope.user.uid +'&rid=' + live.st_id
        };
        live.playTime = new Date().getTime();
        PlayHistoryService.addPlayHistory(live);
        window.open("rtmp://182.254.135.18/live/" + live.st_id, "_playlive", JSON.stringify(data));
      } else {
        window.open('http://182.254.135.18:8080/record/'+ live.st_id +'.mp4', "", "location=yes");
      }
    };

    $scope.addFollow = function($event, id) {
      $event.stopPropagation();
      console.log('addFollow', id);
    }

    function getTimeFormST(stId){
      var sLn = stId.length,
        tStr = stId.substring(sLn-10,sLn);

      return new Date(Number(tStr+"000"));
    }
  }
];
