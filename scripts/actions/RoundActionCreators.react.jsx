var FiveHundredDispatcher = require('../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = FiveHundredConstants.ActionTypes;

module.exports = {

  loadRounds: function() {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.LOAD_ROUNDS
    });
    WebAPIUtils.loadRounds();
  },

  loadRound: function(roundId) {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.LOAD_ROUND,
      roundId: roundId
    });
    WebAPIUtils.loadRound(roundId);
  },

  createRound: function() {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.CREATE_ROUND
    });
    WebAPIUtils.createRound();
  }

};