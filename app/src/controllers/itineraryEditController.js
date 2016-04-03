'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    'ExampleService',
    '$state',
    '$ionicHistory',
    '$ionicModal',
    '$timeout',

    function( $scope, ExampleService, $state, $ionicHistory, $ionicModal, $timeout)
    {
      $scope.goBack = function() {
        $ionicHistory.goBack();
      };

      $ionicModal.fromTemplateUrl('templates/views/modal/select.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
//Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
// Execute action on hide modal
      $scope.$on('modal.hidden', function () {
// Execute action
      });
// Execute action on remove modal
      $scope.$on('modal.removed', function () {
// Execute action
      });

      $scope.addItem = function() {
        $scope.openModal();
      };


      var longitude = 121.506191;
      var latitude = 31.245554;
      $scope.mapOptions = {
        center: {
          longitude: longitude,
          latitude: latitude
        },
        zoom: 17,
        city: 'ShangHai',
        markers: [{
          longitude: longitude,
          latitude: latitude,
          icon: 'http://www.runoob.com/wp-content/themes/runoob/assets/img/runoob-logo.png',
          width: 49,
          height: 60,
          title: 'Where',
          content: 'Put description here'
        }]
      };

      $timeout(function() {
        $scope.mapOptions.center.longitude = 121.500885;
        $scope.mapOptions.center.latitude = 31.190032;
        $scope.mapOptions.markers[0].longitude = 121.500885;
        $scope.mapOptions.markers[0].latitude = 31.190032;
      }, 5000);
    }
];
