const fs = require("fs");

let dimension = 1000;

let instructions = fs
  .readFileSync("input.txt", { encoding: "utf8" })
  .split("\r\n");
/* single instruction format is [step, from, to] 
      step is number from 0 to 2. 0 = on => +1, 1 = off => -1, 2 = toggle => +2
      from = [x,y]
      to = [x,y]
  */
instructions = formatInstructions(instructions);

let lights = new Array(dimension);
for (let i = 0; i < lights.length; i++) {
  lights[i] = new Array(dimension).fill(0);
}
instructions.forEach((instruction) => {
  switch (instruction[0]) {
    case 0:
      add(instruction[1], instruction[2], 1);
      break;
    case 1:
      add(instruction[1], instruction[2], -1);
      break;
    case 2:
      add(instruction[1], instruction[2], 2);
      break;
    default:
      console.log("Something went wrong");
  }
});
getBrightness();

function add(from, to, state) {
  for (let y = from[1]; y <= to[1]; y++) {
    for (let x = from[0]; x <= to[0]; x++) {
      lights[y][x] + state >= 0 ? (lights[y][x] += state) : (lights[y][x] = 0);
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

function getBrightness() {
  let b = 0;
  for (let i = 0; i < lights.length; i++) {
    for (let j = 0; j < lights[i].length; j++) {
      b += lights[i][j];
    }
  }

  console.log(b);
}
console.log(performance.now());
