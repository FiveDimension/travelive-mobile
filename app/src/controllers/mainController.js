'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$scope',

    function( $scope )
    {
        // do something with $scope
      $scope.playTest = function(){
        window.open("rtmp://123.56.225.149/myapp/b", "_playlive");
      }
    }
];
