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
      // console.log("checking children in: " + item.path);
      if ('children' in item) {
        if (item.children.length == 1 ) {
          // console.log("    has only one child");
          if ( 
            ('children' in item.children[0]) &&
            (item.children[0].type == 'folder' )  
          ) {
            // (item.children[0].children.length == 1 ) &&
            // console.log("    which is a folder");
            // console.log("    combine: " + item.path + " with " + item.children[0].path);
            // console.log("    old name: " + item.name);
            // console.log("    child name: " + item.children[0].name);
            item.path = item.children[0].path
            item.name += "/" + item.children[0].name
            var grandchildren = item.children[0].children
            item.children = grandchildren
            iterate(item);
          }
        }
        else {
          for (var child in item.children) {
            iterate(item.children[child]);
          }
        }

      }
    }
  }
}
 
