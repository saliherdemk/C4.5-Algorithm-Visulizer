// https://codepen.io/Gutto/pen/GBLPyN
treeContainer.addEventListener("mousedown", (e) => MouseDown(e));
treeContainer.addEventListener("mouseup", (e) => mouseUp(e));
treeContainer.addEventListener("mouseleave", (e) => mouseLeave(e));
treeContainer.addEventListener("mousemove", (e) => mouseMove(e));

function MouseDown(e) {
  isdown = true;
  startx = e.pageX - treeContainer.offsetLeft;
  starty = e.pageY - treeContainer.offsetTop;
  scrleft = treeContainer.scrollLeft;
  scrtop = treeContainer.scrollTop;
}

function mouseUp(e) {
  isdown = false;
}

function mouseLeave(e) {
  isdown = false;
}

function mouseMove(e) {
  if (isdown) {
    e.preventDefault();

    var y = e.pageY - treeContainer.offsetTop;
    var goY = y - starty;
    treeContainer.scrollTop = scrtop - goY;

    var x = e.pageX - treeContainer.offsetLeft;
    var goX = x - startx;
    treeContainer.scrollLeft = scrleft - goX;
  }
}

function zoom(event) {
  const el = document.querySelector("svg");

  event.preventDefault();

  scale += event.deltaY * -0.001;
  scale = Math.min(Math.max(0.25, scale), 1);

  el.style.transform = `scale(${scale})`;
}

treeContainer.onwheel = zoom;
