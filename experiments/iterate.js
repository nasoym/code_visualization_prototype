#!/usr/bin/env node


var exec = require('sync-exec');

function folderSize(path) {

  var size = exec('gdu -shb ' + path).stdout;
  size = size.replace(/\n$/g, '');
  size = size.replace(/\t/g, ' ');
  size = size.replace(/^ */g, '');
  size = size.split(' ')[0];
  size = parseInt(size);

  return size;
}

var inputStream = process.stdin
  , data = "";
 
process.stdin.resume();
 
// Read the entire input stream into the data variable.
inputStream.on('data', function(chunk) {
  data += chunk;
});

function iterate(structure) {
  if ('type' in structure) {
    if (structure.type == 'folder') {
      // console.log("folder: " + structure.path);
      structure.size = folderSize(structure.path);
    }
  }
  if ('children' in structure) {
    for (var child in structure.children) {
      // console.log(">>>>" + JSON.stringify(structure.children[child]));
      iterate(structure.children[child]);
    }
  }
  else {
  }
}

inputStream.on('end', function() {
  var json = JSON.parse(data);
  // console.log(JSON.stringify(json));
  iterate(json);
  console.log(JSON.stringify(json));
});
 
