'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicHistory',
  '$http',
  '$stateParams',
  'ItineraryService',
  '$ionicModal',

  function ($scope, $rootScope, $state, $ionicHistory, $http, $stateParams, ItineraryService, $ionicModal) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.add = function () {
      $scope.openModal();
    };
    console.log($stateParams);
    //$scope.currentMap = angular.copy($rootScope.currentMap);
    $scope.currentMap = angular.copy($rootScope.currentMap);


    $http.post('http://58.40.126.144/api/getVpDetail', {vp_id: $rootScope.currentMap.vp_id}).success(function(data){
      console.log(data);
    });



    $scope.$on('cachedAddVpId', function(event, vpid){
      console.log('args',arguments);
      ItineraryService.addByKey('cache', vpid);
      for(var i = 0; i< $scope.currentMap.markers.length; i++ ) {
        var marker = $scope.currentMap.markers[i];
        if(ItineraryService.exitedByKey('cache', marker.vpId)) {
          console.log('set ' +marker.vpId + ' isAdded true');
          marker.isAdded = true;
        } else {
          console.log('set ' +marker.vpId + ' isAdded false');
          marker.isAdded = false;
        }
      }
      $rootScope.$broadcast('refreshAMapMarker', $scope.currentMap.mapOptions, angular.copy($scope.currentMap.markers));
    });


    $scope.$on('cachedDelVpId', function(event, vpid){
      console.log('args',arguments);
      ItineraryService.removeByKey('cache', vpid);
      for(var i = 0; i< $scope.currentMap.markers.length; i++ ) {
        var marker = $scope.currentMap.markers[i];
        if(ItineraryService.exitedByKey('cache', marker.vpId)) {
          marker.isAdded = true;
        } else {
          marker.isAdded = false;
        }
      }
      $rootScope.$broadcast('refreshAMapMarker', $scope.currentMap.mapOptions, angular.copy($scope.currentMap.markers));
    });


    $ionicModal.fromTemplateUrl('templates/views/modal/addItinerary.html', {
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
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function () {
    });
    $scope.$on('modal.removed', function () {
    });

  }
];
