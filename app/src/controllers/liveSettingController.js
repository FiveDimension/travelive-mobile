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
  '$http',
  '$ionicPopup',

  function ($scope, SelectAttractionService, $state, $ionicHistory, $http, $ionicPopup) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    $scope.input = {};
    $scope.isOnAir = false;

    $scope.selectAttraction = function(){
      SelectAttractionService.selectAttraction().then(function(r){
        $scope.input.jingdian = r.title;
        $scope.input.vpId = r.vp_id;
      });
    };

    $scope.startLive = function () {
      if(!$scope.user){
        var alertPopup = $ionicPopup.alert({
          title: '未登入'
          //template: '请重试'
        });
        return;
      }
      if($scope.input.title && $scope.input.title.trim() && typeof $scope.input.vpId != "undefined"){
        $http.post('http://58.40.126.144/api/createStream', {
          "vp_id": $scope.input.vpId,
          "user_id": $scope.user.uid,
          "title": $scope.input.title.trim()
        }).success(function (data){
          var st_id = data.st_id;
          var option = {
            title: $scope.input.title,
            jingdian:  $scope.input.jingdian,
            chatUrl: "http://182.254.135.18:3000/viewer?user="+ $scope.user.username +
            "&uid="+ $scope.user.uid +"&rid=" + st_id
          };
          $scope.isOnAir = true;
          window.open("rtmp://182.254.135.18/live/" + st_id, "_live", JSON.stringify(option));
        });
      }

      $scope.stopLive = function(){
        // TODO
      };
    };
  }
];
