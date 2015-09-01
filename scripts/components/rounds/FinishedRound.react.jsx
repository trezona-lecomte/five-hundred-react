var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;

var FinishedRound = React.createClass({

  getDefaultProps: function() {
    return {
      round: {}
    }
  },

  render: function() {
    var round = this.props.round;
    return (
      <div className="finished_round">
          <div className="round-id"><h2>Round {round.id}</h2></div>
          <NotificationArea round={round} />
          <RoundScoreBoard round={round} />
          <Link to="game" params={ {gameId: this.props.round.game_id} }>Back to game</Link>
      </div>
    );
  }
});

var NotificationArea = React.createClass({
  getDefaultProps: function() {
    return {
      round: {}
    }
  },
  render: function() {
    return (
      <div className="previous-winner-notification panel">
          <h5>{this.props.round.previous_trick_winner.handle} won the last trick. The round is now finished.</h5>
      </div>
    );
  }
});

var RoundScoreBoard = React.createClass({
  getDefaultProps: function() {
    return {
      round: {}
    }
  },
  oddTeam: function() {
    return this.props.round.players.filter(function(player) {
      return (player.order_in_game % 2 !== 0);
    });
  },
  evenTeam: function() {
    return this.props.round.players.filter(function(player) {
      return (player.order_in_game % 2 === 0);
    });
  },
  render: function() {
    return (
      <div className="round-score-board panel">
          <h5>Score for this round: </h5>
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
                      <td>{this.props.round.odd_players_score}</td>
                      <td>{this.oddTeam()[0].handle} & {this.oddTeam()[1].handle}</td>
                  </tr>
                  <tr>
                      <td>Team 2</td>
                      <td>{this.props.round.even_players_score}</td>
                      <td>{this.evenTeam()[0].handle} & {this.evenTeam()[1].handle}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    )
  }
});

module.exports = FinishedRound;
