var React        = require('react');
var Router       = require('react-router');
var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var FiveHundred = require('./components/FiveHundred.react.jsx');
var SignupPage  = require('./components/session/SignupPage.react.jsx');
var LoginPage   = require('./components/session/LoginPage.react.jsx');
var GamesPage   = require('./components/games/GamesPage.react.jsx');
var GameNew     = require('./components/games/GameNew.react.jsx');
var GamePage    = require('./components/games/GamePage.react.jsx');
var RoundPage   = require('./components/rounds/RoundPage.react.jsx');

module.exports = (
    <Route name="app" path="/" handler={FiveHundred}>
        <DefaultRoute handler={GamesPage} />
        <Route name="signup"   path="/signup"          handler={SignupPage}/>
        <Route name="login"    path="/login"           handler={LoginPage}/>
        <Route name="games"    path="/games"           handler={GamesPage}/>
        <Route name="new-game" path="/game/new"        handler={GameNew}/>
        <Route name="game"     path="/games/:gameId"   handler={GamePage} />
        <Route name="round"    path="/rounds/:roundId" handler={RoundPage} />
    </Route>
);

