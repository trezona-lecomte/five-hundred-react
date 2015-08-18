var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/login",
    REGISTRATION:   APIRoot + "/users",
    GAMES:          APIRoot + "/games",
    ROUNDS:         APIRoot + "/rounds"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    // GAMES
    LOAD_GAMES: null,
    RECEIVE_GAMES: null,
    LOAD_GAME: null,
    RECEIVE_GAME: null,
    CREATE_GAME: null,
    RECEIVE_CREATED_GAME: null,
    JOIN_GAME: null,

    // ROUNDS
    LOAD_ROUNDS: null,
    RECEIVE_ROUNDS: null,
    LOAD_ROUND: null,
    RECEIVE_ROUND: null,
    CREATE_ROUND: null,
    RECEIVE_CREATED_ROUND: null,

    // BIDS & PLAYS
    SUBMIT_BID: null,
    PLAY_CARD: null
  })

};
