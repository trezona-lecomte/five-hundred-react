var React               = require('react');
var State               = require('react-router').State;
var WebAPIUtils         = require('../../utils/WebAPIUtils.js');
var RoundStore          = require('../../stores/RoundStore.react.jsx');
var RoundActionCreators = require('../../actions/RoundActionCreators.react.jsx');
var ErrorNotice         = require('../common/ErrorNotice.react.jsx');

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
    console.log("Got round errors from store: " + RoundStore.getErrors());
    this.setState({
      round: RoundStore.getRound(),
      errors: RoundStore.getErrors()
    });
  },

  render: function() {
    console.log('re-rendering: ' + this.state.errors.length);
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var round = this.state.round;
    console.log("ROUND: " + JSON.stringify(round));
    return (
      <div>
          {errors}
          <div className="row">
              <div className="round-id"><h2>Round {round.id}</h2></div>
              <div className="round-tricks">Number of tricks: {round.trick_ids.length}</div>
              <ActiveTrick trick={round.active_trick} />
              <PlayerCardsList currentPlayerCards={round.current_player_cards} round={round} />
          </div>
      </div>
    );
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

var ActiveTrick = React.createClass({
  render: function() {
    return (
      <div className="active-trick panel">
          <div className="trick-number">
              <h4>Trick {this.props.trick.number_in_round} (current winning card: {this.props.trick.winning_card_id})</h4>
          </div>
          <div>
              <TrickCardsList trickCards={this.props.trick.cards} />
          </div>
      </div>
    )
  }
});

var TrickCardsList = React.createClass({
  getDefaultProps: function() {
    return {
      trickCards: []
    }
  },
  render: function() {
    var cards = this.props.trickCards;
    if (typeof cards !== 'undefined') {
      cards = cards.sort(function(a, b) {
        return a.position_in_trick - b.position_in_trick;
      });
    }
    return (
      <div className="trick-cards-list panel">
          <div>
              <ul className="trick-cards">
                  {cards.map(function(card, index){
                    return <TrickCardItem card={card} key={"card-" + index} />
                   })}
              </ul>
          </div>
      </div>
    )
  }
});

var TrickCardItem  = React.createClass({
  render: function() {
    return (
      <li className="trick-card">
          <p>Card #{this.props.card.id} | {this.props.card.rank} of {this.props.card.suit} - {this.props.card.played_by}</p>
      </li>
    );
  }
});

var PlayerCardsList = React.createClass({
  getDefaultProps: function() {
    return {
      round: {},
      playerCards: []
    }
  },
  render: function() {
    console.log('player_cards: ' + JSON.stringify(this.props.playerCards));
    var round = this.props.round;
    return (
      <div className="player-cards panel">
          <div className="player-cards-heading">
              <h4>Your hand:</h4>
          </div>
          <div>
              <ul className="player-cards">
                  {this.props.currentPlayerCards.map(function(card, index){
                    return <PlayerCardItem card={card} round={round} key={"card-" + index} />
                   })}
              </ul>
          </div>
      </div>
    )
  }
});

var PlayerCardItem  = React.createClass({
  getDefaultProps: function() {
    return {
      round: {},
      card: {}
    }
  },
  playCard: function(e) {
    e.preventDefault();
    RoundActionCreators.playCard(this.props.round, this.props.card.id);
  },
  render: function() {
    roundId = this.props.roundId
    card = this.props.card
    console.log('player-card-item: ' + this.props.card);
    return (
      <li className="player-card">
          <button onClick={this.playCard}>
              {card.rank} of {card.suit}
          </button>
      </li>
    );
  }
});

module.exports = RoundPage;
