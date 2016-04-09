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

        // do something with $scope
      $scope.playTest = function(){
        var data = {
          chatUrl: 'http://182.254.135.18:3000/?user=ksx&uid=1&rid=2'
        };
        window.open("rtmp://123.56.225.149/myapp/b", "_playlive", JSON.stringify(data));
      }
    }
];
