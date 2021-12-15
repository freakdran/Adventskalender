const fs = require("fs");

let input, dots, instructions;
let board;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  input = inputString.split("\r\n");

  init();
  board = buildBoard();
  if (instructions[0][0] === "x") {
    foldX(instructions[0][1]);
  } else {
    foldY(instructions[0][1]);
  }
  countHash();
  // instructions.forEach(x => {
  //   if (x[0] === "x") {
  //     foldX(x[1]);
  //   } else {
  //     foldY(x[1]);
  //   }
  // });
  // console.log(board);
});

function foldX(index) {
  let newBoard = [];
  board.forEach(line => {
    let right = line
      .splice(index)
      .splice(1)
      .reverse();
    left = line;
    for (let i = 0; i < left.length; i++) {
      if (left[i] === "#" || right[i] === "#") {
        left[i] = "#";
      }
    }
    newBoard.push(left);
  });
  board = newBoard;
}

function foldY(index) {
  let bottom = board
    .splice(index)
    .splice(1)
    .reverse();
  let top = board;

  for (let i = 0; i < top.length; i++) {
    for (let j = 0; j < top[i].length; j++) {
      if (top[i][j] === "#" || bottom[i][j] === "#") {
        top[i][j] = "#";
      }
    }
  }
  board = top;
}

function buildBoard() {
  let maxX = 0,
    maxY = 0;
  dots.forEach(dot => {
    maxY = dot[1] > maxY ? dot[1] : maxY;
    maxX = dot[0] > maxX ? dot[0] : maxX;
  });
  let board = [];
  for (let i = 0; i < maxY + 1; i++) {
    board.push(new Array(maxX + 1).fill("."));
  }

  dots.forEach(dot => {
    board[dot[1]][dot[0]] = "#";
  });

  return board;
}
function init() {
  dots = input
    .filter(x => x.includes(","))
    .map(x => x.split(",").map(x => parseInt(x)));

  instructions = input.filter(x => x.includes("fold")).map(x => x.split(" "));
  instructions = instructions.map(x => x.splice(2));
  let iTemp = [];
  instructions.forEach(x => {
    iTemp.push(x[0].split("="));
  });
  instructions = iTemp;
}
function print2d(arr) {
  arr.forEach(a => {
    console.log(a.join(""));
  });
}
function countHash() {
  let c = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "#") c++;
    }
  }
  console.log(c);
}
