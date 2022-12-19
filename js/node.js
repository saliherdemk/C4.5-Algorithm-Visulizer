class Node {
  constructor(name, attr, parent = null, children = []) {
    this.name = name;
    this.attr = attr;
    this.parent = parent;
    this.children = children;
  }

  addChildren(node) {
    this.children.push(node);
  }

  replaceChildren(oldNode, newNode) {
    const index = this.children.indexOf(oldNode);
    if (index > -1) {
      this.children.splice(index, 1, newNode);
    }
  }
}
