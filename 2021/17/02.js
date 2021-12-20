const fs = require("fs");

const X = require("./X.js");
const Y = require("./Y.js");

let target = fs.readFileSync("input.txt", { encoding: "utf8" });
// let target = fs.readFileSync("./2021/17/input.txt", { encoding: "utf8" });
target = target
  .replace(/[^0-9,.-]*/g, "")
  .split(",")
  .map(x =>
    x.split("..").map(function(singleScan) {
      return parseInt(singleScan);
    })
  );
target[0] = target[0].sort((a, b) => {
  return a - b;
});
target[1] = target[1].sort((a, b) => {
  return a - b;
});

let viableX = findViableXForces(target[0]);
let viableY = findViableY(target[1]);

viableX.forEach(X => {
  checkLaps(X, viableY);
});
let lapSum = 0;
// console.log(viableX);
viableX.forEach(X => {
  // console.log(X.x);
  // console.log(X.y);
  lapSum += X.numberOfHits;
});

console.log(lapSum);
// console.log(target);

function findViableXForces(targetX) {
  let viable = [];

  for (let i = 0; i <= targetX[1]; i++) {
    let temp = new X(i);
    let sum = 0;
    for (let j = i; j >= 0; j--) {
      sum += j;
      if (sum >= targetX[0] && sum <= targetX[1]) {
        if (temp.hitFrom === 0) temp.hitFrom = i - j + 1;

        temp.hitUntil = i - j + 1;
        if (j === 0) temp.drop = true;
      }
    }
    if (temp.hitFrom !== 0) viable.push(temp);
  }
  return viable;
}
function findViableY(targetY) {
  let viable = [];

  for (let i = targetY[0]; i <= Math.abs(targetY[0]) - 1; i++) {
    let temp = new Y(i);
    let pos = 0;

    // let iterator = i > 0 ? i : 0;
    for (let j = 0; pos >= targetY[0]; j++) {
      // iterator++;
      pos += i - j;
      if (pos >= targetY[0] && pos <= targetY[1]) {
        if (temp.hitFrom === 0) temp.hitFrom = j + 1;
        temp.hitUntil = j + 1;
      }
    }
    if (temp.hitFrom !== 0) viable.push(temp);
  }
  return viable;
}

function sum(x) {
  let sum = 0;
  for (let i = 0; i <= x; i++) {
    sum += i;
  }

  return sum;
}

function checkLaps(X, allY) {
  allY.forEach(Y => {
    if (X.drop) {
      if (Y.hitFrom >= X.hitFrom || Y.hitUntil >= X.hitFrom) {
        X.addY(Y);
      }
    } else {
      if (
        (Y.hitFrom >= X.hitFrom && Y.hitFrom <= X.hitUntil) ||
        (Y.hitUntil >= X.hitFrom && Y.hitUntil <= X.hitUntil)
      ) {
        X.addY(Y);
      }
    }
  });
}
