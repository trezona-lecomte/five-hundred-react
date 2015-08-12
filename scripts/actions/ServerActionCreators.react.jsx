var FiveHundredDispatcher = require('../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');

var ActionTypes = FiveHundredConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    FiveHundredDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveGames: function(json) {
    FiveHundredDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_GAMES,
      json: json
    });
  },

  receiveGame: function(json) {
    FiveHundredDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_GAME,
      json: json
    });
  },

  receiveCreatedGame: function(json, errors) {
    FiveHundredDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_GAME,
      json: json,
      errors: errors
    });
  },

  receiveRound: function(json, errors) {
    FiveHundredDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ROUND,
      json: json,
      errors: errors
    });
  }

};
