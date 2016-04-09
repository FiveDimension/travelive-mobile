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
        var data = {
          chatUrl: 'http://182.254.135.18:3000/?user=ksx&uid=1&rid=2'
        };
        window.open("rtmp://123.56.225.149/myapp/b", "_playlive", JSON.stringify(data));
      }
    }
];
