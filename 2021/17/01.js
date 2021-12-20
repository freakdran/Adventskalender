const fs = require("fs");

let target = fs.readFileSync("input.txt", { encoding: "utf8" });
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

console.log(target);

let max = Math.abs(target[1][0]) - 1;
console.log(max);
console.log((max * (max + 1)) / 2);
