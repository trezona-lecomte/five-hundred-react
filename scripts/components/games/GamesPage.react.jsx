var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var GameStore = require('../../stores/GameStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var GameActionCreators = require('../../actions/GameActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var GamesPage = React.createClass({

  getInitialState: function() {
    return {
      games: GameStore.getAllGames(),
      errors: []
    };
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
    GameActionCreators.loadGames();
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      games: GameStore.getAllGames(),
      errors: GameStore.getErrors()
    });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <GamesList games={this.state.games} />
        </div>
      </div>
    );
  }
});

var GameItem = React.createClass({
  render: function() {
    return (
      <li className="game">
        <div className="game-id">
          <Link to="game" params={ {gameId: this.props.game.id} }>
            Game {this.props.game.id}
          </Link>
        </div>
      </li>
      );
  }
});

var GamesList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.games.map(function(game, index){
          return <GameItem game={game} key={"game-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = GamesPage;

