var config = {
  width : 780,
  height : 780,
  padding : 1,
  fileColorMode : null,
  fileColorMapping : [
    { regex: "\.xml$", color: "#ff0000" },
    { regex: "\.java$", color: "#ffff00" }
  ],
  fileStrokeColor : "#000000",
  fileStrokeWidth : 1,
  folderColorMode : "array", //regex , null
  folderColorMapping : [],
  folderColorArray : ["#111111","#222222", "#444444"],
  folderStrokeColor : "#555555",
  folderStrokeWidth : 1,
  folderLabel : false,
  folderLabelFontSize : 10,
  folderLabelFontColor : "#ff0000",
  fileLabel : false,
  fileLabelFontSize : 10,
  fileLabelFontColor : "#ff0000"
};

var configFile = querySt("config");
if (configFile !== null) {
  console.log("configfile: " + configFile);
  d3.json(configFile, function(error, json) {
    if (error) throw error;
    for( key in json) {
      config[key] = json[key];
    }
    main();
  });
}
else {
  main();
}

function main() {
  var treemap = d3.layout.treemap()
    .padding(config.padding)
    .size([config.width, config.height])
    .value(function(d) { return d.size; })
    ;

  var svg = d3.select("body").append("svg")
    .attr("width", config.width)
    .attr("height", config.height)
    .append("g")
    ;

  var treemapFile = querySt("treemap");
  if (treemapFile !== null) {
    console.log("treemapfile: " + treemapFile);

    d3.json(treemapFile, function(error, json) {
      if (error) throw error;

      drawTreemap(svg, treemap, json, config);

      var overlayFiles = querySt("overlay");
      if (overlayFiles !== null) {
        console.log("overlayFiles: " + overlayFiles);

        var overlayFileArray = overlayFiles.split(",");
        for (i = 0; i < overlayFileArray.length; i++) {
          var overlayFile = overlayFileArray[i];
          console.log("overlayFile: " + overlayFile);
          d3.json(overlayFile, function(error, json) {
            if (error) throw error;
            drawOverlay(svg, json);
          });
        }

      }

    });
  }
  else {
    console.log("no treemap query paramter is provided");
  }
};
