'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  'SelectAttractionService',
  '$state',
  '$ionicHistory',

  function ($scope, SelectAttractionService, $state, $ionicHistory) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    $scope.input = {};
    $scope.input.title="千岛湖直播";
    $scope.input.jingdian="千岛湖";

    $scope.selectAttraction = function(){
      SelectAttractionService.selectAttraction({}).then(function(r){
        $scope.input.jingdian= r.title;
      });
    };

    $scope.startLive = function () {
      console.log("startLive", $scope.jingdian);
      var option = {
        title: $scope.input.title,
        jingdian:  $scope.input.jingdian,
        chatUrl: "http://182.254.135.18:3000/viewer?user=kk&uid=2&rid=2"
      };
      window.open("rtmp://123.56.225.149/myapp/b", "_live", JSON.stringify(option));
    };
  }
];
