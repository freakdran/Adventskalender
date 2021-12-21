const fs = require("fs");

let dimension = 1000;

let instructions = fs
  .readFileSync("input.txt", { encoding: "utf8" })
  .split("\r\n");
/* single instruction format is [step, from, to] 
      step is number from 0 to 2. 0 = on, 1 = off, 2 = toggle
      from = [x,y]
      to = [x,y]
  */
instructions = formatInstructions(instructions);

let lights = new Array(dimension);
for (let i = 0; i < lights.length; i++) {
  lights[i] = new Array(dimension).fill(false);
}
instructions.forEach((instruction) => {
  switch (instruction[0]) {
    case 0:
      set(instruction[1], instruction[2], true);
      break;
    case 1:
      set(instruction[1], instruction[2], false);
      break;
    case 2:
      toggle(instruction[1], instruction[2]);
      break;
    default:
      console.log("Something went wrong");
  }
});
countLights();

function toggle(from, to) {
  for (let y = from[0]; y <= to[0]; y++) {
    for (let x = from[1]; x <= to[1]; x++) {
      lights[x][y] = !lights[x][y];
    }
  }
}

function set(from, to, state) {
  for (let y = from[1]; y <= to[1]; y++) {
    for (let x = from[0]; x <= to[0]; x++) {
      lights[y][x] = state;
    }
  }
}

function formatInstructions(instructions) {
  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i].split(" ");
    if (instruction[0] === "turn") {
      instruction.shift();
      if (instruction[0] === "on") {
        instruction[0] = 0;
      } else {
        instruction[0] = 1;
      }
    } else {
      instruction[0] = 2;
    }
    instruction.splice(2, 1);
    instruction[1] = instruction[1].split(",").map((x) => parseInt(x));
    instruction[2] = instruction[2].split(",").map((x) => parseInt(x));
    instructions[i] = instruction;
  }
  return instructions;
}

function printLights() {
  for (let i = 0; i < lights.length; i++) {
    let row = "";
    for (let j = 0; j < lights[i].length; j++) {
      lights[i][j] ? (row += 1) : (row += 0);
    }
    console.log(row);
  }
}

function countLights() {
  let c = 0;
  for (let i = 0; i < lights.length; i++) {
    for (let j = 0; j < lights[i].length; j++) {
      if (lights[i][j]) c++;
    }
  }

  console.log(c);
}
console.log(performance.now());
