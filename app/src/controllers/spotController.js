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
  '$ionicHistory',
  '$http',
  '$ionicModal',

  function ($scope, ExampleService, $state, $ionicHistory, $http, $ionicModal) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.topic="千岛湖";
    $scope.open = function (spot) {
      spot.isOpen = !spot.isOpen;
    };
    $scope.spot = {
      topic: "千岛湖：绿水青山与翠岛",
      photo: "http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800",
      introduce: "位于杭州淳安的千岛湖，山青水绿，是江浙沪周边度假的好去处。游玩千岛湖主要坐游船徜徉湖上和登岛游览，不仅湖上风光秀美，湖中每个岛的景致都各有特色。 千岛湖按照游船线路为中心湖区、东南湖区，西南湖区则有龙川湾、芹川村，可以观赏湿地和古村风光。除了观光景点，千岛湖的环湖公路也特别适合骑行，岛上酒店和咨询点就可以租车。",
      mapOptions: {
        resizeEnable: true,
        center: [119.035393066406, 29.60462623291016],
        zoom: 10
      },
      marker: {
        position: [119.035393066406, 29.60462623291016]
      }
    };
    $scope.modelSpot = angular.copy($scope.spot);
    $scope.modelSpot.mapOptions.pluginScale = true;
    $scope.modelSpot.mapOptions.pluginToolBar = true;
    //$http.get('http://q.chanyouji.com/api/v2/activity_collections/911.json').success(function(data){
    //  console.log(data);
    //});
    $ionicModal.fromTemplateUrl('templates/views/modal/location.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
// Execute action on hide modal
    $scope.$on('modal.hidden', function () {
// Execute action
    });
// Execute action on remove modal
    $scope.$on('modal.removed', function () {
// Execute action
    });

    $scope.openMap = function() {
      $scope.openModal();
    };
  }
];
