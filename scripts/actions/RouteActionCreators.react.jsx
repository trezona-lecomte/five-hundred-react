var FiveHundredDispatcher = require('../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');

var ActionTypes = FiveHundredConstants.ActionTypes;

module.exports = {

  redirect: function(route) {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};


