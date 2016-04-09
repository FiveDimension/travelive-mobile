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

  function ($scope, ItineraryService, $state, $ionicHistory, $stateParams, $http) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    $scope.ok = function() {
      $state.go('app.home');
    };

    var key = $stateParams.name;

    var ii = ItineraryService.getByKey(key);
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
          showAddButton: false
        },
        markers: []
      };

      for (var i = 0; i < data.length; i++) {
        $scope.currentMap.markers.push({
          position: [data[i].pin.location.lon, data[i].pin.location.lat],
          image: data[i].photo_url,
          href: '#/app/spot/' + data[i].vp_id ,
          vpId: data[i].vp_id,
          name: data[i].name
        })
      }
    })

  }
];
