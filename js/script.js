var root;

async function handleFileAsync(e) {
  const file = e.target.files[0];
  const fileData = await file.arrayBuffer();
  const workbook = XLSX.read(fileData);

  let worksheets = {};
  for (const sheetName of workbook.SheetNames) {
    worksheets["sheetName"] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }
  var data = worksheets.sheetName;
  var table = document.querySelector("table");
  var keys = Object.keys(data[0]);
  generateTableHead(table, keys);
  generateTable(table, data);
  main(data, keys);
  drawGraph(root);
}
get_excel_input.addEventListener("change", handleFileAsync, false);

function main(data, keys, key = "", parent = null) {
  var [shaped, len] = dataShapeUp(data, keys);
  var labelInfo;
  var infos = {};
  Object.entries(shaped).forEach((element) => {
    if (element[1] instanceof Array) {
      var a = element[1];
      labelInfo = calculateSplitInfo({ a }, len);
    } else {
      infos[element[0]] = calculateSplitInfo(element[1], len);
    }
  });
  var decision = decisionNode(labelInfo, infos);
  var node = new Node(decision, key, parent);

  if (parent) {
    parent.addChildren(node);
  } else {
    root = node;
  }
  if (!decision) return;

  var subSets = {};

  for (const [key, value] of Object.entries(data)) {
    var subKey = value[decision];
    if (subSets[subKey]) {
      subSets[subKey].push(value);
    } else {
      subSets[subKey] = [value];
    }
  }
  for (const [key, value] of Object.entries(subSets)) {
    main(value, keys, key, node);
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
  Object.keys(data).forEach((attr) => {
    var key = attr;
    var countedObj = count(data[key]);
    var total = countedObj["total"];

    var a = total / len;
    var sum = 0;
    for (let [key, value] of Object.entries(countedObj)) {
      if (key == "total") continue;
      var p = value / total;
      var entropy = calculateEtropy(p);
      sum += entropy;
    }
    splitInfo += -(a * sum);
  });
  return splitInfo.toFixed(4);
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
