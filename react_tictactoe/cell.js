/**
 * @jsx React.DOM
 */

/**
 * A cell is a very simple component. It's either a clickable
 * cell (when the cell's value is 0), a X or a O.
 */
var Cell = React.createClass({
  handleClick: function() {
    this.props.onClick(this.props.id);
    return false;
  },
  render: function() {
    if (this.props.player == 0) {
      return <td><button onClick={this.handleClick}></button></td>;
    } else {
      return <td>{Cell.getXorO(this.props.player)}</td>;
    }
  }
})

/**
 * Given the value of a cell, return X or O.
 * We could make things look a little nicer by returning an <img>.
 */
Cell.getXorO = function(n) {
  if (n == 1) {
    return 'X';
  } else if (n == -1) {
    return 'O';
  } else {
    throw "unexpected: "+n;
  }
}
