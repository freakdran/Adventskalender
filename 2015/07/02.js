const fs = require("fs");

let instructions = fs
  // .readFileSync("./2015/07/input.txt", { encoding: "utf8" })
  .readFileSync("input.txt", { encoding: "utf8" })
  .split("\r\n");

let unsolved = [];
let solveable = [];
let solved = [];
let done = [];

init();
sortUnsolved();
insert();
while (unsolved.length > 0) {
  checkSolveable();
  solve();
  insert();
}

let a = done.find((x) => x.key === "a").value;
done = [];
init();
sortUnsolved();
solved[1].value = a;
insert();
while (unsolved.length > 0) {
  checkSolveable();
  solve();
  insert();
}
let newA = done.find((x) => x.key === "a").value;
console.log(newA);
console.log(performance.now());

function solve() {
  for (let i = solveable.length - 1; i >= 0; i--) {
    switch (solveable[i].operator) {
      case "AND":
        solved.push(AND(solveable[i].key, solveable[i].input));
        break;
      case "OR":
        solved.push(OR(solveable[i].key, solveable[i].input));
        break;
      case "LSHIFT":
        solved.push(LSHIFT(solveable[i].key, solveable[i].input));
        break;
      case "RSHIFT":
        solved.push(RSHIFT(solveable[i].key, solveable[i].input));
        break;
      case "NOT":
        solved.push(NOT(solveable[i].key, solveable[i].input[0]));
        break;
      default:
        solved.push({ key: solveable[i].key, value: solveable[i].input[0] });
    }
    solveable.pop();
  }
}

function AND(key, input) {
  let a = toBinary(input[0]);
  let b = toBinary(input[1]);
  let bin = "";
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "1" && b[i] === "1") {
      bin += "1";
    } else {
      bin += "0";
    }
  }
  return { key: key, value: parseInt(bin, 2) };
}
function OR(key, input) {
  let a = toBinary(input[0]);
  let b = toBinary(input[1]);
  let bin = "";
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "1" || b[i] === "1") {
      bin += "1";
    } else {
      bin += "0";
    }
  }
  return { key: key, value: parseInt(bin, 2) };
}
function LSHIFT(key, input) {
  let bin = toBinary(input[0]);
  bin = bin.substring(input[1]).padEnd(16, "0");
  return { key: key, value: parseInt(bin, 2) };
}
function RSHIFT(key, input) {
  let bin = toBinary(input[0]);
  bin = bin.substring(0, bin.length - input[1]).padStart(16, "0");
  return { key: key, value: parseInt(bin, 2) };
}
function NOT(key, input) {
  input = toBinary(input);
  let bNot = "";
  for (i = 0; i < input.length; i++) {
    input[i] === "1" ? (bNot += "0") : (bNot += "1");
  }
  return { key: key, value: parseInt(bNot, 2) };
}

function insert() {
  solved.forEach((s) => {
    for (let i = 0; i < unsolved.length; i++) {
      if (unsolved[i].input[0] === s.key) unsolved[i].input[0] = s.value;
      if (unsolved[i].input[1] === s.key) unsolved[i].input[1] = s.value;
    }
    done.push(s);
  });
  solved = [];
}
function checkSolveable() {
  for (let i = unsolved.length - 1; i >= 0; i--) {
    let c = true;
    for (let j = 0; c && j < unsolved[i].input.length; j++) {
      if (typeof unsolved[i].input[j] === "string") c = false;
    }
    if (c) solveable.push(unsolved.splice(i, 1)[0]);
  }
}

function init() {
  instructions.forEach((instruction) => {
    instruction = instruction.split(" -> ");
    let gate = { key: instruction[1] };

    if (instruction[0].includes("AND")) {
      instruction[0] = instruction[0].split(" AND ");
      gate.operator = "AND";
      let a =
        parseInt(instruction[0][0]) >= 0
          ? parseInt(instruction[0][0])
          : instruction[0][0];
      let b =
        parseInt(instruction[0][1]) >= 0
          ? parseInt(instruction[0][1])
          : instruction[0][1];
      gate.input = [a, b];
      unsolved.push(gate);
    } else if (instruction[0].includes("OR")) {
      instruction[0] = instruction[0].split(" OR ");
      gate.operator = "OR";
      let a =
        parseInt(instruction[0][0]) >= 0
          ? parseInt(instruction[0][0])
          : instruction[0][0];
      let b =
        parseInt(instruction[0][1]) >= 0
          ? parseInt(instruction[0][1])
          : instruction[0][1];
      gate.input = [a, b];
      unsolved.push(gate);
    } else if (instruction[0].includes("LSHIFT")) {
      instruction[0] = instruction[0].split(" LSHIFT ");
      gate.operator = "LSHIFT";
      let a =
        parseInt(instruction[0][0]) >= 0
          ? parseInt(instruction[0][0])
          : instruction[0][0];
      let b =
        parseInt(instruction[0][1]) >= 0
          ? parseInt(instruction[0][1])
          : instruction[0][0];
      gate.input = [a, b];
      unsolved.push(gate);
    } else if (instruction[0].includes("RSHIFT")) {
      instruction[0] = instruction[0].split(" RSHIFT ");
      gate.operator = "RSHIFT";
      let a =
        parseInt(instruction[0][0]) >= 0
          ? parseInt(instruction[0][0])
          : instruction[0][0];
      let b =
        parseInt(instruction[0][1]) >= 0
          ? parseInt(instruction[0][1])
          : instruction[0][0];
      gate.input = [a, b];
      unsolved.push(gate);
    } else if (instruction[0].includes("NOT")) {
      instruction[0] = instruction[0].substring(4);
      gate.operator = "NOT";
      let a =
        parseInt(instruction[0]) >= 0
          ? parseInt(instruction[0])
          : instruction[0];
      gate.input = [a];
      unsolved.push(gate);
    } else {
      if (parseInt(instruction[0]) >= 0) {
        gate.value = parseInt(instruction[0]);
        solved.push(gate);
      } else {
        gate.input = [instruction[0]];
        unsolved.push(gate);
      }
    }
  });
}
function toBinary(num) {
  let binary = num.toString(2).padStart(16, "0");
  return binary;
}
function sortUnsolved() {
  unsolved = unsolved.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
  });
}
