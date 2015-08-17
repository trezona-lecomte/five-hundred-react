var React               = require('react');
//var State               = require('react-router').State;
//var WebAPIUtils         = require('../../utils/WebAPIUtils.js');
//var RoundStore          = require('../../stores/RoundStore.react.jsx');
var RoundActionCreators = require('../../actions/RoundActionCreators.react.jsx');
//var ErrorNotice         = require('../common/ErrorNotice.react.jsx');

var BiddingRound = React.createClass({

  getDefaultProps: function() {
    return {
      round: {},
      players: []
    };
  },

  render: function() {
    var round = this.props.round;
    var players = this.props.players;
    console.log('players in bidding round: ' + players);
    return (
      <div>
          <div className="row bidding-round">
              <div className="round-id"><h2>Round {round.id}</h2></div>
              <NotificationArea round={round} players={players}/>
              <PlacedBidsList bids={round.placed_bids} />
              <AvailableBidsList bids={round.available_bids} round={round} />
              <PlayerCardsList currentPlayerCards={round.current_player_cards} />
          </div>
      </div>
    );
  }
});

var NotificationArea = React.createClass({
  getDefaultProps: function() {
    return {
      round: {},
      players: []
    }
  },
  firstBidderHandle: function() {
    var players = this.props.players;
    var roundNumber = this.props.round.number_in_game;
    console.log('players in bottom func: ' + players);
    return players.filter(function (player) {
      if (player.position_in_game === roundNumber) {
        console.log('found player with num same as round num: ' + JSON.stringify(player));

        return player
        }
    })[0].handle;
  },
  render: function() {
    var bids = this.props.round.placed_bids;
    if (typeof bids !== 'undefined' && bids.length > 0) {
      var winningBid = this.props.round.winning_bid;
      return (
        <div className="current-highest-bidder panel">
            <h4>{winningBid.player} has the highest bid at the moment - {winningBid.number_of_tricks} {winningBid.suit}</h4>
        </div>
      );
    } else {
      return (
        <div className="waiting-for-first-bid panel">
            <h4>Waiting for the first bid, it is {this.firstBidderHandle()}'s turn to bid first</h4>
        </div>
      );
    }
  }
});

var AvailableBidsList = React.createClass({
  getDefaultProps: function() {
    return {
      round: {},
      bids: []
    }
  },
  render: function() {
    var round = this.props.round;
    return (
      <ul className="available-bids-list inline-list">
          {this.props.bids.map(function(bid, index) {
            return <AvailableBidItem bid={bid} key={"bid-" + index} round={round}/>
           })}
      </ul>
    );
  }
});

var AvailableBidItem  = React.createClass({
  getDefaultProps: function() {
    return {
      round: {},
      bid: {}
    }
  },
  submitBid: function(e) {
    e.preventDefault();
    RoundActionCreators.submitBid(this.props.round, this.props.bid);
  },
  render: function() {
    return (
      <li className="available-bid-item">
          <button onClick={this.submitBid}>
              Bid: {this.props.bid[0]} {this.props.bid[1]}
          </button>
      </li>
    );
  }
});

var PlacedBidsList = React.createClass({
  getDefaultProps: function() {
    return {
      bids: []
    }
  },
  render: function() {
    return (
      <ul className="placed-bids-list inline-list">
          {this.props.bids.map(function(bid, index){
            return <PlacedBidItem bid={bid} key={"bid-" + index} />
           })}
      </ul>
    );
  }
});

var PlacedBidItem  = React.createClass({
  getDefaultProps: function() {
    return {
      bid: {}
    }
  },
  render: function() {
    return (
      <li className="placed-bid-item">
          <p>{this.props.bid.player} bid {this.props.bid.number_of_tricks} {this.props.bid.suit}</p>
      </li>
    );
  }
});

var PlayerCardsList = React.createClass({
  getDefaultProps: function() {
    return {
      currentPlayerCards: []
    }
  },
  render: function() {
    return (
      <div className="player-cards panel">
          <div className="player-cards-heading">
              <h4>Your hand:</h4>
          </div>
          <div>
              <ul className="current-player-cards">
                  {this.props.currentPlayerCards.map(function(card, index){
                    return <PlayerCardItem card={card} key={"card-" + index} />
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
      card: {}
    }
  },
  render: function() {
    return (
      <li className="player-card">
          {this.props.card.rank} of {this.props.card.suit}
      </li>
    );
  }
});

module.exports = BiddingRound;
