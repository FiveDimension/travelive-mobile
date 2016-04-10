'use strict';

module.exports = [
    '$window',

    function( $window) {
      console.log("............");
      // public api
      var _playHistory = [];

      var h = $window.localStorage.getItem("play-history");
      if (h) {
        _playHistory = JSON.parse(h);
      }

      return {
        getPlayHistory: function() { return _playHistory; },
        addPlayHistory: function(live) {
          _playHistory.splice(0, 0, live);
          $window.localStorage.setItem("play-history", JSON.stringify(_playHistory));
          return _playHistory;
        }
      };
    }
];
