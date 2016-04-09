'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$scope',
    '$http',
    '$rootScope',
    '$ionicPopup',

    function( $scope, $http, $rootScope, $ionicPopup)
    {
      $scope.input = {};

      $scope.doLogin = function(){
        console.log($scope.input.username, $scope.input.password);
        $http.post("http://58.40.126.144/api/login", {
          "username": $scope.input.username,
          "password": $scope.input.password
        }).success(function(data){
          console.log(data);
          if(!data.message){
            var alertPopup = $ionicPopup.alert({
              title: '登入失败',
              //template: '请重试'
            });

            alertPopup.then(function(res) {
              console.log('Thank you for not eating my delicious ice cream cone');
            });
          }else{
            $rootScope.user = {
              username: $scope.input.username,
              uid: data.user_id
            };

            $scope.goBack();
          }

        })
      }
    }
];
