// https://www.valentinog.com/blog/html-table/

const table = document.querySelector("table");

function generateTableHead() {
  var keys = Object.keys(pureData[0]);
  let thead = table.createTHead();
  thead.classList.add("text-xs", "text-gray-700", "uppercase");
  let row = thead.insertRow();
  for (let key of keys) {
    let th = document.createElement("th");
    th.classList.add("py-3", "px-6", "sticky", "top-0", "bg-gray-100");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

const tableContainer = document.querySelector(".table-container");
const btnTable = document.getElementById("btn-table");

function toggleTable() {
  if (btnTable.innerText === "Hide Table") {
    tableContainer.style.maxHeight = "100px";
    btnTable.innerText = "Show Table";
  } else {
    tableContainer.style.maxHeight = "1000px";
    btnTable.innerText = "Hide Table";
  }
}
function generateTable() {
  const sliced = Object.keys(pureData)
    .slice(currRows, currRows + increaseRow)
    .reduce((result, key) => {
      result[key] = pureData[key];

      return result;
    }, []);

  for (let element of sliced) {
    createRow(element);
  }
}

function increaseCurrentRow() {
  currRows += increaseRow;
  generateTable();
}

function createRow(element) {
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
