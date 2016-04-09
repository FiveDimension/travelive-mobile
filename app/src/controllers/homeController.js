'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:HomeController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  '$state',
  '$ionicModal',
  '$rootScope',
  '$http',
  'SelectDestinationService',
  'SelectAttractionService',

  function ($scope, $state, $ionicModal, $rootScope, $http, SelectDestinationService, SelectAttractionService) {
    $scope.input = {};

    $scope.selectDest = function () {
      SelectDestinationService.selectDestination().then(function(r){
        $scope.input.dest = r;
      });
    };

    $scope.selectVP = function(){
      SelectAttractionService.selectAttraction({dest: $scope.input.dest}).then(function(r){
        $scope.input.viewpoint = r.title;
        $scope.input.vpId = r.vp_id;
      });
    };

    $scope.input.dest = '上海';

    $scope.doSearch = function () {
      var postData = {dest: $scope.input.dest, viewpoint: $scope.input.viewpoint};
      console.log(postData);
      $http.post('http://58.40.126.144/api/searchVp', postData).success(function (data) {
        console.log(data);
        if(data.length == 0) return;
        $rootScope.CurrentMap = {
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
            showInfoWindow: true,
            showAddButton: true
          },
          markers: []
        };

        for (var i = 0; i < data.length; i++) {
          $rootScope.CurrentMap.markers.push({
            position: [data[i].pin.location.lon, data[i].pin.location.lat],
            image: data[i].photo_url,
            href: '#/app/spot/' + data[i].vp_id ,
            vpId: data[i].vp_id
          })
        }
        //console.log($rootScope.CurrentMap);
        $state.go('app.searchRes');
      });

    };
  }
];
