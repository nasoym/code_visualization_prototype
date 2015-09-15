#!/usr/bin/env node
var inputStream = process.stdin
  , data = "";
 
process.stdin.resume();
 
// Read the entire input stream into the data variable.
inputStream.on('data', function(chunk) {
  data += chunk;
});

inputStream.on('end', function() {
  var json = JSON.parse(data);
  console.log(JSON.stringify(json));

});
 
