function drawById(svg) {

  // var svg;

  function getSvgElementById(id) {
    var svgElement = svg.select("#"+id.replace(/\//g,"_"));
    return svgElement[0][0];
  }

  // function getPositionOfSvgId(id) {
  //   var svgElement = getSvgElementById(id);
  //   var x = svgElement.getBoundingClientRect().left
  //     + svgElement.getBoundingClientRect().width / 2;
  //   var y = svgElement.getBoundingClientRect().top
  //     + svgElement.getBoundingClientRect().height / 2;
  //   return { "x" : x, "y" : y};
  // }
  //
  // var lineFunction = d3.svg.line()
  //     .x(function(d) { return d.x; })
  //     .y(function(d) { return d.y; })
  //     .interpolate("linear");

  // function drawSvgElement(id) {
  var drawSvgElement = function(id) {
    var svgElement = getSvgElementById(id);
    var boundingRect = svgElement.getBoundingClientRect();

    var g = svg.append("g")
        .attr("transform", "translate(" + boundingRect.left + "," + boundingRect.top + ")")
        ;
    g.append("rect")
        .attr("width", boundingRect.width)
        .attr("height", boundingRect.height)
        .style("stroke", "red")
        .style("stroke-width", 1)
        .style("fill", "none")
        ;
    g.append("text")
        .attr("x", 3)
        .attr("y", 10)
        .attr("dy", "0.35em")
        .style("font-size", "10px")
        .attr("text-anchor", "start")
        .text(id)
        .style("fill", "red")
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

  return drawSvgElement;

}

