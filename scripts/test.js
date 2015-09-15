#!/usr/bin/env node

var dirToJson = require('dir-to-json');
// dirToJson("./node_modules/dirtree", {}, function( err, dirTree ){
dirToJson("/Users/sinangoo/repos/hypoport/ep2_cleaned/", {}, function( err, dirTree ){
    if( err ){
        throw err;
    }else{
        console.log( JSON.stringify(dirTree));
    }
});

// var jsondir = require('jsondir');
// jsondir.dir2json('.', { attributes: ['mode', 'path'] }, function(err, results) {
//     if (err) throw err;
//     // console.log(results);
//     console.log(JSON.stringify(results));
// });

// var dtj = require('directory-to-json');
//  
// dtj(path.resolve('.'), './outfile.json',function(err,res){console.log(err);});


// var directoryMap = require("gulp-directory-map");
//
// gulp.src('.')
//   .pipe(directoryMap({
//     filename: 'urls.json'
//   }))
//   .pipe(gulp.dest('dist'));
