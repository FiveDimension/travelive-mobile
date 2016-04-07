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

  function ($scope, ExampleService, $state, $ionicHistory, $http) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.topic="千岛湖";
    $scope.open = function (spot) {
      spot.isOpen = !spot.isOpen;
    };
    $scope.spots = [{
      topic: "千岛湖：绿水青山与翠岛",
      photo: "http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800",
      introduce: "位于杭州淳安的千岛湖，山青水绿，是江浙沪周边度假的好去处。游玩千岛湖主要坐游船徜徉湖上和登岛游览，不仅湖上风光秀美，湖中每个岛的景致都各有特色。 千岛湖按照游船线路为中心湖区、东南湖区，西南湖区则有龙川湾、芹川村，可以观赏湿地和古村风光。除了观光景点，千岛湖的环湖公路也特别适合骑行，岛上酒店和咨询点就可以租车。"
    }, {
      topic: "千岛湖镇淡竹王子山",
      photo: "http://inspiration.chanyouji.cn/InspirationActivity/5290/e4696b59e79e5df03e283214b6ad71d8.jpg?imageMogr2/crop/!1021x612a0a36/thumbnail/800",
      introduce: "千岛湖森林氧吧位于千岛湖东部，这里植被茂盛、空气清新，是森林吸氧洗肺的好地方。森林氧吧景区的山虽不高，这里却有着千岛湖地区最好的空气质量。 漫步其中，随处可见的溪涧和瀑布带给人郊游的好心情，约一个多小时就能走到最高处。在森林氧吧景区内还有滑草、林中走绳桥等体验。"
    }];
    $http.get('http://q.chanyouji.com/api/v2/activity_collections/911.json').success(function(data){
      console.log(data);
    })
  }
];
