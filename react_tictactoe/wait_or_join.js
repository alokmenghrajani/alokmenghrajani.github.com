/**
 * Piece of code which connects two random players. Each player
 * either joins someone or waits.
 *
 * This is probably the mosts complicated part of the code.
 * We need to pair up people to play together. We do this by
 * having a "waiting" cell, which is either null or holds the id
 * of a player. Operations on "waiting" need to be atomic.
 *
 * When a player is in the waiting state, "state" is set to 0, and
 * player1 is set. When another player see someone in the waiting state,
 * the second player joins the game by setting "player2" to true.
 *
 * The tricky part is handling the various disconnects.
 *
 * id is a unique id. firebase.child('users').push() is one way to generate it.
 * firebase is typically the root node.
 * onConnect receives a firebase subnode, first player (true or false).
 * onDisconnect
 */
function WaitOrJoin(id, firebase, onConnect, onDisconnect) {
  this.id = id;
  this.connected = false;
  this.onConnect = onConnect;
  this.onDisconnect = onDisconnect;
  this.firebase = firebase;
  this.init();
}

WaitOrJoin.prototype.init = function() {
  var waiting = this.firebase.child("waiting");
  waiting.transaction(
    function(val) {
      if ((val == null) || (val.current == null)) {
        // Nobody is waiting, add ourselves to the list
        return {current: this.id, prev: null}
      } else {
        // val.current is waiting, join them
        return {current: null, prev: val.current}
      }
    }.bind(this),
    function(error, committed, snapshot) {
      if (error) {
        console.log("Error in transaction");
        throw "unexpected state";
      } else if (!committed) {
        console.log("Transaction aborted");
        throw "unexpected state";
      } else {
        var node = this.firebase.child('games')
        var other = snapshot.val().prev;
        if (!other) {
          console.log("Waiting, my id: " + this.id);
          this.node = node.child(this.id);
          this.node.child("player1").onDisconnect().remove(
            function(err) {
              if (err) {
                console.log("onDisconnect failed");
                throw err;
              }
              this.node.update(
                {
                  "existed": true,
                  "player1": this.id,
                },
                function(err) {
                  if (err) {
                    console.log("update failed");
                    throw err;
                  }
                  this.node.on("value", this.change.bind(this));
                }.bind(this)
              );
            }.bind(this)
          );
        } else {
          console.log("Joining game: "+other);
          // Join other
          this.node = node.child(other);
          this.node.child("player2").onDisconnect().remove(
            function(err) {
              if (err) {
                console.log("onDisconnect failed");
                throw err;
              }
              this.node.update({"player2": this.id},
                function(err) {
                  if (err) {
                    console.log("update failed");
                    throw err;
                  }
                  this.node.on("value", this.change.bind(this));
                }.bind(this)
              );
            }.bind(this)
          );
        }
      }
    }.bind(this)
  );
}

/**
 * Handles state change.
 */
WaitOrJoin.prototype.change = function(data) {
  console.log("WaitOrJoin: change");
  var val = data.val();

  if (val == null) {
    // everything got deleted
    console.log("all the data is gone...");
    this.connected = false;
    this.node.off();
    this.onDisconnect();
  } else {
    if (val.existed == undefined) {
      console.log("player2 is ahead of player1");
      // player2 sees this when player1's update hasn't yet arrived.
      // This can be triggered by adding a timeout around line 61
      // we simply need to wait, nothing else needs to happen.
      return;
    }
    if (!this.connected && val.player1 && val.player2) {
      console.log(val.player1 + " and " + val.player2 + " should be connected");
      // we are done!
      this.connected = true;
      this.onConnect(this.node, this.id == val.player1);
    } else if (!this.connected && !val.player1) {
      // this happens if player2 joins a game, but player1 already left.
      // we can silently start the WaitOrJoin dance over.
      // Hitting refresh a few times in a tab causes this condition.
      console.log("player2 joined but player1 had left.");
      this.node.off()
      this.node.remove(
        function(err) {
          if (err) {
            console.log("remove failed");
            throw err;
          }
          this.init();
        }.bind(this)
      );
    } else if (this.connected && (!val.player1 || !val.player2)) {
      console.log("a player quit");
      this.connected = false;
      this.node.off();
      this.onDisconnect();
    }
  }
}