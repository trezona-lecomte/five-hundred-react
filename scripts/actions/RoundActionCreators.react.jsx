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
  },

  playCard: function(round, cardId) {
    console.log('cardId in RoundActionCreator: ' + cardId);
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.PLAY_CARD,
      roundId: round.id,
      trickId: round.active_trick.id,
      cardId:  cardId
    });
    WebAPIUtils.playCard(round.id, round.active_trick.id, cardId);
  }

};
