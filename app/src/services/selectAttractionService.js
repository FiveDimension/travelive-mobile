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
    '$window',

    function($http, $q, $ionicModal, $rootScope, $window) {
      var selectAttraction = function(option){
        var deferred = $q.defer(),
          searchScope = $rootScope.$new();

        if(typeof option === 'undefined'){
          option = {};
        }

        searchScope.input={};

        $ionicModal.fromTemplateUrl('templates/views/modal/selectAttraction.html', {
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

          setTimeout(function(){
            $window.document.activeElement.blur();
          }, 100);

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
          window.localStorage.removeItem("search-history");
        };

        searchScope.onKeypress = function(e) {
          if(e.keyCode==13){
            searchScope.doSearch();
          }
        };

        searchScope.doSearch = function(){
          addHistory(searchScope.input.keyWord);
          $http.post('http://58.40.126.144/api/simpleSearchVp', {
              "dest": option.dest,
              "viewpoint": searchScope.input.keyWord
            }
          ).success(function(result){
              searchScope.result = result.map(function(item){
                return {title: item.name, vp_id: item.vp_id};
              });
          });
        };

        searchScope.doSelect = function(item){
          searchScope.closeModal();
          deferred.resolve(item);
        };

        return deferred.promise;
      };

      return {
        selectAttraction: selectAttraction
      };


      function getHistory() {
        var h = window.localStorage.getItem("search-history");
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
          window.localStorage.setItem("search-history", JSON.stringify(old));
        }
      }
    }
];
