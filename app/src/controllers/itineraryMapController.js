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
  '$state',
  '$ionicHistory',
  '$stateParams',
  '$http',
  '$rootScope',

  function ($scope, ItineraryService, $state, $ionicHistory, $stateParams, $http, $rootScope) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    var key = $stateParams.name;

    var ii = ItineraryService.getByKey(key);

    $scope.ok = function() {
      //var vpids = [];
      //for (var i = 0; i < $scope.currentMap.markers.length; i++) {
      //  var m = $scope.currentMap.markers[i];
      //  vpids.push(m.vpId);
      //}

      ItineraryService.saveByKey(key, ii);
      $ionicHistory.clearCache().then(function(){
        $ionicHistory.clearHistory();
        $state.go('app.itinerary');
      });
    };

    var getData = function() {

        $http.post('http://58.40.126.144/api/getVpList', {"vp_id_list":ii.vp_ids} ).success(function(data){
          console.log(data);
          if(data.length == 0) return;
          $scope.currentMap = {
            vp_id: data[0].vp_id,
            topic: data[0].name,
            introduce: data[0].introduce,
            image: data[0].photo_url,
            mapOptions: {
              resizeEnable: true,
              center: [data[0].pin.location.lon, data[0].pin.location.lat],
              zoom: 16,
              pluginScale: true,
              pluginToolBar: true,
              showInfoWindow: false,
              showAddButton: false,
              showPolyline: true,
              audio: true,
            },
            markers: []
          };
          var markerMap = {};
          for (var i = 0; i < data.length; i++) {
            var m = {
              position: [data[i].pin.location.lon, data[i].pin.location.lat],
              image: data[i].photo_url,
              href: '#/app/spot/' + data[i].vp_id ,
              vpId: data[i].vp_id,
              name: data[i].name,
              voice_url: data[i].voice_url
            };
            markerMap[m.vpId] = m;
            $scope.currentMap.markers.push(m);
          }
          $http.post('http://58.40.126.144/api/createRoute', {"vp_id_list":ii.vp_ids} ).success(function(route){
            $scope.currentMap.markers = [];
            for(var i = 0; i < route.length; i++) {
              $scope.currentMap.markers.push(markerMap[route[i]]);
            }
            $rootScope.$broadcast('refreshAMapMarker', $scope.currentMap.mapOptions, angular.copy($scope.currentMap.markers));
          })

        });
    };
    getData();

    $scope.delMarker = function($event, marker) {
      console.log('delMarker', marker);
      var vpId = marker.vpId;
      var i = ii.vp_ids.indexOf(vpId);
      if(i != -1) {
        ii.vp_ids.splice(i, 1);
      }
      //ItineraryService.removeByKey(key, vpId);
      i = $scope.currentMap.markers.indexOf(marker);
      if(i != -1) {
        $scope.currentMap.markers.splice(i, 1);
      }
      getData();
    };

    $scope.add = function() {
      //TODO: 景点选择框
    }

    $scope.$watch('currentMap.markers', function(now, old){
      console.log('$watch.currentMap.markers');
      if (now) {
        $rootScope.$broadcast('refreshAMapMarker', $scope.currentMap.mapOptions, angular.copy($scope.currentMap.markers));
      }
    })

  }
];
