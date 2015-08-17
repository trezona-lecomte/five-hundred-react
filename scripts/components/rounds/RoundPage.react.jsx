var React               = require('react');
var State               = require('react-router').State;
var WebAPIUtils         = require('../../utils/WebAPIUtils.js');
var RoundStore          = require('../../stores/RoundStore.react.jsx');
var RoundActionCreators = require('../../actions/RoundActionCreators.react.jsx');
var ErrorNotice         = require('../common/ErrorNotice.react.jsx');
var BiddingRound        = require('./BiddingRound.react.jsx');
var PlayingRound        = require('./PlayingRound.react.jsx');
var FinishedRound       = require('./FinishedRound.react.jsx');

var RoundPage = React.createClass({

  mixins: [
    State
  ],

  getInitialState: function() {
    return {
      round: RoundStore.getRound(),
      timerId: null,
      errors: []
    };
  },

  componentDidMount: function() {
    var roundId = this.getParams().roundId;
    RoundStore.addChangeListener(this._onChange);
    RoundActionCreators.loadRound(roundId);
    this.state.timerId = window.setInterval(function(){RoundActionCreators.loadRound(roundId)}, 2000);
  },

  componentWillUnmount: function() {
    window.clearInterval(this.state.timerId);
    RoundStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log("errors from round store: " + RoundStore.getErrors());
    this.setState({
      round: RoundStore.getRound(),
      errors: RoundStore.getErrors()
    });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var round = this.state.round;
    var players = round.players;
    console.log('players: ' + JSON.stringify(players));
    if (this.state.round.stage === "bidding") {
      return (
        <div>
           {errors}
            <BiddingRound round={this.state.round} players={players} errors={this.state.errors} />
        </div>
      );
    }
    else if (this.state.round.stage === "playing") {
      return (
        <div>
            {errors}
            <PlayingRound round={this.state.round} errors={this.state.errors} />
        </div>
      )
    }
    else if (this.state.round.stage === "finished") {
      return (
        <div>
            {errors}
            <FinishedRound round={this.state.round} errors={this.state.errors} />
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
});

module.exports = RoundPage;
