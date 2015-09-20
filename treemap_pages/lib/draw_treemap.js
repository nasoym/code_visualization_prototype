function drawTreemap(svg, treemap, data, config) {

  config.fileColorArray = d3.scale.ordinal().range(config.fileColorArray);
  config.folderColorArray = d3.scale.ordinal().range(config.folderColorArray);

  var cell = svg.data([data]).selectAll("g")
      .data(treemap.nodes)
      .enter().append("g")
      .attr("class", "cell")
      .attr("id", function(d) { return d.path.replace(/\//g,"_").replace(/\./g,"_"); })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      ;

  cell.append("rect")
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .style("fill", function(d) { 
        if ( d.type == "file" ) {
          if (config.fileColorMode == null) {
            return null;
          }
          else if (config.fileColorMode == "array") {
            return config.fileColorArray(d.name); 
          }
          else if (config.fileColorMode == "regex") {
            var color = config.fileColorArray(d.name);
            for (i in config.fileColorMapping) {
              if (d.name.match(config.fileColorMapping[i].regex)) {
                color = config.fileColorMapping[i].color;
                break;
              }
            }
            return color;
          }
        }
        else if ( d.type == "folder" ) {
          if (config.folderColorMode == null) {
            return null;
          }
          else if (config.folderColorMode == "array") {
            return config.folderColorArray(d.name); 
          }
        }
        return null;
      })
      .style("stroke", function(d) { 
        if ( d.type == "file" ) {
          return config.fileStrokeColor;
        }
        else if ( d.type == "folder" ) {
          return config.folderStrokeColor;
        }
        return null;
      })
      .style("stroke-width", function(d) { 
        if ( d.type == "file" ) {
          return config.fileStrokeWidth;
        }
        else if ( d.type == "folder" ) {
          return config.folderStrokeWidth;
        }
        return 0;
      })
      .on("mousemove", function(d) {
        d3.select("#tip")[0][0].textContent = d.path;
      })
      ;

  cell.call(function(selection) {
    selection.each(function(d) {
      if ( d.type == "file"  && config.fileLabel ) {
        d3.select(this).append("text")
          .attr("x", function(d) { return d.dx / 2; })
          .attr("y", function(d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .style("font-size", config.fileLabelFontSize + "px")
          .style("fill", config.fileLabelFontColor)
          .attr("text-anchor", "middle")
          .text(function(d) { return d.name; })
          ;
      }
      else if ( d.type == "folder" && config.folderLabel ) {
        d3.select(this).append("text")
          .attr("x", function(d) { return 1; })
          .attr("y", function(d) { return config.folderLabelFontSize / 2; })
          .attr("dy", ".35em")
          .style("font-size", config.folderLabelFontSize + "px")
          .style("fill", config.folderLabelFontColor)
          .attr("text-anchor", "start")
          .text(function(d) { return d.name; })
          ;
      }
    });
  });

}
