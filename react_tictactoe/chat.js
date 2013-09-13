/**
 * @jsx React.DOM
 */

/**
 * A component which deals with the chat messages.
 */
var Chat = React.createClass({
  /**
   * Handle state:
   * no peer, chatting, disconnected
   */
  getInitialState: function() {
    return {
      firebase: null,
      msgs: []
    }
  },

  /**
   * Called when msgs are sent or received.
   */
  onMsg: function(data) {
    console.log("In chat: got msg");
    this.setState({"msgs": data.val()});
  },

  /**
   * Called once we are connected.
   */
  onConnect: function(firebase) {
    console.log("In chat: connected");
    var msgs = firebase.child("msgs");
    this.setState({"firebase": msgs});
    msgs.on('value', this.onMsg.bind(this));
  },

  /**
   * Called once we are no longer connected.
   */
  onDisconnect: function() {
    this.setState({"firebase": null});
    console.log("In chat: disconnected");
  },

  /**
   * Send msg
   */
  sendMsg: function() {
    var firebase = this.state.firebase;
    if (firebase) {
      var t = firebase.push();
      var text = this.refs.text.getDOMNode().value.trim();
      t.set({sender: this.props.player_id, text: text});
      this.refs.text.getDOMNode().value = '';
    }
    return false;
  },

  /**
   * Render chat box.
   */
  render: function() {
    var msg_list = [];
    for (i in this.state.msgs) {
      var t = this.state.msgs[i];
      if (t.sender == this.props.player_id) {
        msg_list.push(<div class="bubble me">{t.text}</div>);
      } else {
        msg_list.push(<div class="bubble other">{t.text}</div>);
      }
    }
    var composer;
    if (this.state.firebase) {
      composer = <form onSubmit={this.sendMsg} class="form-inline"><input type="text" placeholder="Say something..." ref="text"/> <button type="submit" class="btn">send</button></form>;
    } else {
      composer = <i>You are not chatting with anyone</i>;
    }
    return <div id="chat"><span id="msg_list">{msg_list}</span><span id="composer">{composer}</span></div>;
  },

  /**
   * Auto-scroll chatbox.
   */
  componentDidUpdate: function() {
    var objDiv = document.getElementById("msg_list");
    objDiv.scrollTop = objDiv.scrollHeight;
  },

});

