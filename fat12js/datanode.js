/**
 * A DataNode is a data structure used to tie the binary
 * data with the structured representation.
 *
 * At its core, a DataNode is a mapping from
 * bytes to structured data and vice-versa.
 *
 * Parts of the data can be rendered by a sub node.
 */
function DataNode(start, length) {
  this.ptr = 0;
  this.start = start;
  this.length = length;
  this.childDataNodes = [];
  /**
   * Consume n_bytes of data and returns the child DataNode.
   */
  this.consume = function(n_bytes) {
    Utils.assert(this.ptr + n_bytes <= this.length, "buffer overflow");

    var r = new DataNode(this.start + this.ptr, n_bytes);
    this.ptr += n_bytes;
    this.childDataNodes.push(r);
    return r;
  }

  /**
   * Extracts a set of bytes from this node and
   * returns the child DataNode.
   *
   * Note: Does not update this.ptr.
   * Note: offset is an absolute position.
   */
  this.slice = function(offset, len) {
    Utils.assert(offset >= this.start);
    Utils.assert(offset + len <= this.start + this.length);
    var r = new DataNode(offset, len);
    this.childDataNodes.push(r);
    return r;
  }
}
