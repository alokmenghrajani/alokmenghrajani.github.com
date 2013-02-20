/**
 * The directory information is stored in 32 bytes
 * records.
 */
function Directory() {
  this.root = {};

  this.mapRoot = function(fatfs) {
    this.fatfs = fatfs;

    // The root directory is 32 * number of directories
    // and only spawns a single contiguous range of bytes.
    this.root.clusters = [fatfs.data.consume(32 * fatfs.bootsector.getNumDirectories())];
    this.root.label = "/";
    this.root.files = [];
    this.readDirectory(fatfs, this.root, 0);
  }

  this.readDirectory = function(fatfs, parent, guard) {
    Utils.debug("Reading directory: "+parent.label);

    Utils.assert(guard<10, "infinite recursion?");

    // check if we have reached the last entry
    // there are two ways to hit the end:
    // - the entry starts with 0x00
    // - we don't have any more data
    for (num_entry=0; num_entry<parent.clusters.length*16; num_entry++) {
      var parent_cluster = parent.clusters[num_entry/16|0];
      if (Utils.seek(fatfs, parent_cluster) == 0x00) {
        break;
      }
      entry = {};
      entry.data = parent_cluster.consume(32);
      entry.name = entry.data.consume(11);
      entry.attribute = entry.data.consume(1)
      entry.reserved = entry.data.consume(10);
      entry.time = entry.data.consume(2);
      entry.date = entry.data.consume(2);
      entry.cluster_id = entry.data.consume(2);
      entry.file_size = entry.data.consume(4);

      var attribute = this.decodeAttribute(fatfs, entry.attribute);
      entry.attribute.nice = attribute;
      entry.name.nice = Utils.getStr(fatfs, entry.name);
      entry.isDeleted = this.isDeleted(fatfs, entry);
      entry.isLabel = this.isLabel(entry);
      entry.isSpecial = this.isSpecial(entry);
      entry.isDirectory = (attribute.directory == "y");
      var cluster_id = Utils.getInt(fatfs, entry.cluster_id);

      var name = this.convertName(entry);
      entry.label = name;

      parent.files.push(entry);

      if (entry.isDeleted || entry.isSpecial) {
        // We aren't going to further process special
        // files. Most of these are OS dependant or are part
        // of the FAT16/FAT32 extensions.
        continue;
      }

      if (entry.isDirectory) {
        entry.files = [];
        entry.clusters = fatfs.clusterToData(cluster_id);
        // move to sub directory
        this.readDirectory(fatfs, entry, guard+1);
      } else {
        // Lets render the file
        Utils.debug("Reading file "+entry.label);
        var file_size = Utils.getInt(fatfs, entry.file_size);
        entry.clusters = fatfs.clusterToData(cluster_id);
        entry.file_data = "";
        for (var i=0; i<entry.clusters.length; i++) {
          entry.file_data += Utils.getStr(fatfs, entry.clusters[i])
        }
        entry.file_data = Utils.escapeStr(entry.file_data.substr(0, file_size));
      }
    }
  }

  /**
   * File names are stored on 8 bytes.
   */
  this.convertName = function(entry) {
    var str = entry.name.nice;
    var a = str.substr(0, 8).trimRight();
    var b = str.substr(8, 3).trim();
    if (this.isDot(entry)) {
      return a;
    }
    if (entry.isDirectory) {
      return a +"/";
    }
    return a+"."+b;
  }

  this.isDeleted = function(fatfs, entry) {
    return Utils.seek(fatfs, entry.name) == 0xe5;
  }

  this.isDot = function(entry) {
    return ((entry.name.nice == ".          ") ||
            (entry.name.nice == "..         "));
  }

  this.isLabel = function(entry) {
    return (entry.attribute.nice.label == "y");
  }

  this.isSpecial = function(entry) {
    return (this.isDot(entry) ||
            this.isLabel(entry) ||
            (entry.attribute.nice.hidden == "y") ||
            (entry.attribute.nice.system == "y"))
  }

  this.decodeAttribute = function(fatfs, data) {
    Utils.assert(data.length == 1);
    var i = Utils.getInt(fatfs, data);
    attributes = {};
    attributes.read_only = (i & 0x01) ? 'y' : 'n';
    attributes.hidden = (i & 0x02) ? 'y' : 'n';
    attributes.system = (i & 0x04) ? 'y' : 'n';
    attributes.label = (i & 0x8) ? 'y' : 'n';
    attributes.directory = (i & 0x16) ? 'y' : 'n';
    return attributes;
  }

  this.render = function() {
    var div = $('<div class="root"></div>');
    div.append("<h1>Root Directory</h1>");
    var subdiv = Utils.renderDataNode(this.root.clusters[0], 0);
    subdiv.append(
      "The root directory contains the list list of files "+
      "and subdirectories under /. It also contains some metadata, "+
      "such as the volume label.");
    div.append($("<div></div>").append(subdiv));

    subdiv = $("<div></div>");
    this.renderDirectory(subdiv, this.root);
    div.append(subdiv);

    $('#output').append($('<div id="root" class="anchor"></div>'));
    $('#output').append(div);

    var div = $('<div class="files"></div>');
    div.append("<h1>Files</h1>");
    subdiv = $("<div></div>");
    this.renderFiles(subdiv, this.root, "/");
    div.append(subdiv);

    $('#output').append($('<div id="files" class="anchor"></div>'));
    $('#output').append(div);
  }

  this.renderCanvas = function() {
    this._renderCanvas(this.root);
  }

  this._renderCanvas = function(dir) {
    for (var i=0; i<dir.clusters.length; i++) {
      this.fatfs.renderCanvas(dir.clusters[i], "green");
    }
    for (var i=0; i<dir.files.length; i++) {
      var file = dir.files[i];
      if (file.isDeleted || file.isSpecial) {
        continue;
      }
      if (file.isDirectory) {
        this._renderCanvas(file);
      } else {
        for (var j=0; j<file.clusters.length; j++) {
          this.fatfs.renderCanvas(file.clusters[j], "gray");
        }
      }
    }
  }

  this.renderDirectory = function(div, dir) {
    for (var i=0; i<dir.files.length; i++) {
      var file = dir.files[i];
      if (file.isDeleted || file.isLabel) {
        continue;
      }
      var subdiv = $("<span></span>");
      subdiv.append(file.label);
      var attributes = $('<span class="offset"></span>');
      attributes.append(
       ' (date: ' + this.dateToStr(file.date) + ', ' +
       'time: ' + this.timeToStr(file.time) + ', ' +
       'cluster: ' + Utils.getInt(this.fatfs, file.cluster_id));
      if (!file.isSpecial && !file.isDirectory) {
        attributes.append(', size: ' + file.file_data.length);
      }
      attributes.append(')');

      subdiv.append(attributes);
      div.append($("<div></div>").append(subdiv));

      if (file.isSpecial) {
        continue;
      }

      if (file.isDirectory) {
        this.renderDirectory(subdiv, file);
      }
    }
  }

  /**
   * Time information is stored as:
   * (5/6/5 bits, for hour/minutes/doubleseconds)
   */
  this.timeToStr = function(data) {
    Utils.assert(data.length == 2);
    var i = Utils.getInt(this.fatfs, data);
    hour = Utils.pad(i >> 11, 2, "0");
    min = Utils.pad((i >> 5) & 0x3f, 2, "0");
    return hour+":"+min;
  }

  /**
   * Date information is stored as:
   * (7/4/5 bits, for year-since-1980/month/day)
   */
  this.dateToStr = function(data) {
    Utils.assert(data.length == 2);
    var i = Utils.getInt(this.fatfs, data);
    year = 1980 + (i >> 9);
    month = (i >> 5) & 0xf;
    day = i & 0x1f;
    return ""+month+"/"+day+"/"+year;
  }

  this.renderFiles = function(div, dir, path) {
    for (var i=0; i<dir.files.length; i++) {
      var file = dir.files[i];
      if (file.isDeleted || file.isSpecial) {
        continue;
      }
      if (file.isDirectory) {
        this.renderFiles(div, file, path + file.label);
      } else {
        var subdiv = $("<span></span>");
        subdiv.append(path + file.label);
        var file_data = $('<span class="offset"></span>');
        file_data.html(file.file_data);
        subdiv.append($("<div></div>").append(file_data));

        div.append($("<div></div>").append(subdiv));
      }
    }
  }
}
