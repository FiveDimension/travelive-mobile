'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:HomeController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    'ExampleService',
    '$state',

    function( $scope, ExampleService, $state)
    {
      $scope.onFocus = function(){
        console.log("onFocus");
      };
    }
];
