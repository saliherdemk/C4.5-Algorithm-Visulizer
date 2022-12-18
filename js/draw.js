//Drawn graph from https://github.com/KhaledMohamedP/huffman.git

function drawGraph(root) {
  // var list = [].concat(HuffmanTable),
  //   tableSize = HuffmanTable.length;

  // while (list.length > 1) {
  //   var y = list.pop();
  //   var x = list.pop();
  //   var obj = {
  //     freq: x.freq + y.freq,
  //     children: [x, y],
  //     value: x.value,
  //   };
  //   list.push(obj);

  //   list.sort(function (a, b) {
  //     return b.freq - a.freq;
  //   });
  // }

  var margin = {
      top: 25,
      right: 5,
      bottom: 5,
      left: 5,
    },
    width = 500,
    height = 500;

  var i = 0;

  var tree = d3.layout.tree().size([height, width]);
  var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.x, d.y];
  });
  var svg = d3
    .select(".graph")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var nodes = tree.nodes(root),
    links = tree.links(nodes);

  nodes.forEach(function (d) {
    d.y = d.depth * 100;
  });

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
      return i * 80;
    })
    .attr("r", 25)
    .style("fill", function (d, i) {
      return d.children || d._children ? "#FFE066" : "#FFE066";
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
      return i * 90;
    })
    .text(function (d) {
      return d.name;
    });

  // Enter the code
  var pathText = nodeEnter
    .append("text")
    .attr("y", function (d) {
      return d.parent ? -(d.y - d.parent.y) / 2 + 5 : 0;
    })
    .attr("x", function (d) {
      return !d.parent ? 0 : d.parent?.children.length * -5; // make depend on is on left or right
    })
    .style("font-size", "13px");

  pathText
    .transition()
    .delay(function (d, i) {
      return i * 85;
    })
    .text(function (d) {
      return d.attr;
    });

  //PATH
  var path = svg.selectAll("path.link").data(links, function (d) {
    return d.target.id;
  });

  var pathT = path.enter().insert("path", "g").attr("class", "link");

  pathT
    .transition()
    .delay(function (d, i) {
      return i * 85;
    })
    .attr("d", diagonal);
}
