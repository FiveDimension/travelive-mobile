'use strict';

/**
 * @ngdoc function
 * @name Travelive.service:ExampleService
 * @description
 * # ExampleService
 */
module.exports = [
    '$http',
    '$q',
    '$ionicModal',
    '$rootScope',

    function($http, $q, $ionicModal, $rootScope) {
      var hotCity = [
        "北京",
        "上海",
        "广州",
        "深圳",
        "成都",
        "杭州",
        "武汉",
        "西安",
        "重庆",
        "青岛",
        "南京",
        "厦门",
        "大连",
        "天津",
        "三亚",
        "济南",
        "台北",
        "香港",
        "沈阳",
        "苏州"
      ],
        allCity = ["北京","上海","广州","深圳","成都","杭州","武汉","西安","重庆","青岛",
          "南京","厦门","大连","天津","三亚","济南","台北","香港","沈阳","苏州"];

      var selectDestination = function(){
        var deferred = $q.defer(),
          searchScope = $rootScope.$new();

        searchScope.hotCity = hotCity;
        searchScope.input={};

        $ionicModal.fromTemplateUrl('templates/views/modal/selectDestination.html', {
          scope: searchScope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          searchScope.modal = modal;
          searchScope.openModal();
        });

        searchScope.closeModal = function () {
          searchScope.modal.hide();
          searchScope.$destroy();
        };

        searchScope.goSearch = function(key){
          searchScope.input.keyWord = key;
          searchScope.doSearch();
        };

        searchScope.openModal = function () {
          var i, ln;
          searchScope.modal.show();
          searchScope.rh = getHistory();
          ln = searchScope.rh.length;

          if(ln == 0) return;
          if(ln < 4) {
            for(i = 0; i < 4 - ln; ++i){
              searchScope.rh.push("");
            }
          }else if(ln > 4 && ln < 8){
            for(i = 0; i < 8 - ln; ++i){
              searchScope.rh.push("");
            }
          }
        };

        searchScope.clearHistory = function(){
          searchScope.rh = [];
          window.localStorage.removeItem("search-dest-history");
        };

        searchScope.onKeypress = function(e) {
          if(e.keyCode==13){
            searchScope.doSearch();
          }
        };

        searchScope.doSearch = function(){
          var key = searchScope.input.keyWord,
            array = allCity;
          addHistory(key);

          searchScope.result = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i].indexOf(key) == 0) {
              searchScope.result.push(array[i]);
            }
          }
        };

        searchScope.doSelect = function(item){
          searchScope.closeModal();
          deferred.resolve(item);
        };

        return deferred.promise;
      };

      return {
        selectDestination: selectDestination
      };


      function getHistory() {
        var h = window.localStorage.getItem("search-dest-history");
        if (h) {
          return JSON.parse(h);
        }
        return [];
      }

      function addHistory(key){
        var old = getHistory(),
          isKey = false;
        for(var i= 0, ln = old.length; i< ln; ++i){
          if(key==old[i]){
            isKey = true;
            break;
          }
        }
        if(!isKey){
          old.splice(0,0, key);
          if (old.length > 8) {
            old = old.slice(0, 8);
          }
          window.localStorage.setItem("search-dest-history", JSON.stringify(old));
        }
      }
    }
];
