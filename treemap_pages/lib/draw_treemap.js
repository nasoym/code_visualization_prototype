function drawTreemapWithColor(svg, treemap, data) {
  var  color = d3.scale.category20c();
  drawTreemapB(svg, treemap, data, color);
}

function drawTreemap(svg, treemap, data) {
  var color = d3.scale.ordinal().range(["#111111","#222222", "#444444"]);
  drawTreemapB(svg, treemap, data, color);
}

function drawTreemapB(svg, treemap, data, color) {

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
          // return "#444444";
          /*
          if (d.name.match(/\.java$/)) {
            return "red";
          }
          else if (d.name.match(/\.xml$/)) {
            return "green";
          }
          else if (d.name.match(/\.groovy$/)) {
            return "pink";
          }
          return "blue";
          */
          return null;
        }
        else {
          return color(d.name); 
        }
      })
      // .style("fill", function(d) { return d.children ? color(d.name) : color(d.name); })
      // .style("fill", function(d) { return d.children ? color(d.name) : null; })
			// .style("stroke", "#000000")
      .style("stroke", function(d) { 
        if ( d.type == "file" ) {
          return "#000000";
        }
        else {
          return "#555555";
          // return "yellow";
        }
      })
			// .style("stroke", "blue")
      // .style("stroke-width", 1)
      .style("stroke-width", function(d) { 
        if ( d.type == "file" ) {
          return 1;
        }
        else {
          return 1;
        }
      })
      ;

  // cell.append("text")
  //     // .attr("x", function(d) { return d.children ? 5 : d.dx / 2; })
  //     // .attr("y", function(d) { return d.children ? 5 : d.dy / 2; })
  //     .attr("x", function(d) { return d.children ? 0 : d.dx / 2; })
  //     .attr("y", function(d) { return d.children ? 3 : d.dy / 2; })
  //     .attr("dy", ".35em")
  //     .style("font-size", function(d) { return d.children ? "5px": "12px";})
  //     .attr("text-anchor", function(d) { return d.children ? "start": "middle";})
  //     // .text(function(d) { return d.children ? d.name : d.name; })
  //     .text(function(d) { return d.children ? d.name :null ; })
  //     ;


}
