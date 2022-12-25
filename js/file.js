// https://www.codingnepalweb.com/drag-drop-file-upload-feature-javascript/
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
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
    alertEl.classList.add("alert-active");
    return;
  }
  alertEl.classList.remove("alert-active");

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

  totalRows = pureData.length;
  switchToTableUi();
  main();
}

function setFile(e) {
  var file = e.target.files[0];
  checkFileIsLegit(file);
}

function inputClick() {
  getExcelInput.value = null;
  getExcelInput.click();
}

getExcelInput.addEventListener("change", setFile, false);
