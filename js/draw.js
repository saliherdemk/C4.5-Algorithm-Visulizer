// Basics of this function from https://github.com/KhaledMohamedP/huffman.git

function drawGraph(root) {
  var width = 100 * nodeNumber,
    height = 100 * nodeNumber;

  var i = 0;

  var tree = d3.layout.tree().size([height, width]);
  var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.x, d.y];
  });

  var nodes = tree.nodes(root),
    links = tree.links(nodes);

  nodes.forEach(function (d) {
    var currHeight = d.depth * 100;
    d.y = currHeight;
    treeHeight = currHeight + 70 > treeHeight ? currHeight + 70 : treeHeight;
  });

  var svg = d3
    .select(".graph")
    .append("svg")
    .attr("width", width)
    .attr("height", treeHeight)
    .append("g")
    .style("transform", "translate(0,30px)");

  var gNode = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  var nodeEnter = gNode
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  var circle = nodeEnter.append("circle").attr("r", 0);

  circle
    .transition()
    .delay(function (d, i) {
      return i;
    })
    .attr("r", 25)
    .style("fill", function (d, i) {
      var isLabel = d.parent && !d.attr;
      return isLabel ? "#f2f2f2" : "white";
    })
    .duration(1000)
    .ease("elastic");

  var charText = nodeEnter
    .append("text")
    .attr("y", 5)
    .attr("text-anchor", "middle");

  charText
    .transition()
    .delay(function (d, i) {
      return i;
    })
    .text(function (d) {
      return d.name;
    });

  //PATH
  var path = svg.selectAll("path.link").data(links, function (d) {
    return d.target.id;
  });

  var pathT = path.enter().insert("path", "g").attr("class", "link");

  pathT
    .transition()
    .delay(function (d, i) {
      return i;
    })
    .attr("d", diagonal);
}
