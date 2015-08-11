var React = require('react');
var FiveHundredDispatcher = require('../../dispatcher/FiveHundredDispatcher.js');
var FiveHundredConstants = require('../../constants/FiveHundredConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var GameActionCreators = require('../../actions/GameActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var GameNew = React.createClass({

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }
  },

  _onSubmit: function(e) {
    e.preventDefault();
    GameActionCreators.createGame();
  },

  render: function() {
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="new-game">
          <div className="new-game__submit">
            <button type="submit">Create</button>
          </div>
         </form>
       </div>
     );
  }

});

module.exports = GameNew;

