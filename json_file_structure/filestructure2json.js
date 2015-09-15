var fs = require('fs'),
  path = require('path')

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        // console.log(filename);
        // console.log( JSON.stringify(stats));
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else if (stats.isFile()) {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!


        // {
        //   "dev": 16777220,
        //   "mode": 33188,
        //   "nlink": 1,
        //   "uid": 501,
        //   "gid": 20,
        //   "rdev": 0,
        //   "blksize": 4096,
        //   "ino": 6662035,
        //   "size": 648,
        //   "blocks": 8,
        //   "atime": "2015-09-11T20:16:08.000Z",
        //   "mtime": "2015-09-11T11:30:31.000Z",
        //   "ctime": "2015-09-11T11:30:31.000Z",
        //   "birthtime": "2015-09-11T11:30:31.000Z"
        // }
        //

        // console.log(filename);
        // console.log( JSON.stringify(stats));
        info.type = "file";
        info.size = stats.size;
        info.mtime = stats.mtime;
    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var tree = dirTree(process.argv[2]);
    console.log( JSON.stringify(tree));
}
