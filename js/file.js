// https://www.codingnepalweb.com/drag-drop-file-upload-feature-javascript/

const dropArea = document.getElementById("drop-area");
const dragText = dropArea.querySelector("header");
const getExcelInput = document.getElementById("get_excel_input");

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
  main();
}

function setFile(e) {
  var file = e.target.files[0];
  checkFileIsLegit(file);
}

function inputClick() {
  getExcelInput.click();
}

getExcelInput.addEventListener("change", setFile, false);
