'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:HomeController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  '$state',
  '$ionicModal',
  '$rootScope',
  '$http',

  function ($scope, $state, $ionicModal, $rootScope, $http) {
    var searchScope = $scope.$new();
    searchScope.input = {};

    $scope.openLive = function () {
      window.open("rtmp://127.0.0.1/myapp/b", "_live");
    };

    $scope.onFocus = function () {
      console.log("onFocus");
      searchScope.openModal();
    };
    $scope.dest = '上海';
    $scope.viewpoint = '';

    $scope.doSearch = function () {
      //$rootScope.CurrentMap = {
      //  topic: "千岛湖：绿水青山与翠岛",
      //  photo: "http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800",
      //  introduce: "位于杭州淳安的千岛湖，山青水绿，是江浙沪周边度假的好去处。游玩千岛湖主要坐游船徜徉湖上和登岛游览，不仅湖上风光秀美，湖中每个岛的景致都各有特色。 千岛湖按照游船线路为中心湖区、东南湖区，西南湖区则有龙川湾、芹川村，可以观赏湿地和古村风光。除了观光景点，千岛湖的环湖公路也特别适合骑行，岛上酒店和咨询点就可以租车。",
      //  mapOptions: {
      //    resizeEnable: true,
      //    center: [119.035393066406, 29.60462623291016],
      //    zoom: 16,
      //    pluginScale: true,
      //    pluginToolBar: true,
      //    showInfoWindow: true,
      //    showAddButton: true
      //  },
      //  markers: [{
      //    position: [119.035393066406, 29.60562623291016],
      //    image: 'http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800',
      //    liveUrl: 'rtmp://127.0.0.1/live',
      //    href: '#/app/spot/123',
      //    addId: 123
      //  },
      //    {
      //      position: [119.036393066406, 29.60462623291016],
      //      image: 'http://inspiration.chanyouji.cn/InspirationActivity/5285/cc55afcb48aa67b18b410ebb0e7128f9.jpg?imageMogr2/crop/!2953x1772a539a0/thumbnail/800',
      //      liveUrl: 'rtmp://127.0.0.1/live',
      //      href: '#/app/spot/124',
      //      addId: 124
      //    }]
      //};
      var postData = {dest: $scope.dest, viewpoint: $scope.viewpoint};
      console.log(postData);
      $http.post('http://58.40.126.144/api/searchVp', postData).success(function (data) {
        console.log(data);
        if(data.length == 0) return;
        $rootScope.CurrentMap = {
          vp_id: data[0].vp_id,
          topic: data[0].name,
          introduce: data[0].introduce,
          image: data[0].photo_url,
          mapOptions: {
            resizeEnable: true,
            center: [data[0].pin.location.lon, data[0].pin.location.lat],
            zoom: 16,
            pluginScale: true,
            pluginToolBar: true,
            showInfoWindow: true,
            showAddButton: true
          },
          markers: []
        };

        for (var i = 0; i < data.length; i++) {
          $rootScope.CurrentMap.markers.push({
            position: [data[i].pin.location.lon, data[i].pin.location.lat],
            image: data[i].photo_url,
            href: '#/app/spot/' + data[i].vp_id ,
            vpId: data[i].vp_id
          })
        }
        //console.log($rootScope.CurrentMap);
        $state.go('app.searchRes');
      });

    };

    $scope.goSearch = function (key) {
      searchScope.openModal();
      searchScope.input.keyWord = key;
      searchScope.doSearch();
    };


    searchScope.goSearch = function (key) {
      searchScope.input.keyWord = key;
      searchScope.doSearch();
    };

    $ionicModal.fromTemplateUrl('templates/views/modal/search.html', {
      scope: searchScope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      searchScope.modal = modal;
    });

    searchScope.openModal = function () {
      searchScope.modal.show();
      searchScope.rh = getHistory();
    };
    searchScope.closeModal = function () {
      searchScope.modal.hide();
      searchScope.result = undefined;
      searchScope.input.keyWord = "";
    };

    searchScope.clearHistory = function () {
      searchScope.rh = [];
      window.localStorage.removeItem("search-history");
    };


    searchScope.onKeypress = function (e) {
      if (e.keyCode == 13) {
        searchScope.doSearch();
      }
    };

    searchScope.doSearch = function () {
      addHistory(searchScope.input.keyWord);
      searchScope.result = {
        mdd: [{
          title: "soho1" + searchScope.input.keyWord
        }, {
          title: "soho2" + searchScope.input.keyWord
        }, {
          title: "soho3" + searchScope.input.keyWord
        }, {
          title: "soho4" + searchScope.input.keyWord
        }, {
          title: "soho5" + searchScope.input.keyWord
        }],
        xc: [{
          title: "soho一日游1"
        }, {
          title: "soho一日游2"
        }, {
          title: "soho一日游3"
        }, {
          title: "soho一日游4"
        }, {
          title: "soho一日游5"
        }]
      };
    };

    searchScope.openMdd = function (mdd) {
      console.log("openMdd", mdd);
    };

    searchScope.moreMdd = function () {
      console.log("moreMdd");
    };

    searchScope.openXc = function (xc) {
      console.log("openXc", xc);
    };

    searchScope.moreXc = function () {
      console.log("moreXc");
    };


//Cleanup the modal when we're done with it!
    searchScope.$on('$destroy', function () {
      searchScope.modal.remove();
    });
// Execute action on hide modal
    searchScope.$on('modal.hidden', function () {
// Execute action
    });
// Execute action on remove modal
    searchScope.$on('modal.removed', function () {
// Execute action
    });

    function getHistory() {
      var h = window.localStorage.getItem("search-history");
      if (h) {
        return JSON.parse(h);
      }
      return [];
    }

    function addHistory(key) {
      var old = getHistory(),
        isKey = false;
      for (var i = 0, ln = old.length; i < ln; ++i) {
        if (key == old[i]) {
          isKey = true;
          break;
        }
      }
      if (!isKey) {
        old.push(key);
        window.localStorage.setItem("search-history", JSON.stringify(old));
      }
    }
  }
];
