document.body.innerHTML=
  "<h1>bootloader.js</h1>" +
  "<p>The first sector on file systems has traditionally been used to store the code which "+
  "bootstraps the operating system.</p>" +
  "<p>I told Erling that I was messing around with the FAT12 file structure and he " +
  "gave me the brilliant idea to write a bootloader in javascript: when you open the " +
  "the disk in a browser, the bootloader looks for all files ending in .js " +
  "in the / directory, and runs them!</p>" +
  "<p>If you instead download the file on your computer, you should be able to mount the " +
  "the disk image and view/add/remove files.</p>" +
  "<p>Writing this bootloader was non-trivial since I only had 446 bytes of space (I didn't " +
  "want to modify the number of reserved sectors on the disk, that would be too easy).</p>" +
  "<p>Note: the bootloader assumes that the file system is FAT12!</p>" +
  "<ul><li><a href=\"http://alokmenghrajani.github.com/fat12/\">source + more info</a></li></ul>";
