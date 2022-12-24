const dropArea = document.getElementById("drop-area");
const dragText = dropArea.querySelector("header");
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
const backToRootBtn = document.getElementById("go-root-btn");
const alertEl = document.getElementById("alert");

var starty, startx, scrleft, scrtop, isdown;

var root;

var prunedTree = true;
var currRows = 0;
var increaseRow = 5;
var pureData;
var nodeNumber = 0; // This is just for setting svg size
var treeHeight = 0;
var scale = 1;
var totalRows = 0;
var attributes = {};
var predAttributes = {};
