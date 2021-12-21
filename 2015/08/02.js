const fs = require("fs");

let list = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let code = 0,
  encodedLength = 0;

list.forEach((line) => {
  code += line.length;
  let encodedLineLength = line.length + 2;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "\\" || line[i] === '"') {
      encodedLineLength += 1;
    }
  }
  encodedLength += encodedLineLength;
});

console.log("Code length: " + code);
console.log("Encoded length: " + encodedLength);
console.log("Difference: " + (encodedLength - code));
