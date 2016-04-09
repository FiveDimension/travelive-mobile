'use strict';

angular.module('l42y.amap.map', [
  'l42y.amap'
]).directive('amapMap', ['$window', 'Amap', function ($window, Amap) {
  return {
    scope: {
      fitView: '=amapMapFitView'
    },
    restrict: 'EA',
    template: '<div ng-transclude></div>',
    transclude: true,
    controller: function ($scope, $element, $attrs) {
      var options = $scope.$parent.$eval($attrs.amapMapOptions);
      var marker = $scope.$parent.$eval($attrs.amapMapMarker);

      Amap.promise.then(function () {
        console.log(options);
        console.log(marker);
        var map = new $window.AMap.Map($element[0], options);
        function addMarker(map) {
          var m = new $window.AMap.Marker(marker);
          m.setMap(map);
          console.log(m, map);
          if(options.showInfoWindow) {
            var infowindow = new AMap.InfoWindow({
              content: '<a href="#/app/live/1"><img src="' + marker.liveImg + '" height="120"></img><a>',
              offset: new AMap.Pixel(0, -30),
              size:new AMap.Size(230,0)
            });
            infowindow.open(map, m.getPosition());
          }

        }
        addMarker(map);
        $window.AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
          if(options.pluginToolBar){
            var toolBar = new $window.AMap.ToolBar();
            map.addControl(toolBar);
          }
          if(options.pluginScale) {
            var scale = new $window.AMap.Scale();
            map.addControl(scale);
          }

        });


      });
    },
    controllerAs: 'amap'
  };
}]);
