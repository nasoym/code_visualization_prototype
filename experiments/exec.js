var exec = require('child_process').exec;
var cmd = 'gdu -shb .';

exec(cmd, function(error, stdout, stderr) {
  // command output is in stdout
  console.log("stdout: " + stdout);
  console.log("stderr: " + stderr);
});

console.log("done");




