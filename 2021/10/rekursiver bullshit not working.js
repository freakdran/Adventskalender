const fs = require("fs");

let navigationInput;
let counter = 0;

fs.readFile("./2021/10/input.txt", "utf8", (err, inputString) => {
  // fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  navigationInput = inputString.split("\r\n").map(singleInput => {
    return singleInput.split("");
  });
  let a = navigateChunk(navigationInput[0].slice(1), navigationInput[0][0]);
  console.log(a);
});

function navigateChunk(chunk, opening) {
  counter++;

  if (counter > 30) return true;

  let corrupted = false;

  if (chunk.length === 0) return false;

  console.log(chunk.join());
  console.log(opening);

  switch (opening) {
    case "(":
      if (chunk[0] === ")") {
        return false;
      } else if (chunk[0] === "}" || chunk[0] === "]" || chunk[0] === ">") {
        return true;
      }
      break;
    case "{":
      if (chunk[0] === "}") {
        return false;
      } else if (chunk[0] === ")" || chunk[0] === "]" || chunk[0] === ">") {
        return true;
      }
      break;
    case "[":
      if (chunk[0] === "]") {
        return false;
      } else if (chunk[0] === ")" || chunk[0] === "}" || chunk[0] === ">") {
        return true;
      }
      break;
    case "<":
      if (chunk[0] === ">") {
        return false;
      } else if (chunk[0] === ")" || chunk[0] === "}" || chunk[0] === "]") {
        return true;
      }
      break;
    default:
  }
  while (!corrupted) {
    let b = chunk.splice(0, 1);
    corrupted = navigateChunk(chunk, b[0]);
  }
  return corrupted;
}
