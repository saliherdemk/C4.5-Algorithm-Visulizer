const dropArea = document.getElementById("drop-area");
const getExcelInput = document.getElementById("get_excel_input");
const toggleTableBtn = document.getElementById("toggle-table");
const table = document.querySelector("table");
const tableContainer = document.querySelector(".table-container");
const treeContainer = document.querySelector(".graph");
const controlPanel = document.querySelector(".buttons");
const increaseRowSelect = document.querySelector("select");
const currRowsSpan = document.getElementById("curr-rows");
const totalRowsSpan = document.getElementById("total-rows");
const showRowBtn = document.getElementById("show-row");
const graphBtns = document.querySelector(".graph-btns");
const alertEl = document.getElementById("alert");

var starty, startx, scrleft, scrtop, isdown;
var scale = 1;

var root;

var currRows = 0;
var increaseRow = 5;
var pureData;
var nodeNumber = 0; // This and treeHeight just for setting svg size
var treeHeight = 0;
var totalRows = 0;
var attributes = {}; // store data attributes for select option
var predAttributes = {};
var predictedNode = null;
