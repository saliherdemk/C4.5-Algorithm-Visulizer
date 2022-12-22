function main() {
  generateTableHead();
  generateTable();

  createTree(pureData, Object.keys(pureData[0]));

  prunedTree && prepareRoot(root);

  drawGraph(root);

  backToRoot();
}

function createTree(data, keys, key = "", parent = null) {
  var [shaped, len] = dataShapeUp(data, keys);
  var labelInfo;
  var leaf;
  var infos = {};
  Object.entries(shaped).forEach((element) => {
    if (element[1] instanceof Array) {
      var a = element[1];
      [leaf, labelInfo] = calculateSplitInfo({ a }, len);
    } else {
      [leaf, infos[element[0]]] = calculateSplitInfo(element[1], len);
    }
  });
  var decision = decisionNode(labelInfo, infos);
  var nodeAttr = leaf ? leaf : decision;

  var node = new Node(nodeAttr, key, parent);
  nodeNumber += 1;

  if (parent) {
    parent.addChildren(node);
  } else {
    root = node;
  }
  if (!decision) return;

  var subSets = {};

  for (const [_, value] of Object.entries(data)) {
    var subKey = value[decision];
    if (subSets[subKey]) {
      subSets[subKey].push(value);
    } else {
      subSets[subKey] = [value];
    }
  }
  for (const [key, value] of Object.entries(subSets)) {
    createTree(value, keys, key, node);
  }
}

function decisionNode(labelInfo, infos) {
  var result = {};
  for (const [key, value] of Object.entries(infos)) {
    result[key] = (labelInfo - value).toFixed(10);
  }

  const isAllZero = Object.values(result).every(
    (item) => item === "0.0000000000"
  );

  return isAllZero
    ? false
    : Object.keys(result).reduce((a, b) => (result[a] > result[b] ? a : b));
}

function prepareRoot(root) {
  if (root.parent && !root.attr) return;
  for (let i = 0; i < root.children.length; i++) {
    const element = root.children[i];
    var newNode = new Node(element.attr, "", element.parent);
    nodeNumber += 1;
    element.parent.replaceChildren(element, newNode);
    newNode.addChildren(element);

    prepareRoot(element);
  }
}

function initilizeObject(keys) {
  var obj = {};
  for (let key of keys.slice(0, -1)) {
    obj[key] = {};
  }
  obj[keys[keys.length - 1]] = [];
  return obj;
}

function dataShapeUp(data, keys) {
  var result = initilizeObject(keys);
  var label = keys[keys.length - 1];
  var len = data.length;
  for (let key of keys) {
    for (row of data) {
      if (key === label) {
        result[key].push(row[label]);
        continue;
      }
      if (result[key][row[key]]) {
        result[key][row[key]].push(row[label]);
      } else {
        result[key][row[key]] = [row[label]];
      }
    }
  }
  return [result, len];
}

function calculateSplitInfo(data, len) {
  var splitInfo = 0;
  var leaf;
  Object.keys(data).forEach((attr) => {
    var key = attr;
    var countedObj = count(data[key]);
    var total = countedObj["total"];

    var a = total / len;
    var sum = 0;

    for (let [key, value] of Object.entries(countedObj)) {
      if (key == "total") continue;
      var p = value / total;
      if (p === 1) leaf = key;
      var entropy = calculateEtropy(p);
      sum += entropy;
    }
    splitInfo += -(a * sum);
  });
  return [leaf, splitInfo.toFixed(4)];
}

function calculateEtropy(p) {
  return p * Math.log2(p);
}

function count(data) {
  var obj = { total: data.length };
  data.forEach((element) => {
    if (element in obj) {
      obj[element] += 1;
    } else {
      obj[element] = 1;
    }
  });
  return obj;
}

//https://codepen.io/Gutto/pen/GBLPyN
treeContainer.addEventListener("mousedown", (e) => MouseDown(e));
treeContainer.addEventListener("mouseup", (e) => mouseUp(e));
treeContainer.addEventListener("mouseleave", (e) => mouseLeave(e));
treeContainer.addEventListener("mousemove", (e) => mouseMove(e));

function MouseDown(e) {
  isdown = true;
  startx = e.pageX - treeContainer.offsetLeft;
  starty = e.pageY - treeContainer.offsetTop;
  scrleft = treeContainer.scrollLeft;
  scrtop = treeContainer.scrollTop;
}

function mouseUp(e) {
  isdown = false;
}

function mouseLeave(e) {
  isdown = false;
}

function mouseMove(e) {
  if (isdown) {
    e.preventDefault();

    var y = e.pageY - treeContainer.offsetTop;
    var goY = y - starty;
    treeContainer.scrollTop = scrtop - goY;

    var x = e.pageX - treeContainer.offsetLeft;
    var goX = x - startx;
    treeContainer.scrollLeft = scrleft - goX;
  }
}

function zoom(event) {
  const el = document.querySelector("svg");

  event.preventDefault();

  scale += event.deltaY * -0.001;

  el.style.transform = `scale(${scale})`;
}

treeContainer.onwheel = zoom;

function backToRoot() {
  document.querySelector(".node").scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });
}

function setIncreaseRow() {
  increaseRow = parseInt(increaseRowSelect.value);
}
