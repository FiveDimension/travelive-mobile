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

    function( $scope, ExampleService )
    {
      $scope.myHTML = null;

      // just an example...
      $scope.fetchRandomText = function() {
        ExampleService.doSomethingAsync()
          .then(ExampleService.fetchSomethingFromServer)
          .then(function(response) {
              $scope.myHTML = response.data.text;
              // close pull to refresh loader
              $scope.$broadcast('scroll.refreshComplete');
          });
      };

      $scope.fetchRandomText();

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        console.log("home onDeviceReady");
        //panframePlugin.init("http://mobile.360heros.com/producers/4630608605686575/9813601418398322/video/video_31b451b7ca49710719b19d22e19d9e60.mp4", 2);
        //panframePlugin.init("rtmp://203.207.99.19/live/CCTV2", 1);
        panframePlugin.init("rtmp://184.72.239.149/vod/BigBuckBunny_115k.mov", 1);
      }
    }
];
