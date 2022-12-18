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
}
