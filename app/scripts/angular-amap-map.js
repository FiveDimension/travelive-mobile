'use strict';

angular.module('l42y.amap.map', [
  'l42y.amap'
]).directive('amapMap', ['$window', 'Amap', '$rootScope', function ($window, Amap, $rootScope) {
  return {
    scope: {
      fitView: '=amapMapFitView'
    },
    restrict: 'EA',
    require: '?ngModel',
    template: '<div ></div>',
    //transclude: true,
    link: function ($scope, $element, $attrs, ngModel) {
      if (!ngModel) {
        return;
      }

      var customMarker1 = '<div class="amap-info">' +
        '<div style="position: absolute; bottom: 0px; left: 0px;"><div>' +
        '<div class="amap-info-content amap-info-outer" style="width: 230px;">';
      var customMarker2 = '</div>' +
        '<div class="amap-info-sharp" style="height: 23px;"></div></div>';
      var addButton = '<i class="icon ion-ios-plus" style="font-size: 38px;color: rgba(0, 0, 0, 0.45);"></i>';

      ngModel.$render = function() {
        var model = ngModel.$viewValue;
        if(!model) {
          return;
        }
        //console.log('model',  model);
        var options = model.mapOptions;
        var markers = model.markers;


        Amap.promise.then(function () {
          var map = new $window.AMap.Map($element[0], options);
          function addMarker(map) {
            if(markers == undefined) {
              console.error('markers is undefined');
              return;
            }
            for (var i = 0; i < markers.length; i++) {
              var marker = markers[i];
              console.log(marker);
              var m = new $window.AMap.Marker(marker);
              m.setMap(map);
              if (options.showInfoWindow) {
                var infowindowMarker = new $window.AMap.Marker({
                  content: customMarker1 + '<a href="'+ (marker.href? marker.href: 'javascript:void();') +'"><img src="' + marker.image + '" height="120"></img><a>' + customMarker2,
                  offset: new AMap.Pixel(-29, -30),
                  size: new AMap.Size(230, 0),
                  position:  m.getPosition()
                });
                infowindowMarker.setMap(map);
              }

              if (options.showAddButton) {
                var addM  = document.createElement('A');
                addM.innerHTML = addButton;
                (function(marker){
                  addM.onclick = function() {
                    console.log(marker.addId);
                    //TODO: 将景点添加到 行程中
                  };
                })(marker);

                var addButtonMarker = new $window.AMap.Marker({
                  content: addM,
                  offset: new AMap.Pixel(-43, -48),
                  //size: new AMap.Size(230, 0),
                  position:  m.getPosition()
                });
                addButtonMarker.setMap(map);
              }
            }
          }

          addMarker(map);
          $window.AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            if (options.pluginToolBar) {
              var toolBar = new $window.AMap.ToolBar();
              map.addControl(toolBar);
            }
            if (options.pluginScale) {
              var scale = new $window.AMap.Scale();
              map.addControl(scale);
            }

          });


        });

      };



    }
  };
}]);
