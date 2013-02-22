/**
 * The FAT contains information about each sector (free, used, bad).
 *
 * It's orgranized in a linked-list like structure since files can
 * span multiple sectors.
 *
 * @author Alok Menghrajani
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
function Fat() {
  this.map = function(fatfs) {
    Utils.debug("Reading file allocation table");
    this.fatfs = fatfs;

    var fat_size =
      this.fatfs.bootsector.sectors_per_fat *
      this.fatfs.bootsector.bytes_per_sector;

    this.data = fatfs.data.consume(fat_size);

    // read the cluster information. The first cluster is 2.
    // TODO: ensure there are no circular lists, lists
    // pointing to bad clusters, etc.
    this.fat = {};
    this.child_data = {};

    this.len = fatfs.bootsector.getTotalSectors();

    // First 3 bytes contain some data I haven't yet looked up.
    this.unknown = this.data.consume(3);

    Utils.check(this.len/3*2 < fatfs.bootsector.getTotalSectors(),
      "FAT is too small?");
    for (var i=2; i<this.len; i+=2) {
      var next_two = this.data.consume(3);
      this.fat[i] = this.getFirstSector(next_two);
      this.fat[i+1] = this.getSecondSector(next_two);
      this.child_data[i] = next_two;
    }

    // consume the copy of the FAT
    Utils.check(
      fatfs.bootsector.getNumFats() == 2,
      "Was expecting 2 copies of the FAT")
    this.data2 = fatfs.data.consume(fat_size);
    Utils.check(
      Utils.getHex(fatfs, this.data) == Utils.getHex(fatfs, this.data2),
      "The two FATs don't contain the same data!");
  }

  /**
   * Sectors are 12 bits information encoded on 3 bytes.
   *
   * uv,wx,yz => xuv
   */
  this.getFirstSector = function(data) {
    Utils.assert(data.length == 3);
    var t = Utils.readInt(this.fatfs, data.start, 2);
    return t & 0xfff;
  }

  /**
   * Sectors are 12 bits information encoded on 3 bytes.
   *
   * uv,wx,yz => yzw
   */
  this.getSecondSector = function(data) {
    Utils.assert(data.length == 3);
    var t1 = Utils.readInt(this.fatfs, data.start+1, 1) >> 4;
    var t2 = Utils.readInt(this.fatfs, data.start+2, 1) << 4;
    return t2 | t1;
  }

  this.getStatus = function(value) {
    if (value >= 0xff0 && value <= 0xff6) {
      return "reserved";
    } else if (value == 0xff7) {
      return "bad";
    } else if (value >= 0xff8) {
      return "*";
    } else if (value == 0) {
      return "free";
    }
    return "";
  }

  this.render = function() {
    var div = $('<div class="fat1"></div>');
    div.append("<h1>File Allocation Table</h1>");
    div.append(
      "<p>The FAT contains information about each sector (free, used, bad)."+
      "The data is organized in a linked-list like structure since files can "+
      "span multiple sectors. A non-fragmented disk contains files stored on "+
      "mostly consecutive sectors.</p>"
    );

    var subdiv = Utils.renderDataNode(this.unknown, this.data.start)
    subdiv.append("no idea what's in here...");
    div.append($("<div></div>").append(subdiv));

    for (var i=2; i<this.len; i+=2) {
      var subdiv = Utils.renderDataNode(this.child_data[i], this.data.start)
      var t = this.getStatus(this.fat[i]);
      if (t == "") { t = this.fat[i]; }
      subdiv.append(i+"&rarr;"+t);

      var t = this.getStatus(this.fat[i+1]);
      if (t == "") { t = this.fat[i+1]; }
      subdiv.append(", "+(i+1)+"&rarr;"+t);

      div.append($("<div></div>").append(subdiv));
    }

    // A nicer rendering of the FAT
    div.append(
      "<p>Nicer rendering of the above linked-lists.</p>");
    var lists = this.getNiceLists();
    for (var i=0; i<lists.length; i++) {
      var list = lists[i];
      list = list.map(function(e){
        if (typeof e == "number") {
          return e;
        } else {
          return e[0] + '-' + e[1];
        }
      });
      var subdiv = $("<div></div>");
      subdiv.append(list.join("&arr;"));
      div.append(subdiv);
    }
    $('#output').append($('<div id="fat" class="anchor"></div>'));
    $('#output').append(div);

    div = Utils.div("fat2", "fat2", "highlight");
    div.attr("id", "right_fat2");
    div.append("<h1>File Allocation Table (copy)</h1>");
    div.append(
      "<p>The FAT is copied on a second sectors.</p>"
    );
    $('#output').append(div);
  }

  /**
   * Converts the cluster -> next cluster mapping into
   * a nice lists.
   */
  this.getNiceLists = function() {
    // find all the the items which are referenced
    var ignore = {};
    for (var i=2; i<this.len; i++) {
      var status = this.getStatus(this.fat[i]);
      if ((status == "reserved") ||
          (status == "bad") ||
          (status == "free")) {
        ignore[i] = true;
        continue;
      }
      var next = this.getNextCluster(i);
      if (next != null) {
        ignore[next] = true;
      }
    }

    // everything else is a start point
    var lists = [];
    for (var i=2; i<this.len; i++) {
      if (ignore[i]) {
        continue;
      }
      lists.push(this._getNiceLists(i, []));
    }
    return lists;
  }

  this._getNiceLists = function(i, r) {
    // check if the last element is i-1
    if (r.length > 0) {
      var last = r.pop()
      if ((typeof last == "number") && (last == i-1)) {
        r.push([last, i]);
      } else if (last[1] == i-1) {
        r.push([last[0], i]);
      }
    } else {
      r.push(i);
    }
    var next = this.getNextCluster(i);
    if (next == null) {
      return r;
    }
    return this._getNiceLists(next, r);
  }

  /**
   * Given a cluster, returns the next cluster.
   */
  this.getNextCluster = function(cluster) {
    var t = this.fat[cluster];
    if (t === undefined) {
      console.log(this);
    }
    Utils.assert(t !== undefined);
    if (this.getStatus(t) == "") {
      return t;
    }
    return null;
  }
}
