var FiveHundredDispatcher = require('../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = FiveHundredConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _games = [];
var _errors = [];
var _game = { id: "",
              path: "",
              stage: "",
              active_round: {},
              players: [],
              rounds: [] };

var GameStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllGames: function() {
    return _games;
  },

  getGame: function() {
    return _game;
  },

  getErrors: function() {
    return _errors;
  }

});

GameStore.dispatchToken = FiveHundredDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_GAMES:
      _games = action.json.games;
      GameStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_GAME:
      if (action.json) {
        _games.unshift(action.json.game);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      GameStore.emitChange();
      break;

    case ActionTypes.RECEIVE_GAME:
      if (action.json) {
        _game = action.json.game;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      GameStore.emitChange();
      break;
  }

  return true;
});

module.exports = GameStore;

