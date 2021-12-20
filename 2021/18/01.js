const fs = require("fs");
const node = require("./Node.js");

let homeworks = fs
  .readFileSync("input.txt", { encoding: "utf8" })
  .split("\r\n");

let allNodes = [];

let currentExercise = homeworks[0];
currentExercise = solveExercise(currentExercise);

for (let i = 1; i < homeworks.length; i++) {
  currentExercise = `[${currentExercise},${homeworks[i]}]`;
  currentExercise = solveExercise(currentExercise);
}
let tree = buildTree(0, JSON.parse(currentExercise));
console.log(magnitude(tree));

function solveExercise(exercise) {
  allNodes = [];
  let treeArr = JSON.parse(exercise);
  let tree = buildTree(0, treeArr);
  let tooDeep = findExplodes(allNodes);
  let tooBig = findSplits(allNodes);
  while (tooDeep.length > 0 || tooBig.length > 0) {
    if (tooDeep.length > 0) {
      explode(tooDeep[0]);
      // console.log(printTree(tree));
      tooDeep.shift();
    } else if (tooBig.length > 0) {
      bigSplit(tooBig[0]);
      // console.log(printTree(tree));
      tooBig.shift();
    }
    if (
      printTree(tree) ===
      "[[[[7,7],[7,8]],[[9,5],[8,0]]],[[[9,10],20],[8,[9,0]]]]"
    ) {
      tooDeep = findExplodes(allNodes);
      tooBig = findSplits(allNodes);
    }
    tooDeep = findExplodes(allNodes);
    tooBig = findSplits(allNodes);
  }
  return printTree(tree);
}
function findExplodes(nodes) {
  let tooDeep = [];
  nodes.forEach(node => {
    if (node.id.length >= 5 && node.left && node.right) tooDeep.push(node);
  });
  tooDeep.sort(sortBit);
  return tooDeep;
}
function findSplits(nodes) {
  let tooBig = [];
  nodes.forEach(node => {
    if (!node.left && !node.right && node.value > 9) {
      tooBig.push(node);
    }
  });
  tooBig.sort(sortBit);
  return tooBig;
}

function explode(node) {
  let actualId = node.id.substring(1);
  if (actualId.includes("1")) {
    let leftId = actualId;
    while (leftId[leftId.length - 1] === "0") {
      leftId = leftId.substring(0, leftId.length - 1);
    }
    let nextLeft = allNodes.find(node => {
      return node.id === `0${leftId.substring(0, leftId.length - 1)}0`;
    });
    addLeft(nextLeft, node.left.value);
  }
  if (actualId.includes("0")) {
    let rightId = actualId;
    while (rightId[rightId.length - 1] === "1") {
      rightId = rightId.substring(0, rightId.length - 1);
    }
    let nextRight = allNodes.find(node => {
      return node.id === `0${rightId.substring(0, rightId.length - 1)}1`;
    });
    addRight(nextRight, node.right.value);
  }
  allNodes = allNodes.filter(
    x => !(x.id === node.left.id || x.id === node.right.id)
  );
  node.left = undefined;
  node.right = undefined;
  node.value = 0;
}
function addLeft(node, value) {
  if (node.value || node.value === 0) {
    node.value += value;
  } else {
    addLeft(node.right, value);
  }
}
function addRight(node, value) {
  if (node.value || node.value === 0) {
    node.value += value;
  } else {
    addRight(node.left, value);
  }
}

function bigSplit(bigNode) {
  let left = Math.floor(bigNode.value / 2);
  let right = Math.ceil(bigNode.value / 2);
  bigNode.value = undefined;
  let newLeft = new node(`${bigNode.id}0`, left);
  let newRight = new node(`${bigNode.id}1`, right);
  bigNode.left = newLeft;
  bigNode.right = newRight;

  allNodes.push(newLeft);
  allNodes.push(newRight);
}

function buildTree(id, arr) {
  let newNode;
  if (arr.length > 1) {
    let left = buildTree(`${id}0`, arr[0]);
    let right = buildTree(`${id}1`, arr[1]);
    newNode = new node(id, left, right);
  } else {
    newNode = new node(id, arr);
  }
  allNodes.push(newNode);
  return newNode;
}

function printTree(tree) {
  if (tree.value || tree.value === 0) {
    return tree.value;
  } else {
    return `[${printTree(tree.left)},${printTree(tree.right)}]`;
  }
}

function magnitude(tree) {
  let sum = 0;
  if (tree.left.value || tree.left.value === 0) {
    sum += tree.left.value * 3;
  } else {
    sum += magnitude(tree.left) * 3;
  }
  if (tree.right.value || tree.right.value === 0) {
    sum += tree.right.value * 2;
  } else {
    sum += magnitude(tree.right) * 2;
  }
  return sum;
}

function sortBit(a, b) {
  if (a.id.length === b.id.length) {
    return parseInt(a.id, 2) - parseInt(b.id, 2);
  } else {
    let tL;
    a.id.length > b.id.length ? (tL = b.id.length) : (tL = a.id.length);
    if (a.id.substring(0, tL) === b.id.substring(0, tL)) {
      if (a.id.length > b.id.length) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return (
        parseInt(a.id.substring(0, tL), 2) - parseInt(b.id.substring(0, tL), 2)
      );
    }
  }
}
