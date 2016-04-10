'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # DiscoveryController
 */
module.exports = [
    '$scope',
    '$state',
    '$http',

    function( $scope, $state, $http )
    {

      // just an example...
      $scope.fetchRandomText = function() {
        getData(function(){
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.items = [];
      //$timeout(function(){
      //  $scope.isLoading = false;
      //  $scope.lives = [{
      //    id: '1',
      //    image: 'http://dimg03.c-ctrip.com/images/tg/916/807/115/387aee47fc7a4439918c3cdc3e427db6_C_640_320.jpg',
      //    name: '闺蜜夏日——厦门、永定土楼、鼓浪屿',
      //    user: {name: '', avatar: ''}
      //  }, {
      //    id: '2',
      //    image: 'http://dimg02.c-ctrip.com/images/fd/tg/g5/M00/B1/10/CggYsVbRY5qAbkIuAATpTEgUDSw460_R_640_320.jpg',
      //    name: '苏。恋——姑苏梦，同里情',
      //    user: {name: '', avatar: ''}
      //  }];
      //}, 2000);
      $scope.openVideo = function(live) {
        if(live.status === 'online'){
          var data = {
            chatUrl: 'http://182.254.135.18:3000/?user='+ $scope.user.username +
            "&uid="+ $scope.user.uid +'&rid=' + live.st_id
          };
          live.playTime = new Date().getTime();
          PlayHistoryService.addPlayHistory(live);
          window.open("rtmp://182.254.135.18/live/" + live.st_id, "_playlive", JSON.stringify(data));
        } else {
          window.open('http://182.254.135.18:8080/record/'+ live.st_id +'.mp4', "", "location=yes");
        }
      };
      var getData = function(cb) {
        $scope.isLoading = true;
        $http.get('http://58.40.126.144/api/getHotStream').success(function(data){
          $scope.isLoading = false;
          $scope.items = [];
          for(var i =0 ;i< data.length; i++) {
            var  d = data[i];
            $scope.items.push({
              username: d.username,
              status: d.status,
              st_id: d.st_id,
              title: d.title,
              favorites_count: d.favorites_count,
              name: d.vp.name,
              image: d.vp.photo_url
            });
          }
          if(cb) {
            cb()
          }
        });
      };

      getData();


      $scope.createItinerary = function() {
        console.log($state);
        $state.go('app.itinerary_edit');
      }
    }
];
