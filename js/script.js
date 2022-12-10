async function handleFileAsync(e) {
  const file = e.target.files[0];
  const fileData = await file.arrayBuffer();
  /* data is an ArrayBuffer */
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
  var shaped = dataShapeUp(data, keys);
  console.log(shaped);
}
get_excel_input.addEventListener("change", handleFileAsync, false);

// https://www.valentinog.com/blog/html-table/
function generateTableHead(table, data) {
  let thead = table.createTHead();
  thead.classList.add("text-xs", "text-gray-700", "uppercase", "bg-gray-50");
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    th.classList.add("py-3", "px-6");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    row.classList.add("bg-white", "border-b");
    for (key in element) {
      let cell = row.insertCell();
      cell.classList.add(
        "py-4",
        "px-6",
        "font-medium",
        "text-gray-900",
        "whitespace-nowrap"
      );
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function dataShapeUp(data, keys) {
  var result = {};
  for (let key of keys) {
    var att = {};
    for (row of data) {
      let a = row[key];
      if (a in att) {
        att[a] += 1;
      } else {
        att[a] = 1;
      }
    }
    result[key] = att;
  }
  return result;
}

function getBase2Log(x) {
  return Math.log(2) / Math.log(x);
}

function calculateEntropy(data) {
  console.log(data);
}
