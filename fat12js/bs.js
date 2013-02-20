/**
 * The bootsector lives in the 512-1024 byte range
 * and contains information about the disk: bytes per sector,
 * sectors per track, etc.
 *
 * The bootsector also contains instructions, which get executed when
 * you insert the disk and powerup a computer. These instructions
 * would bootstrap the operating system.
 */
function BootSector() {
  this.map = function(fatfs) {
    Utils.debug("Reading boot sector");
    this.fatfs = fatfs;

    // Read the bootsector
    // TODO: is it ok to hardcode the bootsector to 512 bytes?
    this.data = fatfs.data.consume(512, "bootsector");

    // Read the structure
    this.bootsector = {};
    this.bootsector.bootstrap_offset = this.data.consume(3);
    this.bootsector.oem = this.data.consume(8);
    this.bootsector.bytes_per_sector = this.data.consume(2);
    this.bootsector.sectors_per_cluster = this.data.consume(1);
    this.bootsector.reserved_sectors = this.data.consume(2);
    this.bootsector.fats = this.data.consume(1);
    this.bootsector.root_directories = this.data.consume(2);
    this.bootsector.total_sectors = this.data.consume(2);
    this.bootsector.media_type = this.data.consume(1);
    this.bootsector.sectors_per_fat = this.data.consume(2);
    this.bootsector.sectors_per_track = this.data.consume(2);
    this.bootsector.heads = this.data.consume(2);
    this.bootsector.hidden_sectors = this.data.consume(2);
    this.bootsector.bootstrap = this.data.consume(480);
    this.bootsector.signature = this.data.consume(2);

    // Check signature
    var signature = Utils.getInt(fatfs, this.bootsector.signature);
    this.signature = signature;
    Utils.check(signature == 0xaa55, "invalid signature on boot sector");

    // Some of this data is actually useful
    this.root_directories = Utils.getInt(fatfs, this.bootsector.root_directories);
    this.total_sectors = Utils.getInt(fatfs, this.bootsector.total_sectors);
    this.bytes_per_sector = Utils.getInt(fatfs, this.bootsector.bytes_per_sector);
    this.sectors_per_fat = Utils.getInt(fatfs, this.bootsector.sectors_per_fat);
  }

  this.render = function() {
    var div = $('<div class="bootsector"></div>');
    div.append("<h1>Boot Sector</h1>");
    var subdiv = Utils.renderDataNode(this.data, 0);
    subdiv.append(
      "The boot sector contains information about " +
      "the disk: bytes per sector, sectors per track, etc.");
    div.append($("<div></div>").append(subdiv));

    meta = {};
    meta.bootstrap_offset = Utils.getHex(this.fatfs, this.bootsector.bootstrap_offset);
    meta.bootstrap_offset = Utils.getHex(this.fatfs, this.bootsector.bootstrap_offset);
    meta.oem = Utils.getStr(this.fatfs, this.bootsector.oem);
    meta.bytes_per_sector = Utils.getInt(this.fatfs, this.bootsector.bytes_per_sector);
    meta.sectors_per_cluster = Utils.getInt(this.fatfs, this.bootsector.sectors_per_cluster);
    meta.reserved_sectors = Utils.getInt(this.fatfs, this.bootsector.reserved_sectors);
    meta.fats = Utils.getInt(this.fatfs, this.bootsector.fats);
    meta.root_directories = this.root_directories;
    meta.total_sectors = this.total_sectors;
    meta.media_type = Utils.getInt(this.fatfs, this.bootsector.media_type);
    meta.sectors_per_fat = Utils.getInt(this.fatfs, this.bootsector.sectors_per_fat);
    meta.sectors_per_track = Utils.getInt(this.fatfs, this.bootsector.sectors_per_track);
    meta.heads = Utils.getInt(this.fatfs, this.bootsector.heads);
    meta.hidden_sectors = Utils.getInt(this.fatfs, this.bootsector.hidden_sectors);
    meta.bootstrap = Utils.getHex(this.fatfs, this.bootsector.bootstrap);
    meta.signature = Utils.getHex(this.fatfs, this.bootsector.signature);

    var meta_div = $("<div></div>");
    for (var k in meta) {
      var subdiv = Utils.renderDataNode(this.bootsector[k], this.data.start)
      subdiv.append(k + ": " + meta[k]);
      meta_div.append($("<div></div>").append(subdiv));
    }
    div.append(meta_div);

    $('#output').append($('<div id="bs" class="anchor"></div>'));
    $('#output').append(div);
  }

  this.getNumDirectories = function() {
    return this.root_directories;
  }

  this.getTotalSectors = function() {
    return this.total_sectors;
  }
}

