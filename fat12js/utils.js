/**
 * Various utils
 *
 * @author Alok Menghrajani
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
function Utils() {
}

/**
 * Outputs msg to #debug.
 */
Utils.debug = function(msg) {
  $('#debug').append('<div>'+msg+'</div>');
}

Utils.assert = function(expr, msg) {
  if (!expr) {
    Utils.debug('<span style="color: red">'+msg+'</span>');
    throw "assertion failure";
  }
}

/**
 * "soft" assertions
 */
Utils.check = function(expr, msg) {
  if (!expr) {
    Utils.debug('<span style="color: red">'+msg+'</span>');
  }
}

/**
 * Loads a disk image and calls cb when done.
 */
Utils.load = function(url, cb) {
  Utils.debug("Loading "+url);
  $.ajax({
    url: url,
    beforeSend: function (xhr) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
  }).done(function(data){
    Utils.debug("Reading file system metadata");
    cb(data);
  });
}

Utils.pad = function(str, len, pad) {
  var str = ""+str;
  if (len > str.length) {
    return Array(len + 1 - str.length).join(pad) + str;
  }
  return str;
}

Utils.renderDataNode = function(data, offset) {
  var div = $('<span></span>');
  var offset = offset ? offset : 0;
  var offset = Utils.pad(data.start-offset, 4, "&nbsp;");
  var len = Utils.pad(data.length, 5, "&nbsp;");
  div.append(
    '<span class="offset">offset: ' + offset +
    ', length: ' + len + '</span> | ');
  return div;
}

Utils.seek = function(fatfs, data) {
  return fatfs.bytes[data.start + data.ptr];
}

Utils.getHex = function(fatfs, data) {
  r = "";
  for (var i=data.start; i<data.start+data.length; i++) {
    if (r != "") {
      r += " ";
    }
    var t = fatfs.bytes[i].toString(16);
    r += Utils.pad(t, 2, "0");
  }
  return r;
}

/**
 * Returns the data contained in this range as a string.
 */
Utils.getStr = function(fatfs, data) {
  r = "";
  for (var i=data.start; i<data.start+data.length; i++) {
    var t = fatfs.bytes[i];
    r += String.fromCharCode(t);
  }
  return r;
}

/**
 * Poor man's escaping function
 */
Utils.escapeStr = function(str) {
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;")
  return str;
}

/**
 * Returns the data contained in this range as an int.
 *
 * The conversion uses LSB, since FAT comes from the IBM world.
 */
Utils.readInt = function(fatfs, start, len) {
  var r = 0;
  var end = start + len - 1;
  for (var i=end; i>=start; i--) {
    r = r * 256 + fatfs.bytes[i];
  }
  return r;
}

/**
 * see readInt
 */
Utils.getInt = function(fatfs, data) {
  return Utils.readInt(fatfs, data.start, data.length);
}



Utils.div = function(id, cl, highlight_class) {
  var id = id.replace(/[.\/]/g, '_')
  var cl = cl.replace(/[.\/]/g, '_')
  var div = $("<div></div>");
  div.mouseover(function(){Utils.show(id, highlight_class)});
  div.mouseout(function(){Utils.hide(id, highlight_class)});
  div.addClass(cl);
  div.addClass("no"+highlight_class);
  div.attr("TOTO", id);
  div.attr("TITI", cl);
  return div;
}

Utils.span = function(id, cl, highlight_class) {
  var id = id.replace(/[.\/]/g, '_')
  var cl = cl.replace(/[.\/]/g, '_')
  var div = $("<span></span>");
  div.mouseover(function(){Utils.show(id, highlight_class)});
  div.mouseout(function(){Utils.hide(id, highlight_class)});
  div.addClass(id);
  div.addClass("no"+highlight_class);
  div.attr("TOTO", id);
  div.attr("TITI", cl);
  return div;
}

Utils.show = function(id, cl) {
  $("#right_"+id).removeClass("no"+cl);
  $("#right_"+id).addClass(cl);
  $("#left_"+id).removeClass("no"+cl);
  $("#left_"+id).addClass(cl);
}

Utils.hide = function(id, cl) {
  $("#right_"+id).addClass("no"+cl);
  $("#right_"+id).removeClass(cl);
  $("#left_"+id).addClass("no"+cl);
  $("#left_"+id).removeClass(cl);
}
