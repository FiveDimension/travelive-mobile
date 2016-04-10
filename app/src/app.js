'use strict';

/**
 * @ngdoc overview
 * @name Travelive
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

// Example to require lodash
// This is resolved and bundled by browserify
//
// var _ = require( 'lodash' );

angular.module( 'Travelive', [
  'ionic',
  'ngCordova',
  'ngResource',
  //'baiduMap',
  'l42y.amap.map',
  //'ui.sortable'
] )
.run( [
  '$ionicPlatform',

  function( $ionicPlatform )
  {

  $ionicPlatform.ready(function() {
    // save to use plugins here
  });

  // add possible global event handlers here

} ] )

.config( [
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',
  'AmapProvider',

  function( $httpProvider, $stateProvider, $urlRouterProvider, AmapProvider )
  {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.discovery', {
        url: '/discovery',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/discovery.html',
            controller: 'DiscoveryController'
          }
        }
      })
      .state('app.startLive', {
        url: '/startLive',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/liveSetting.html',
            controller: 'LiveSettingController'
          }
        }
      })
      .state('app.location', {
        url: '/location',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/location.html',
            controller: 'LocationController'
          }
        }
      })
      .state('app.itineraryMap', {
        url: '/itinerary_map?name',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/itineraryMap.html',
            controller: 'ItineraryMapController'
          }
        }
      })
      .state('app.searchRes', {
        url: '/search_res',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/location.html',
            controller: 'SearchResController'
          }
        }
      })
      .state('app.spot', {
        url: '/spot/:id',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/spot.html',
            controller: 'SpotController'
          }
        }
      })
      .state('app.spots', {
        url: '/spots',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/spots.html',
            controller: 'SpotsController'
          }
        }
      })
      .state('app.itinerary', {
        url: '/itinerary',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/itinerary.html',
            controller: 'ItineraryController'
          }
        }
      })
      .state('app.itinerary_edit', {
        url: '/itinerary_edit',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: '../templates/views/itineraryEdit.html',
            controller: 'ItineraryEditController'
          }
        }
      })
      .state('app.myTravel', {
        url: '/myTravel',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myTravel.html',
          }
        }
      })
      .state('app.login', {
        url: '/login',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/login.html',
            controller: 'LoginController'
          }
        }
      })
      .state('app.myLive', {
        url: '/myLive',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myLive.html',
            controller: 'MyLiveController'
          }
        }
      })
      .state('app.notification', {
        url: '/notification',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/notification.html'
          }
        }
      })
      .state('app.playHistory', {
        url: '/playHistory',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/playHistory.html'
          }
        }
      })
      .state('app.myFollow', {
        url: '/myFollow',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/myFollow.html'
          }
        }
      })
      .state('app.pointsMall', {
        url: '/pointsMall',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/pointsMall.html'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');

    AmapProvider.config = {
      key: '553c40e8f236ac9094e3f29c3761a302', // Amap API key, see http://api.amap.com/key
      version: '1.3' // which Amap API version to use, see http://lbs.amap.com/api/javascript-api/changelog/
    };
  }
] )

// Angular module controllers
//
.controller( 'MainController',          require('./controllers/mainController') )
.controller( 'HomeController',          require('./controllers/homeController') )
.controller( 'DiscoveryController',     require('./controllers/discoveryController') )
.controller( 'ItineraryController',     require('./controllers/itineraryController') )
.controller( 'ItineraryEditController', require('./controllers/itineraryEditController') )
.controller( 'ItineraryMapController',  require('./controllers/itineraryMapController') )
.controller( 'SettingsController',      require('./controllers/settingsController') )
.controller( 'LoginController',      require('./controllers/loginController') )
.controller( 'MyLiveController',      require('./controllers/myLiveController') )
.controller( 'SpotController',          require('./controllers/spotController') )
.controller( 'SpotsController',         require('./controllers/spotsController') )
.controller( 'LiveSettingController',   require('./controllers/liveSettingController') )
.controller( 'LocationController',      require('./controllers/locationController') )
.controller( 'SearchResController',     require('./controllers/searchResController') )

// Angular module services
//
.factory( 'ItineraryService',        require( './services/itineraryService' ) )
.factory( 'ApiService',            require( './services/ApiService'     ) )
.factory( 'SelectAttractionService', require( './services/SelectAttractionService' ) )
.factory( 'SelectDestinationService', require( './services/selectDestinationService' ) )
;
