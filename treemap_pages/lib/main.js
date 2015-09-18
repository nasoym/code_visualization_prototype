var width = 780;
var height = 780;

var treemap = d3.layout.treemap()
  .padding(1)
  .size([width, height])
  .value(function(d) { return d.size; })
  ;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  ;
var showText = querySt("showText");
var showColors = querySt("showColors");

var treemapFile = querySt("treemap");
if (treemapFile !== null) {
  console.log("treemapfile: " + treemapFile);

  d3.json(treemapFile, function(error, json) {
    if (error) throw error;

    if (showColors !== null) {
      drawTreemapWithColor(svg,treemap, json);
    }
    else {
      drawTreemap(svg,treemap, json);
    }

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

    // var drawSvgElement = drawById(svg);
    // drawSvgElement("baufiSmart/backend/angebote");
    // //drawSvgElement("baufiSmart/api-rest");
    //
    // drawSvgElement("antragsuebersicht");
    // drawSvgElement("baufiSmart");
    // drawSvgElement("dokumentenverwaltung");
    // drawSvgElement("gateway");
    // drawSvgElement("infrastruktur");
    // drawSvgElement("partnermanagement");
    // drawSvgElement("support");
    // drawSvgElement("uebersicht");
    // drawSvgElement("vorgang");
  });
}
else {
  console.log("no treemap query paramter is provided");
}

