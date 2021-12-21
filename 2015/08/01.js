const fs = require("fs");

let list = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");
// let list = fs
//   .readFileSync("./2015/08/input2.txt", { encoding: "utf8" })
//   .split("\r\n");

let code = 0,
  actual = 0;

list.forEach((line) => {
  code += line.length;
  let actualLine = line.substring(1, line.length - 1);
  let actualLineLength = actualLine.length;
  for (let i = 0; i < actualLine.length; i++) {
    if (actualLine[i] === "\\") {
      if (actualLine[i + 1] === '"' || actualLine[i + 1] === "\\") {
        actualLineLength -= 1;
        i += 1;
      } else if (
        actualLine[i + 1] === "x" &&
        actualLine.substring(i + 1, i + 4).match(/[\d|a-f]{2}/)
      ) {
        actualLineLength -= 3;
        i += 3;
      }
    }
  }
  actual += actualLineLength;
});

console.log("Code length: " + code);
console.log("Actual length: " + actual);
console.log("Difference: " + (code - actual));
