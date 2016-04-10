'use strict';

module.exports = [
    '$window',

    function( $window) {
      // public api
      var _follow = [];

      var h = $window.localStorage.getItem("follow");
      if (h) {
        _follow = JSON.parse(h);
      }
      function isFollow(uid){
        for(var i=0;i<_follow.length; ++i){
          if(_follow[i].uid==uid){
            return true;
          }
        }
        return false;
      }
      return {
        isFollow: isFollow,
        getFollow: function() {
          return _follow;
        },
        addFollow: function(user) {
          if(!isFollow(user.uid)){
            _follow.splice(0, 0, user);
            $window.localStorage.setItem("follow", JSON.stringify(_follow));
          }
          return _follow;
        },
        removeFollow: function(uid){
          var new_follow = [];
          _follow.forEach(function(e, i){
            if(e!==uid){
              new_follow.push(e);
            }
          });
          _follow = new_follow;
          $window.localStorage.setItem("follow", JSON.stringify(_follow));
          return _follow;
        }
      };
    }
];
