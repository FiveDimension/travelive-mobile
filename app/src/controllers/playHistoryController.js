'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
  '$scope',
  'PlayHistoryService',

  function ($scope, PlayHistoryService) {
    $scope.historyList = PlayHistoryService.getPlayHistory();

    $scope.playST = function(live){
      window.open('http://182.254.135.18:8080/record/'+ live.st_id +'.mp4', "", "location=yes");
    };
  }
];
