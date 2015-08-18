var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var FiveHundredConstants = require('../constants/FiveHundredConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = FiveHundredConstants.APIEndpoints;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: {
        email: email,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  loadGames: function() {
    request.get(APIEndpoints.GAMES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveGames(json);
        }
      });
  },

  loadGame: function(gameId) {
    request.get(APIEndpoints.GAMES + '/' + gameId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveGame(json);
        }
      });
  },

  createGame: function() {
    request.post(APIEndpoints.GAMES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ game: { } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedGame(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedGame(json, null);
          }
        }
      });
  },

  joinGame: function(handle, gameId) {
    request.post(APIEndpoints.GAMES + '/' + gameId + '/players')
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ handle: handle })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveGame(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveGame(json, null);
          }
        }
      });
  },

  loadRounds: function(gameId) {
    request.get(APIEndpoints.GAMES + '/' + gameId + APIEndpoints.ROUNDS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveRounds(json);
        }
      });
  },

  loadRound: function(roundId) {
    request.get(APIEndpoints.ROUNDS + '/' + roundId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          if (res.error) {
            console.log('Error returned from loadRound: ' + _getErrors(res));
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveRound(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveRound(json, null);
          }
        }
      });
  },

  playCard: function(roundId, trickId, cardId) {
    request.patch(APIEndpoints.ROUNDS + '/' + roundId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send(
        {
          "round": {
            "cards": [
              {
                "id": cardId,
                "trick_id": trickId
              }
            ]
          }
        }
      )
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveRound(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveRound(json, null);
          }
        }
      });
  },

  submitBid: function(roundId, numberOfTricks, suit) {
    console.log('submitting bid: ' + numberOfTricks + " | " + suit);
    request.post(APIEndpoints.ROUNDS + '/' + roundId + '/bids')
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send(
        {
          "number_of_tricks": numberOfTricks,
          "suit": suit
        }
      )
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveRound(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveRound(json, null);
          }
        }
      });
  }

};

