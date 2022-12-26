function main() {
  generateTableHead();
  generateTable();

  var keys = Object.keys(pureData[0]);
  createTree(pureData, keys);
  generateInputRow(keys);
  prepareRoot(root);
  drawGraph(root);
  goToNode("root");
}

// I know it seems complicated but it's not
function createTree(data, keys, key = "", parent = null) {
  var [shaped, len] = dataShapeUp(data, keys);

  var labelInfo;
  var leaf;
  var infos = {};
  Object.entries(shaped).forEach((element) => {
    if (element[1] instanceof Array) {
      // labeled column
      var a = element[1];
      [leaf, labelInfo] = calculateSplitInfo({ a }, len);
    } else {
      [leaf, infos[element[0]]] = calculateSplitInfo(element[1], len);
    }
  });
  var decision = decisionNode(labelInfo, infos);

  var nodeAttr = leaf ? leaf : decision;

  var node = new Node(nodeAttr, key, parent);
  nodeNumber += 1; // just for adjusting svg size

  if (parent) {
    parent.addChildren(node);
  } else {
    root = node;
  }
  if (!decision) return;

  var subSets = {};

  for (const [_, value] of Object.entries(data)) {
    var subKey = value[decision];

    !attributes[decision].includes(subKey) && attributes[decision].push(subKey); // saving attributes for select input

    if (subSets[subKey]) {
      subSets[subKey].push(value);
      continue;
    }
    subSets[subKey] = [value];
  }

  for (const [key, value] of Object.entries(subSets)) {
    createTree(value, keys, key, node);
  }
}

// Calculation of gains and determination of decision node
function decisionNode(labelInfo, infos) {
  var gains = {};
  for (const [key, value] of Object.entries(infos)) {
    gains[key] = (labelInfo - value).toFixed(10);
  }

  const isAllZero = Object.values(gains).every(
    (item) => item === "0.0000000000"
  );

  return isAllZero
    ? false
    : Object.keys(gains).reduce((a, b) => (gains[a] > gains[b] ? a : b));
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

// Prepare for recursive function. We just need to know that how many of which data are in each column.
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

// https://levelup.gitconnected.com/c4-5-decision-tree-explained-from-bottom-up-67468c1619a7
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
  return [leaf, splitInfo.toFixed(10)];
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

function goToNode(type) {
  let node = type === "root" ? document.querySelector(".node") : predictedNode;
  node.scrollIntoView({
    behavior: "auto",
    block: "nearest",
    inline: "center",
  });
}

function setIncreaseRow() {
  increaseRow = parseInt(increaseRowSelect.value);
}

function predict(parent) {
  parent == root && clearNodeColor();
  let children = parent.children;

  // "n-" and "id" prefixes must. Html atrributes can't start with number
  let circle = findNodeElement(
    "n-" + parent.name,
    parent.parent ? "id" + parent.parent.id : "id0"
  );
  let isLabel = parent.depth % 2;
  circle.classList.add(isLabel ? "on-path-label" : "on-path-node");

  if (!children) return;

  let newParent;
  if (!isLabel) {
    newParent = children.find((e) => e.name === predAttributes[parent.name]);
  } else {
    newParent = children[Object.keys(children)[0]];
  }

  predict(newParent);
}

function clearNodeColor() {
  var circles = document.querySelectorAll("circle");
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.classList.remove("on-path-label", "on-path-node");
  }
  predictedNode = null;
}

function findNodeElement(text, parentId) {
  var circle = document.querySelector(`[text=${text}][parent-id=${parentId}]`);
  predictedNode = circle;
  return circle;
}

function switchToTableUi() {
  for (const element of [dropArea, treeContainer, controlPanel, graphBtns]) {
    element.classList.toggle("hidden");
  }
}

function reset() {
  treeContainer.innerHTML = table.innerHTML = "";

  toggleTableBtn.innerText = "Shrink Table";
  tableContainer.style.maxHeight = "1000px";

  for (const element of [dropArea, treeContainer, controlPanel, graphBtns]) {
    element.classList.toggle("hidden");
  }

  currRows = nodeNumber = treeHeight = totalRows = 0;
  scale = 1;
  increaseRowSelect.value = increaseRow = 5;

  setIncreaseRowInputs();
}
