const fs = require("fs");

let navigationInput;
let openingSymbols = ["(", "[", "{", "<"];
let closingSymbols = [")", "]", "}", ">"];

// fs.readFile("./2021/10/input.txt", "utf8", (err, inputString) => {
fs.readFile("input2.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  navigationInput = inputString.split("\r\n").map(singleInput => {
    return singleInput.split("");
  });

  let incomplete = [];
  let corrupted = [];

  navigationInput.forEach((input, index) => {
    let corruption = findCorrupted(input);
    if (corruption != -1) {
      corrupted.push({ inputIndex: index, corruptionIndex: corruption });
    } else {
      incomplete.push(index);
    }
  });

  console.log(sumCorrupted(corrupted));
});

function findCorrupted(input) {
  let tempOpenings = [];
  for (let i = 0; i < input.length; i++) {
    if (openingSymbols.includes(input[i])) {
      tempOpenings.push(input[i]);
    } else {
      switch (tempOpenings[tempOpenings.length - 1]) {
        case openingSymbols[0]:
          if (input[i] !== closingSymbols[0]) return i;
          tempOpenings.pop();
          break;
        case openingSymbols[1]:
          if (input[i] !== closingSymbols[1]) return i;
          tempOpenings.pop();
          break;
        case openingSymbols[2]:
          if (input[i] !== closingSymbols[2]) return i;
          tempOpenings.pop();
          break;
        case openingSymbols[3]:
          if (input[i] !== closingSymbols[3]) return i;
          tempOpenings.pop();
          break;
        default:
          throw "CORRUPTED FILE";
      }
    }
  }
  return -1;
}

function sumCorrupted(corrupted) {
  let syntaxErrorScore = 0;
  corrupted.forEach(corruption => {
    switch (
      navigationInput[corruption.inputIndex][corruption.corruptionIndex]
    ) {
      case ")":
        syntaxErrorScore += 3;
        break;
      case "]":
        syntaxErrorScore += 57;
        break;
      case "}":
        syntaxErrorScore += 1197;
        break;
      case ">":
        syntaxErrorScore += 25137;
        break;
      default:
        console.log("WRONG INPUT");
    }
  });
  return syntaxErrorScore;
}
