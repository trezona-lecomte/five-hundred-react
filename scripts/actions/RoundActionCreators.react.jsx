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

  submitBid: function(round, bid) {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.SUBMIT_BID,
      roundId: round.id,
      pass: bid.pass,
      number_of_tricks: bid.number_of_tricks,
      suit: bid.suit
    });
    WebAPIUtils.submitBid(round.id, bid.pass, bid.number_of_tricks, bid.suit);
  },

  playCard: function(round, cardId) {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.PLAY_CARD,
      roundId: round.id,
      trickId: round.current_trick.id,
      cardId:  cardId
    });
    WebAPIUtils.playCard(round.id, round.current_trick.id, cardId);
  }

};
