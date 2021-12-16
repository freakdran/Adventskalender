const fs = require("fs");

let numberOfIncreases = 0;

let scans = fs
  .readFileSync("input.txt", { encoding: "utf8" })
  .split("\r\n")
  .map(function(singleScan) {
    return parseInt(singleScan);
  });
countIncrease();

function countIncrease() {
  for (let a = 1; a < scans.length; a++) {
    if (scans[a] > scans[a - 1]) numberOfIncreases++;
  }

  console.log(numberOfIncreases);
}
