'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
  '$scope',
  'FollowService',

  function ($scope, FollowService) {
    $scope.followList = FollowService.getFollow();
    console.log($scope.followList);
    //
    //$scope.playST = function(live){
    //  window.open('http://182.254.135.18:8080/record/'+ live.st_id +'.mp4', "", "location=yes");
    //};
  }
];
