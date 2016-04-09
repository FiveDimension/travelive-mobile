'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
  '$scope',
  '$http',
  '$ionicPopup',
  '$ionicActionSheet',
  '$timeout',

  function ($scope, $http, $ionicPopup, $ionicActionSheet, $timeout) {
    if ($scope.user) {
      $scope.showMenu = function(st){
        var option = {
            buttons: [
              { text: '播放'}
            ],
            destructiveText: '删除',
            //titleText: '编辑直播',
            cancelText: '取消',
            cancel: function() {
              // add cancel code..
            },
            buttonClicked:  function(index) {
              console.log('buttonClicked', index);
              //TODO openVideo
              return true;
            },
            destructiveButtonClicked: function() {
              $http.post('http://58.40.126.144/api/deleteStream', {"st_id": st.id})
                .success(function (data) {
                  console.log(data);
                  var index = $scope.lives.indexOf(st);
                  $scope.lives.splice(index, 1);
                });
              return true;
            }
          };

        if(st.status === 'online'){
          option.buttons = [{text: '关闭直播' }];
          //var old = option.buttonClicked;
          option.buttonClicked = function(index) {
            $http.post('http://58.40.126.144/api/closeStream', {st_id: String(st.id)}).success(function(data){
              if(!data.message){
                $ionicPopup.alert({
                  title: '失败'
                })
              }else{
                st.status = 'offline';
              }
            });
            return true;
          }
        }

        $ionicActionSheet.show(option);
      };

      loadList();
    } else {
      $ionicPopup.alert({
        title: '未登入'
      })
        .then(function (res) {
          $scope.goBack();
        })
    }

    function getTimeFormST(stId){
      var sLn = stId.length,
        tStr = stId.substring(sLn-10,sLn);

      return new Date(Number(tStr+"000"));
    }


    function loadList(){
      $http.post('http://58.40.126.144/api/getStreamListByUser', {"user_id": $scope.user.uid})
        .success(function (data) {
          $scope.lives = data.map(function(item){
            return {
              id: item.st_id,
              title: item.title,
              status: item.status,
              time: getTimeFormST(item.st_id)
            };
          });

          $scope.lives = $scope.lives.sort(function (a, b) {
            return b.time - a.time;
          })
        });
    }
  }
];
