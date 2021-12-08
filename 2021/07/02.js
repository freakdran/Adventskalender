const fs = require("fs");

let positions;
let biggest = 0;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  positions = inputString.split(",").map(function(singleScan) {
    return parseInt(singleScan);
  });

  let maxPosition = Math.max(...positions);
  biggest = ((maxPosition * (maxPosition + 1)) / 2) * positions.length;

  for (let i = 0; i < maxPosition; i++) {
    let sum = 0;
    positions.forEach(position => {
      let movementRange = Math.abs(position - i);
      sum += (movementRange * (movementRange + 1)) / 2;
    });
    if (sum < biggest) {
      biggest = sum;
    }
  }
  console.log(biggest);
});
