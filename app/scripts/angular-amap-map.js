'use strict';

angular.module('l42y.amap.map', [
  'l42y.amap'
]).directive('amapMap', function ($window, Amap) {
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

        //self.map.plugin(["AMap.ToolBar"], function() {
        //  self.addControl(new AMap.ToolBar());
        //});
        //$scope.$watchCollection('fitView', function (overlays) {
        //  if (overlays) {
        //    map.setFitView(overlays);
        //  }
        //});
      });
    },
    controllerAs: 'amap'
  };
});
