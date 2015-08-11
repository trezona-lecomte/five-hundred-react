var React              = require('react');
var Router             = require('react-router');
var State              = require('react-router').State;
var Link               = Router.Link;
var WebAPIUtils        = require('../../utils/WebAPIUtils.js');
var GameStore          = require('../../stores/GameStore.react.jsx');
var GameActionCreators = require('../../actions/GameActionCreators.react.jsx');

var GamePage = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      game: GameStore.getGame(),
      errors: []
    };
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
    GameActionCreators.loadGame(this.getParams().gameId);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      game: GameStore.getGame(),
      errors: GameStore.getErrors()
    });
  },

  // TODO: this doesn't work after login, fixed with refresh..
  render: function() {
    console.log('rounds: ' + JSON.stringify(this.state.game.rounds));
    return (
      <div className="row">
          <div className="game-id"><h2>Game {this.state.game.id}</h2></div>
          <div className="game-rounds">Number of rounds: {this.state.game.rounds.length}</div>
          <div className="game-players">Number of players: {this.state.game.players.length}</div>
          <PlayersList players={this.state.game.players} />
          <RoundsList rounds={this.state.game.rounds} />
      </div>
    );
  }

});

var PlayerItem = React.createClass({
  render: function() {
    return (
      <li className="player">
          <div className="player-id">
              <p> Player {this.props.player.id} - {this.props.player.user.username}</p>
          </div>
      </li>
    );
  }
});

var PlayersList = React.createClass({
  render: function() {
    return (
      <ul className="row">
          {this.props.players.map(function(player, index){
            return <PlayerItem player={player} key={"player-" + index}/>
           })}
      </ul>
    );
  }
});

var RoundItem = React.createClass({
  render: function() {
    return (
      <li className="round">
          <div className="round-id">
              <Link to="round" params={ {roundId: this.props.round.id} }>
              Round {this.props.round.id}
          </Link>
          </div>
      </li>
    );
  }
});

var RoundsList = React.createClass({
  render: function() {
    return (
      <ul className="row">
          {this.props.rounds.map(function(round, index){
            return <RoundItem round={round} key={"round-" + index}/>
           })}
      </ul>
    );
  }
});

module.exports = GamePage;

