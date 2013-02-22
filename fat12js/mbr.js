/**
 * The MBR lives in the first 512 bytes.
 *
 * The first 446 bytes were used for bootstrapping operating systems.
 *
 * @author Alok Menghrajani
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
function MasterBootRecord() {
  this.map = function(fatfs) {
    Utils.debug("Reading master boot record");
    this.fatfs = fatfs;

    this.data = fatfs.data.consume(512);
    this.mbr = {};
    this.mbr.code = this.data.consume(446);
    this.mbr.partitions = [];
    for (var i=0; i<4; i++) {
      this.mbr.partitions.push(this.data.consume(16));
    }
    this.mbr.signature = this.data.consume(2);

    // Check signature
    var signature = Utils.getInt(fatfs, this.mbr.signature);
    this.signature = signature;
    Utils.check(signature == 0xaa55, "invalid signature on boot sector");
  }

  this.render = function() {
    var div = $('<div class="mbr"></div>');
    div.append('<h1>master boot record</h1>');
    var subdiv = Utils.renderDataNode(this.data, 0);
    subdiv.append(
      "The MBR contains code to bootstrap an operating "+
      "system. It also contains partition information.");
    div.append($("<div></div>").append(subdiv));

    subdiv = Utils.renderDataNode(this.mbr.code, this.data.start);
    subdiv.append("bootstrap code: "+
      Utils.getHex(this.fatfs, this.mbr.code));
    div.append($("<div></div>").append(subdiv));

    this.mbr.partitions.forEach($.proxy(function(partition){
      subdiv = Utils.renderDataNode(partition, this.data.start);
      subdiv.append("partition: "+ Utils.getHex(this.fatfs, partition));
      div.append($("<div></div>").append(subdiv));
    }), this);

    subdiv = Utils.renderDataNode(this.mbr.signature, this.data.start);
    subdiv.append("signature: "+
      Utils.getHex(this.fatfs, this.mbr.signature));
    div.append($("<div></div>").append(subdiv));

    $('#output').append($('<div id="mbr" class="anchor"></div>'));
    $('#output').append(div);
  }
}
