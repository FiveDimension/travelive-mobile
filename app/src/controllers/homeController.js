'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:HomeController
 * @description
 * # HomeController
 */
module.exports = [
    '$scope',
    'ExampleService',
    '$ionicModal',

    function( $scope, ExampleService, $ionicModal) {
      var searchScope = $scope.$new();
      searchScope.input = {};

      $scope.onFocus = function(){
        console.log("onFocus");
        searchScope.openModal();
      };

      $scope.goSearch = function(key){
        searchScope.openModal();
        searchScope.input.keyWord = key;
        searchScope.doSearch();
      };


      searchScope.goSearch = function(key){
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
        searchScope.result = {
          mdd: [{
            title: "soho1" + searchScope.input.keyWord
          },{
            title: "soho2" + searchScope.input.keyWord
          },{
            title: "soho3" + searchScope.input.keyWord
          },{
            title: "soho4" + searchScope.input.keyWord
          },{
            title: "soho5" + searchScope.input.keyWord
          }],
          xc: [{
            title: "soho一日游1"
          },{
            title: "soho一日游2"
          },{
            title: "soho一日游3"
          },{
            title: "soho一日游4"
          },{
            title: "soho一日游5"
          }]
        };
      };

      searchScope.openMdd = function(mdd){
        console.log("openMdd", mdd);
      };

      searchScope.moreMdd = function(){
        console.log("moreMdd");
      };

      searchScope.openXc = function(xc){
        console.log("openXc", xc);
      };

      searchScope.moreXc = function(){
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

      function getHistory(){
        var h = window.localStorage.getItem("search-history");
        if(h){
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
          old.push(key);
          window.localStorage.setItem("search-history", JSON.stringify(old));
        }
      }
    }
];
