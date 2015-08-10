var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/login",
    REGISTRATION:   APIRoot + "/users",
    GAMES:        APIRoot + "/games"
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
    RECEIVE_CREATED_GAME: null
  })

};
