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
  '$timeout',

  function ($scope, $rootScope, $state, $ionicHistory, $http, $stateParams, ItineraryService, $ionicModal, $timeout) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.add = function () {
      $scope.openModal();
    };
    console.log($stateParams);
    //$scope.currentMap = angular.copy($rootScope.CurrentMap);
    $timeout(function(){
      $scope.currentMap = angular.copy($rootScope.CurrentMap);
      if($scope.currentMap) {
        for(var i = 0; i< $scope.currentMap.markers.length; i++ ) {
          var marker = $scope.currentMap.markers[i];
          if(ItineraryService.exitedByKey('cache', marker.vpId)) {
            marker.isAdded = true;
          } else {
            marker.isAdded = false;
          }
        }
      }
    }, 100);

    $http.post('http://58.40.126.144/api/getVpDetail', {vp_id: $rootScope.CurrentMap.vp_id}).success(function(data){
      console.log(data);
    });



    $scope.$on('cachedAddVpId', function(event, vpid){
      console.log('args',arguments);
      ItineraryService.addByKey('cache', vpid);
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
      $scope.itineraryInput = {selected: '新建', name: null};
      $scope.itineraryKeys = ItineraryService.getAllKey();
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

    $scope.modalOk = function(selcet, name) {
      console.log('modalOk', selcet, name, selcet == '新建');
      var is = ItineraryService.getByKey('cache');
      if (!is) {
        return;
      }
      if(selcet == '新建') {
        is.name = name;
        ItineraryService.saveByKey(name, is);
        $rootScope.currentItinerary = is;
        $state.go('app.itineraryMap', {name: name});
      } else {
        console.log(is);
        for(var i = 0; i < is.vp_ids.length; i++) {
          var vp_id =  is.vp_ids[i];
          console.log('addByKey', selcet, vp_id);
          ItineraryService.addByKey(selcet, vp_id);
        }
        $rootScope.currentItinerary = ItineraryService.getByKey(selcet);
        $state.go('app.itineraryMap', {name: selcet});
      }
      ItineraryService.delKey('cache');
      console.log('modalOk');
      $scope.closeModal();
    };
  }
];
