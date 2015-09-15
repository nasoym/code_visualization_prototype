#!/usr/bin/env node

var inputStream = process.stdin;
var data = "";
inputStream.resume();

inputStream.on('data', function(chunk) {
  data += chunk;
});
inputStream.on('end', function() {
  var json = JSON.parse(data);
  iterate(json);
  console.log(JSON.stringify(json));
});

function iterate(item) {
  if ('type' in item) {
    if (item.type == 'folder') {
      if ('children' in item) {
        var oldChildren = item.children;
        item.children = [];
        for (var child in oldChildren) {
          if (oldChildren[child].type != 'file') {
            item.children.push(oldChildren[child]);
          }
        }
        for (var child in item.children) {
          iterate(item.children[child]);
        }
      }
    }
  }
}
 
