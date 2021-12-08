const fs = require("fs");

let positions;
let biggest;
let smallestMoveTo;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  positions = inputString.split(",").map(function(singleScan) {
    return parseInt(singleScan);
  });

  let maxPosition = Math.max(...positions);
  biggest = maxPosition * positions.length;

  for (let i = 0; i < maxPosition; i++) {
    let sum = 0;
    positions.forEach(position => {
      sum += Math.abs(position - i);
    });
    if (sum < biggest) {
      biggest = sum;
      smallestMoveTo = i;
    }
  }
  console.log(biggest);
});
