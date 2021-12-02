const fs = require("fs");

let scan;
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
  for (let a = 1; a < scans.length; a++) {
    if (scans[a] > scans[a - 1]) numberOfIncreases++;
  }

  console.log(numberOfIncreases);
}
