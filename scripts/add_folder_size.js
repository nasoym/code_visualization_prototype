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
      structure.size = folderSize(structure.path);
    }
  }
  if ('children' in structure) {
    for (var child in structure.children) {
      iterate(structure.children[child]);
    }
  }
}

inputStream.on('end', function() {
  var json = JSON.parse(data);
  iterate(json);
  console.log(JSON.stringify(json));
});
 
