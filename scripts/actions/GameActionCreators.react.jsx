var FiveHundredDispatcher = require('../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = FiveHundredConstants.ActionTypes;

module.exports = {

  loadGames: function() {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.LOAD_GAMES
    });
    WebAPIUtils.loadGames();
  },

  loadGame: function(gameId) {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.LOAD_GAME,
      gameId: gameId
    });
    WebAPIUtils.loadGame(gameId);
  },

  createGame: function() {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.CREATE_GAME
    });
    WebAPIUtils.createGame();
  },

  joinGame: function(handle, gameId) {
    FiveHundredDispatcher.handleViewAction({
      type: ActionTypes.JOIN_GAME,
      handle: handle,
      gameId: gameId
    });
    WebAPIUtils.joinGame(handle, gameId);
  }

};

