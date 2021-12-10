const fs = require("fs");

let navigationInput;
let openingSymbols = ["(", "[", "{", "<"];
let closingSymbols = [")", "]", "}", ">"];

// fs.readFile("./2021/10/input2.txt", "utf8", (err, inputString) => {
fs.readFile("input.txt", "utf8", (err, inputString) => {
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
    if (corruption.constructor.name !== "Array") {
      corrupted.push({ inputIndex: index, corruptionIndex: corruption });
    } else {
      incomplete.push(corruption);
    }
  });

  incomplete.forEach((i, index) => (incomplete[index] = finishIncomplete(i)));
  incomplete.sort((a, b) => {
    return a - b;
  });
  console.log(incomplete[(incomplete.length - 1) / 2]);
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
  return tempOpenings;
}

function finishIncomplete(incompleteInput) {
  let sum = 0;
  for (let i = incompleteInput.length - 1; i >= 0; i--) {
    let added;
    switch (incompleteInput[i]) {
      case "(":
        added = 1;
        break;
      case "[":
        added = 2;
        break;
      case "{":
        added = 3;
        break;
      case "<":
        added = 4;
        break;
    }
    sum *= 5;
    sum += added;
  }
  return sum;
}
