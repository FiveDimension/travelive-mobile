'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$scope',
    '$ionicHistory',
    '$rootScope',

    function( $scope, $ionicHistory, $rootScope)
    {
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      $rootScope.login = function(user){
        $rootScope.user = user;
        window.localStorage.setItem("login-user", JSON.stringify(user));
      };

      $rootScope.logout = function(user){
        $rootScope.user = undefined;
        window.localStorage.removeItem("login-user");
      };

      $rootScope.user = initUser();
      console.log($rootScope.user);
      function initUser(){
        try{
          var h = window.localStorage.getItem("login-user");
          if (h) {
            return JSON.parse(h);
          }
        }catch(e){
          return undefined;
        }
      }

    }
];
