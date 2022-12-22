// https://www.codingnepalweb.com/drag-drop-file-upload-feature-javascript/

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  var file = event.dataTransfer.files[0];
  checkFileIsLegit(file);
});

function checkFileIsLegit(file) {
  let fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];
  if (!fileTypes.includes(file.type)) {
    // alert
    return;
  }
  extractData(file);
}

async function extractData(file) {
  const fileData = await file.arrayBuffer();
  const workbook = XLSX.read(fileData);

  let worksheets = {};
  for (const sheetName of workbook.SheetNames) {
    worksheets["sheetName"] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }
  pureData = worksheets.sheetName;
  switchToTableUi();
  main();
}

function switchToTableUi() {
  dropArea.classList.add("hidden");
  treeContainer.classList.remove("hidden");
  controlPanel.classList.remove("hidden");
}

function reset() {
  treeContainer.innerHTML = "";
  table.innerHTML = "";
  toggleTableBtn.innerText = "Hide Table";
  dropArea.classList.remove("hidden");
  treeContainer.classList.add("hidden");
  controlPanel.classList.add("hidden");

  currRows = 0;
  nodeNumber = 0;
  treeHeight = 0;
  scale = 1;
}

function setFile(e) {
  console.log(e);
  var file = e.target.files[0];
  checkFileIsLegit(file);
}

function inputClick() {
  getExcelInput.value = null;
  getExcelInput.click();
}

getExcelInput.addEventListener("change", setFile, false);
