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

  function ($scope, ExampleService, $state, $ionicHistory, $ionicModal, $timeout) {
    $scope.goBack = function () {
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

    $scope.addItem = function () {
      $scope.openModal();
    };
    var longitude = 119.531893;
    var latitude = 29.924382;
    $scope.mapOptions = {
      enableScrollWheelZoom: false,
      overviewCtrl: true,
      center: {
        longitude: longitude,
        latitude: latitude
      },
      zoom: 17,
      city: 'HangZhou',
      markers: [{
        longitude: longitude,
        latitude: latitude,
        //icon: 'http://www.runoob.com/wp-content/themes/runoob/assets/img/runoob-logo.png',
        width: 49,
        height: 60,
        title: 'Where',
        content: 'Put description here'
      }]
    };

    //$timeout(function () {
    //  //$scope.mapOptions.center.longitude = 121.500885;
    //  //$scope.mapOptions.center.latitude = 31.190032;
    //  //$scope.mapOptions.markers[0].longitude = 121.500885;
    //  //$scope.mapOptions.markers[0].latitude = 31.190032;
    //  for (var j = 0; j < poiData.length; j++) {
    //    var poi = poiData[j];
    //    for (var i = 0; i < poi.length; i++) {
    //      var data = poi[i];
    //      var content = document.createElement('div');
    //      content.innerHTML = 'Put description here';
    //      content.onclick = function() {
    //        console.log(arguments);
    //      };
    //      $scope.mapOptions.markers.push({
    //        longitude: data.lng,
    //        latitude: data.lat,
    //        title: data.name,
    //        content: content
    //      })
    //      console.log('push');
    //    }
    //  }
    //}, 5000);
  }
];
