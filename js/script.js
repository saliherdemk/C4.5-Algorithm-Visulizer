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
}
get_excel_input.addEventListener("change", handleFileAsync, false);

function main(data, keys) {
  var [shaped, len] = dataShapeUp(data, keys);
  Object.values(shaped).forEach((element) => {
    if (element instanceof Array) {
      console.log(element, calculateSplitInfo({ element }, len));
    } else {
      console.log(element, calculateSplitInfo(element, len));
    }
  });
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

function getBase2Log(x) {
  return x === 1 ? 0 : Math.log(2) / Math.log(x);
}

function calculateSplitInfo(data, len) {
  var splitInfo = 0;
  Object.keys(data).forEach((attr) => {
    var key = attr;
    var countedObj = count(data[key]);

    var total = countedObj["total"];
    var a = total / len;
    for (let [key, value] of Object.entries(countedObj)) {
      if (key == "total") continue;
      var p = value / total;
      var entropy = a * calculateEtropy(p);
      splitInfo += entropy;
    }
  });
  return splitInfo;
}

function calculateEtropy(p) {
  return -p * getBase2Log(p);
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
