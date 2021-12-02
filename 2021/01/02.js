const fs = require("fs");

let scans;
let numberOfIncreases = 0;
fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  scans = inputString.split("\r\n").map(function(singleScan) {
    return parseInt(singleScan);
  });

  countIncrease();
});

function countIncrease() {
  for (let a = 3; a < scans.length; a++) {
    let sum1 = scans[a - 3] + scans[a - 2] + scans[a - 1];
    let sum2 = scans[a - 2] + scans[a - 1] + scans[a];
    if (sum2 > sum1) numberOfIncreases++;
  }
  console.log(numberOfIncreases);
}
