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
    //$scope.spot = $rootScope.currentMap;
    $http.post('http://10.3.2.52:8000/api/getVpDetail', {vp_id: vp_id}).success(function(data){
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
        lives: spot.stream
      };
      $scope.modelSpot = angular.copy($scope.spot);
      $scope.modelSpot.mapOptions.pluginScale = true;
      $scope.modelSpot.mapOptions.pluginToolBar = true;
      $scope.modelSpot.mapOptions.showInfoWindow = true;
      $scope.modelSpot.mapOptions.zoomEnable = true;
      $scope.modelSpot.mapOptions.dragEnable = true;
    });

    //$scope.spot = {
    //  topic: "千岛湖：绿水青山与翠岛",
    //  photo: "http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800",
    //  introduce: "位于杭州淳安的千岛湖，山青水绿，是江浙沪周边度假的好去处。游玩千岛湖主要坐游船徜徉湖上和登岛游览，不仅湖上风光秀美，湖中每个岛的景致都各有特色。 千岛湖按照游船线路为中心湖区、东南湖区，西南湖区则有龙川湾、芹川村，可以观赏湿地和古村风光。除了观光景点，千岛湖的环湖公路也特别适合骑行，岛上酒店和咨询点就可以租车。",
    //  mapOptions: {
    //    resizeEnable: false,
    //    center: [119.035393066406, 29.60462623291016],
    //    zoom: 16,
    //    zoomEnable: false,
    //    dragEnable: false
    //  },
    //  markers: [{
    //    position: [119.035393066406, 29.60462623291016],
    //    image: 'http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800',
    //  }],
    //  lives: [{
    //    id: 1,
    //    name: '测试',
    //    image: 'http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800',
    //    liveUrl: 'rtmp://127.0.0.1/live',
    //    userName: 'Venkman',
    //    userImage: 'http://ionicframework.com/img/docs/venkman.jpg'
    //  },{
    //    id: 2,
    //    name: '测试2',
    //    image: 'http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800',
    //    liveUrl: 'rtmp://127.0.0.1/live',
    //    userName: '可靠课',
    //    userImage: 'http://ionicframework.com/img/docs/spengler.jpg'
    //  }]
    //};
    //$http.get('http://q.chanyouji.com/api/v2/activity_collections/911.json').success(function(data){
    //  console.log(data);
    //});

    $scope.openMap = function() {
      $rootScope.currentMap = angular.copy($scope.modelSpot);
      $state.go('app.location');
    };
  }
];
