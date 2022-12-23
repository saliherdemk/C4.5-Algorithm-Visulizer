// https://www.valentinog.com/blog/html-table/

function generateTableHead() {
  var keys = Object.keys(pureData[0]);
  let thead = table.createTHead();
  thead.classList.add("thead");
  let row = thead.insertRow();
  for (let key of keys) {
    let th = document.createElement("th");
    th.classList.add("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable() {
  // https://stackoverflow.com/questions/39336556/how-can-i-slice-an-object-in-javascript
  const sliced = Object.fromEntries(
    Object.entries(pureData).slice(currRows, currRows + increaseRow)
  );

  for (let element of Object.values(sliced)) {
    createRow(element);
  }

  currRows += increaseRow;
  setIncreaseRowInputs();
}

function setIncreaseRowInputs() {
  currRows = currRows > totalRows ? totalRows : currRows;

  increaseRowSelect.disabled = currRows !== 0 && currRows === totalRows;
  showRowBtn.disabled = currRows !== 0 && currRows === totalRows;

  currRowsSpan.innerText = String(currRows);
  totalRowsSpan.innerText = String(totalRows);
}

function toggleTable() {
  if (toggleTableBtn.innerText === "Shrink Table") {
    tableContainer.style.maxHeight = "90px";
    toggleTableBtn.innerText = "Expand Table";
    return;
  }
  tableContainer.style.maxHeight = "1000px";
  toggleTableBtn.innerText = "Shrink Table";
}

function createRow(element) {
  let row = table.insertRow();
  row.classList.add("row");
  for (key in element) {
    let cell = row.insertCell();
    cell.classList.add("cell");
    let text = document.createTextNode(element[key]);
    cell.appendChild(text);
  }
}
