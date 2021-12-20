class Node {
  constructor(id, left, right) {
    this.id = id;
    if (right !== undefined) {
      this.left = left;
      this.right = right;
    } else {
      this.value = left;
    }
  }
  getLeft() {
    return this.left;
  }

  getRight() {
    return this.left;
  }

  // setValue(value) {
  //   this.left = undefined;
  //   this.right = undefined;
  //   this.value = value;
  // }
}

module.exports = Node;
