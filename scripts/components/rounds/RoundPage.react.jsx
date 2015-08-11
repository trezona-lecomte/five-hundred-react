var React               = require('react');
var State               = require('react-router').State;
var WebAPIUtils         = require('../../utils/WebAPIUtils.js');
var RoundStore          = require('../../stores/RoundStore.react.jsx');
var RoundActionCreators = require('../../actions/RoundActionCreators.react.jsx');

var RoundPage = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      round: RoundStore.getRound(),
      errors: []
    };
  },

  componentDidMount: function() {
    RoundStore.addChangeListener(this._onChange);
    RoundActionCreators.loadRound(this.getParams().roundId);
  },

  componentWillUnmount: function() {
    RoundStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log("Got round from store: " + RoundStore.getRound());
    this.setState({
      round: RoundStore.getRound(),
      errors: RoundStore.getErrors()
    });
  },

  render: function() {
    console.log("ROUND: " + JSON.stringify(this.state.round));
    return (
      <div className="row">
          <div className="round-id"><h2>Round {this.state.round.id}</h2></div>
          <div className="round-tricks">Number of tricks: {this.state.round.tricks.length}</div>
          <TricksList tricks={this.state.round.tricks} />
          <PlayerCardsList playerCards={this.state.round.player_cards} />
      </div>
    );
  }
});

var TrickItem = React.createClass({
  render: function() {
    console.log('trick_cards: ' + JSON.stringify(this.props.trick));
    return (
      <div className="trick panel">
          <div className="trick-id">
              <p>Trick {this.props.trick.id}</p>
          </div>
          <div>
              <ul className="trick-cards">
                  {this.props.trick.cards.map(function(card, index){
                    return <TrickCardItem card={card} key={"card-" + index} />
                   })}
              </ul>
          </div>
      </div>
    )
  }
});

var TricksList = React.createClass({
  getDefaultProps: function() {
    return {
      tricks: []
    }
  },
  render: function() {
    return (
      <ul className="inline-list">
          {this.props.tricks.map(function(trick, index){
            return <TrickItem trick={trick} key={"trick-" + index} />
           })}
      </ul>
    );
  }
});

var TrickCardItem  = React.createClass({
  render: function() {
    console.log('trick-card-item: ' + this.props.card);
    return (
      <li className="trick-card">
          <p>{this.props.card.rank} of {this.props.card.suit} - {this.props.card.played_by}</p>
      </li>
    );
  }
});

var PlayerCardItem  = React.createClass({
  render: function() {
    console.log('player-card-item: ' + this.props.card);
    return (
      <li className="player-card">
          <p>{this.props.card.rank} of {this.props.card.suit}</p>
      </li>
    );
  }
});

var PlayerCardsList = React.createClass({
  getDefaultProps: function() {
    return {
      playerCards: []
    }
  },
  render: function() {
    console.log('player_cards: ' + JSON.stringify(this.props.playerCard));
    return (
      <div className="player-cards panel">
          <div className="player-cards-heading">
              <h4>Your hand:</h4>
          </div>
          <div>
              <ul className="player-cards">
                  {this.props.playerCards.map(function(card, index){
                    return <PlayerCardItem card={card} key={"card-" + index} />
                   })}
              </ul>
          </div>
      </div>
    )
  }
});

module.exports = RoundPage;
