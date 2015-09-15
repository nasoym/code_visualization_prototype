var exec = require('sync-exec');

var size = exec('gdu -shb .').stdout;

size = size.replace(/\n$/g, '');
size = size.replace(/\t/g, ' ');
size = size.replace(/^ */g, '');
size = size.split(' ')[0];
size = parseInt(size);

console.log(">>" + size + "<<");
// console.log(">>" + JSON.stringify(a) + "<<");

// > '  abc def ghi'.replace(/^ |)}>#g, '').split(' ')[0]


