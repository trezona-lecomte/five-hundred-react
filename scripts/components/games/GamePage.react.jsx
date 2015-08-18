var React              = require('react');
var Router             = require('react-router');
var State              = require('react-router').State;
var Link               = Router.Link;
var SessionStore       = require('../../stores/SessionStore.react.jsx');
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
          <GameScoreBoard game={this.state.game} />
          <JoinGamePanel players={this.state.game.players} game={this.state.game}/>
      </div>
    );
  }
});

var GameScoreBoard = React.createClass({
  getDefaultProps: function() {
    return {
      game: {},
      oddTeamHandles: [],
      evenTeamHandles: []
     }
  },
  oddTeam: function() {
    return this.props.game.players.filter(function(player) {
      return (player.number_in_game % 2 !== 0);
    });
  },
  evenTeam: function() {
    return this.props.game.players.filter(function(player) {
      return (player.number_in_game % 2 === 0);
    });
  },
  render: function() {
    var oddTeam = this.oddTeam();
    var evenTeam = this.evenTeam();
    if (typeof oddTeam[0] !== 'undefined') {
      this.props.oddTeamHandles += oddTeam[0].handle + " & ";
    }
    if (typeof oddTeam[1] !== 'undefined') {
      this.props.oddTeamHandles += oddTeam[1].handle;
    }
    if (typeof evenTeam[0] !== 'undefined') {
      this.props.evenTeamHandles += evenTeam[0].handle + " & ";
    }
    if (typeof evenTeam[1] !== 'undefined') {
      this.props.evenTeamHandles += evenTeam[1].handle;
    }
    return (
      <div className="game-score-board panel">
          <h5>Score for this game: </h5>
          <table>
              <thead>
                  <tr>
                      <th>Team</th>
                      <th>Score</th>
                      <th>Players</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Team 1</td>
                      <td>{this.props.game.odd_team_score}</td>
                      <td>{this.props.oddTeamHandles}</td>
                  </tr>
                  <tr>
                      <td>Team 2</td>
                      <td>{this.props.game.even_team_score}</td>
                      <td>{this.props.evenTeamHandles}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    )
  }
});

var JoinGamePanel = React.createClass({
  getDefaultProps: function() {
    return {
      players: [],
      game: {}
    }
  },
  render: function() {
    var userEmails = new Array();
    this.props.players.forEach(function(player) {
      userEmails.push(player.user.email);
    });

    if (userEmails.length > 0) {
      if (userEmails.length === 4) {
        return (
          <PlayGameButton activeRound={this.props.game.active_round} players={this.props.players}/>
        );
      }
      else if (userEmails.indexOf(SessionStore.getEmail()) > 0) {
        return (
          <div>You have joined this game. The game can start when 4 players have joined.</div>
        );
      }
      else {
        var handleRe = /(.*)@/
        var handleMatch = handleRe.exec(SessionStore.getEmail());
        console.log("HANDLE MATCH: " + handleMatch);
        return (
          <div>
              <JoinGameButton gameId={this.props.game.id} />
          </div>
        );
      }
    } else
    return <div></div>
  }
});

var JoinGameButton = React.createClass({
  getDefaultProps: function() {
    return {
      handle: null,
      gameId: null
    }
  },
  joinGame: function(e) {
    e.preventDefault();
    GameActionCreators.joinGame(this.props.handle, this.props.gameId);
  },
  render: function() {
    return (
      <button onClick={this.joinGame}>Join game</button>
    );
  }
});

var PlayGameButton = React.createClass({
  getDefaultProps: function() {
    return {
      activeRound: {},
      players: []
    }
  },
  render: function() {
    console.log(this.props.activeRound);
    if (this.props.players.length === 4) {
      return (
            <div className="play-game-button">
              <Link to="round" params={ {roundId: this.props.activeRound.id} }>
                Play game
              </Link>
            </div>
      );
    }
    else {
      return <div></div>
    }
  }
});

var PlayersList = React.createClass({
  getDefaultProps: function() {
    return {
      players: []
    }
  },
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

var PlayerItem = React.createClass({
  getDefaultProps: function() {
    return {
      player: {}
    }
  },
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

module.exports = GamePage;

