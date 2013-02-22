/**
 * Core "driver" for the FAT12 file system.
 *
 * @author Alok Menghrajani
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */

function Fat12FS(bytes) {
  /**
   * Takes the bytes as a string and
   * sets up all the data structures.
   *
   * Then calls the render function.
   */
  this.init = function(bytes) {
    this.bytes = [];
    var len = bytes.length;
    for (var i=0; i<len; i++) {
      this.bytes.push(bytes.charCodeAt(i) & 0xff);
    }
    this.data = new DataNode(0, len);
    this.map();
    this.render();
  }

  this.map = function() {
    // Map the MBR
    this.mbr = new MasterBootRecord();
    this.mbr.map(this);

    // Map the bootsector
    this.bootsector = new BootSector();
    this.bootsector.map(this);

    // Read the FAT
    this.fat = new Fat();
    this.fat.map(this);

    // Read the root directory and files
    this.directory = new Directory();
    this.directory.mapRoot(this);
  }

  this.render = function() {
    // Render the canvas
    this.renderDiskOutline(this.data.length);

    this.mbr.render();
    this.renderCanvas(this.mbr.data, "yellow");

    this.bootsector.render();
    this.renderCanvas(this.bootsector.data, "red");

    this.fat.render();
    this.renderCanvas(this.fat.data, "blue");
    this.renderCanvas(this.fat.data2, "lightblue");

    this.directory.render();
    this.directory.renderCanvas();
  }

  /**
   * Draws the outline of the disk on the canvas
   */
  this.renderDiskOutline = function(bytes) {
    var canvas = $('#bytes')[0];
    var inner_width = 500;
    canvas.width = inner_width + 2;
    canvas.height = Math.ceil(bytes/inner_width)+2;
    this.canvasSize = inner_width;

    var ctx = canvas.getContext('2d');
    var h1 = bytes/this.canvasSize|0;
    var h2 = bytes%this.canvasSize;
    ctx.lineWidth = 1;
    ctx.scale(1, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.canvasSize, 0);
    ctx.lineTo(this.canvasSize, h1);
    ctx.lineTo(this.canvasSize-h2, h1);
    ctx.lineTo(this.canvasSize-h2, h1+1);
    ctx.lineTo(0, h1+1);
    ctx.lineTo(0, 0);
    ctx.stroke();
  }

  this.renderCanvas = function(data, style) {
    var canvas = $('#bytes')[0];
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = style;
    for (var i=data.start; i<data.start + data.length; i++) {
      var x = (i%this.canvasSize) + 1;
      var y = (i/this.canvasSize|0) + 1;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  /**
   * Given a cluster, uses the FAT to build a list of
   * DataNodes.
   */
  this.clusterToData = function(cluster) {
    var r = [];
    do {
      var offset =
        this.directory.root.clusters[0].start +
        this.directory.root.clusters[0].length +
        (cluster - 2) * 512;
      r.push(this.data.slice(offset, 512));
      cluster = this.fat.getNextCluster(cluster);
    } while (cluster != null);

    return r;
  }

  this.init(bytes);
}

