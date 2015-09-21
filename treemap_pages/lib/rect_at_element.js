function drawOverlay(svg, data) {

  function getBBoxOfId(id) {
    var svgElement = svg.select("#"+id.replace(/\//g,"_").replace(/\./g,"_"));
    if (svgElement != null && svgElement[0] != null && svgElement[0][0] != null ) {
      return svgElement[0][0].getBoundingClientRect();
    }
    else {
      return null;
    }
  }

  var root = svg.append("g")
      .attr("class", "root")
      ;

  var defaultFontSize = 12;
  var defaultFontColor = "red";
  var defaultFontOpacity = 1;
  var defaultBorderColor = "red";
  var defaultBorder = 1;
  var defaultBorderOpacity = 1;
  var defaultFillColor = "none";
  var defaultFillOpacity = 1;
  var defaultWidth = 50;
  var defaultHeight = 50;

  var cell = root.selectAll("g")
      .data(data)
      .enter().append("g")
      // .attr("class", "cell")
      // .attr("id", function(d) { return d.path; })
      ;
    cell.call(function(selection) {
      selection.each(function(d) {
        var bbox = getBBoxOfId(d.path);
        if (bbox == null) { return ; }
        d3.select(this).append("rect")
          .attr("transform", function(d) {
            var bbox = getBBoxOfId(d.path);
            if (d.type == "dot") {
              var x = bbox.left + bbox.width / 2 - (d.width ? d.width : defaultWidth) / 2;
              var y = bbox.top + bbox.height / 2 - (d.height ? d.height : defaultHeight) / 2;
              return "translate(" + x + "," + y + ")";
            }
            // if (d.type == "rect") {
            return "translate(" + bbox.left + "," + bbox.top + ")";
          })
          .attr("width", function(d) { 
            var bbox = getBBoxOfId(d.path);
            if (d.type == "dot") {
              return d.width ? d.width : defaultWidth;
            }
            // if (d.type == "rect") {
            return bbox.width;
          })
          .attr("height", function(d) { 
            var bbox = getBBoxOfId(d.path);
            if (d.type == "dot") {
              return d.height ? d.height : defaultHeight;
            }
            // if (d.type == "rect") {
            return bbox.height;
          })
          .style("stroke", function(d) {
            return d.borderColor ? d.borderColor : defaultBorderColor;
          })
          .style("stroke-width", function(d) {
            return d.border ? d.border : defaultBorder;
          })
          .style("stroke-opacity", function(d) {
            return d.borderOpacity ? d.borderOpacity : defaultBorderOpacity;
          })
          .style("fill", function(d) {
            return d.fillColor ? d.fillColor : defaultFillColor;
          }) 
          .style("opacity", function(d) {
            return d.fillOpacity ? d.fillOpacity : defaultFillOpacity;
          }) 
          ;

        });
      });

    cell.call(function(selection) {
        selection.each(function(d) {
          if (d.label && d.label != "") {

            var bbox = getBBoxOfId(d.path);
            var fontSize = defaultFontSize;
            if (d.fontSize) {
              fontSize = d.fontSize;
            }
            // if (d.type == "rect") {
            var x = bbox.left + 1;
            var y = bbox.top + fontSize / 2;
            var anchor = "start";
            if (d.type == "dot") {
              anchor = "middle";
              x = bbox.left + bbox.width / 2;
              y = bbox.top + bbox.height / 2;
            }

            d3.select(this).append("text")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", "0.35em")
              .style("font-size", fontSize + "px")
              .attr("text-anchor", anchor)
              .style("fill", d.fontColor ? d.fontColor : defaultFontColor)
              .style("opacity", d.fontOpacity ? d.fontOpacity : defaultFontOpacity)
              .text(d.label)
              ;
          }
        });
      })
      ;
};
