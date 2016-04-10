'use strict';

angular.module('l42y.amap.map', [
  'l42y.amap',
  'ngCordova',
]).directive('amapMap', ['$window', 'Amap', '$rootScope', '$cordovaMedia', function ($window, Amap, $rootScope, $cordovaMedia) {
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
      var map;
      var customMarker1 = '<div class="amap-info">' +
        '<div style="position: absolute; bottom: 0px; left: 0px;"><div>' +
        '<div class="amap-info-content amap-info-outer" style="width: 230px;">';
      var customMarker2 = '</div>' +
        '<div class="amap-info-sharp" style="height: 23px;"></div></div>';
      var addButton = '<i class="icon ion-ios-plus" style="font-size: 38px;color: rgba(0, 0, 0, 0.45);"></i>';
      var delButton = '<i class="icon ion-minus-circled" style="font-size: 38px;color: rgba(0, 0, 0, 0.45);"></i>';
      var audioButton = '<i class="icon ion-headphone" style="font-size: 38px;color: #0c60ee;text-shadow: 1px 1px 1px #000;"></i>';


      function addMarker(map, options, markers) {
        if(markers == undefined) {
          console.error('markers is undefined');
          return;
        }
        var lineArr = [];
        for (var i = 0; i < markers.length; i++) {
          var marker = markers[i];
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

          if (options.audio && marker.voice_url) {
              var audioM  = document.createElement('A');
              (function(marker, audioM){
                audioM.innerHTML = audioButton;
                var isPlaying = false;
                var media;
                audioM.onclick = function() {
                  console.log('audioM', marker.voice_url);
                  //$rootScope.$broadcast('cachedDelVpId', marker.vpId);
                  //TODO: 播放音频
                  if(isPlaying) {
                    media.stop();
                  } else{
                    media = $cordovaMedia.newMedia(marker.voice_url);
                    media.play();
                  }
                  isPlaying = !isPlaying;

                  //var my_media = new Media(audioM.url,
                  //  function () {
                  //    console.log("playAudio() : success");
                  //  },
                  //  function (err) {
                  //    console.log("playAudio() : : "+err);
                  //  });
                  //my_media.play();
                };
              })(marker, audioM);
            var audioButtonMarker = new $window.AMap.Marker({
              content: audioM,
              offset: new AMap.Pixel(3, -64),
              //size: new AMap.Size(230, 0),
              position:  m.getPosition()
            });
            audioButtonMarker.setMap(map);
          }

          lineArr.push(marker.position);
          if (options.showAddButton) {
            var addM  = document.createElement('A');
            (function(marker){
              if(marker.isAdded) {
                addM.innerHTML = delButton;
                addM.onclick = function() {
                  console.log(marker.vpId);
                  $rootScope.$broadcast('cachedDelVpId', marker.vpId);
                  //TODO: 将景点添加到 行程中
                };
              } else {
                addM.innerHTML = addButton;
                addM.onclick = function() {
                  console.log(marker.vpId);
                  $rootScope.$broadcast('cachedAddVpId', marker.vpId);
                  //TODO: 将景点添加到 行程中
                };
              }

            })(marker, addM);

            var addButtonMarker = new $window.AMap.Marker({
              content: addM,
              offset: new AMap.Pixel(-43, -48),
              //size: new AMap.Size(230, 0),
              position:  m.getPosition()
            });
            addButtonMarker.setMap(map);
          }
        }

        if (options.showPolyline) {
          var polyline = new $window.AMap.Polyline({
            path: lineArr,          //设置线覆盖物路径
            strokeColor: "#FF0000", //线颜色
            strokeOpacity: 1,       //线透明度
            strokeWeight: 5,        //线宽
            strokeStyle: "solid",   //线样式
            strokeDasharray: [10, 5] //补充线样式
          });
          polyline.setMap(map);
        }
      }

      ngModel.$render = function() {
        var model = ngModel.$viewValue;
        if(!model) {
          return;
        }
        var options = model.mapOptions;
        var markers = model.markers;
        console.log('options',  options);
        console.log('markers',  markers);
        Amap.promise.then(function () {
          console.log('options2',  options);
          map = new $window.AMap.Map($element[0], options);
          addMarker(map, options, markers);
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

      $scope.$on('refreshAMapMarker', function(event, options, markers){
        console.log('refreshAMap');
        map.clearMap();
        addMarker(map, options, markers);
      });

      $scope.$on('setCenter', function(event, options){
        console.log('setCenter', options);
        map.setCenter(options);
      });


    }
  };
}]);
