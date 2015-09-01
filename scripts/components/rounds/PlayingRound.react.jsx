var React               = require('react');
var RoundActionCreators = require('../../actions/RoundActionCreators.react.jsx');

var PlayingRound = React.createClass({
/* TODO: look into using models in js to contain some of the logic here. */
  getDefaultProps: function() {
    return {
      round: {}
    };
  },

  render: function() {
    var round = this.props.round;
    return (
      <div>
          <div className="playing-round">
              <div className="round-id"><h2>Round {round.id}</h2></div>
              <NotificationArea round={round} />
              <ActiveTrick trick={round.current_trick} />
              <PlayerCardsList currentPlayerCards={round.current_player_cards} round={round} />
          </div>
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
    var cards = this.props.round.current_trick.cards;
    if (typeof cards !== 'undefined' && this.props.round.current_trick.order_in_round === 1) {
      return (
        <div className="bidding-winner-notification panel">
            <h5>{this.props.round.highest_bid.player} won the bidding, so it's their turn to play a card.</h5>
        </div>
      );
    } else if (typeof cards !== 'undefined' && cards.length === 0) {
      return (
        <div className="previous-winner-notification panel">
            <h5>{this.props.round.previous_trick_winner.handle} won the previous trick, so it's their turn to play a card.</h5>
        </div>
      );
    } else {
      // subsequent card of trick
      return (
        <div>
        </div>
      );
    }
  }
});

var ActiveTrick = React.createClass({
  render: function() {
    return (
      <div className="active-trick panel">
          <div className="trick-number">
              <h4>Trick {this.props.trick.order_in_round + 1} (current winning card: {this.props.trick.winning_card_id})</h4>
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
              <ul className="player-cards inline-list" >
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
    var roundId = this.props.roundId
    card = this.props.card
    console.log('player-card-item: ' + this.props.card);
    var cardImageName = "/dist/images/" + card.rank + "_of_" + card.suit + ".png"
    return (
      <li className="player-card">
          <input type="image" src={cardImageName} onClick={this.playCard}>
          </input>
      </li>
    );
  }
});

module.exports = PlayingRound;
