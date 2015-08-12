var FiveHundredDispatcher = require('../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = FiveHundredConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _rounds = [];
var _errors = [];
var _round = { id: "", path: "", active_trick: {}, trick_ids: [], current_player_cards: [] };

var RoundStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllRounds: function() {
    return _rounds;
  },

  getRound: function() {
    return _round;
  },

  getErrors: function() {
    return _errors;
  }

});

RoundStore.dispatchToken = FiveHundredDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_ROUNDS:
      _rounds = action.json.rounds;
      RoundStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_ROUND:
      if (action.json) {
        _rounds.unshift(action.json.round);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      RoundStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ROUND:
      if (action.json) {
        _round = action.json.round;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      RoundStore.emitChange();
      break;
  }

  return true;
});

module.exports = RoundStore;
