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
