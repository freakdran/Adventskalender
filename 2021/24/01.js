const fs = require("fs");

let input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let keys = { w: 0, x: 0, y: 0, z: 0 };

let number = new Array(14);

checkNumber(1, 0);

/**
 *
 * @param {number} n Number to be checked 1-9
 * @param {number} iterator Iterator for multiplying
 */
function checkNumber(n, iterator) {
  let units = { w: 0, x: 0, y: 0, z: 0 };
  for (let i = 0; i < 18; i++) {
    let command = input[i + iterator * 18].split(" ");
    console.log(command);
    console.log(units["x"]);
    if (command[0] === "inp") {
      units[command[1]] = n;
    } else {
      switch (command[0]) {
        case "add":
          units[command[1]] = add(
            units[command[1]] || parseInt(command[1]),
            units[command[2]] || parseInt(command[2])
          );
          break;
        case "mul":
          units[command[1]] = mul(
            units[command[1]] || parseInt(command[1]),
            units[command[2]] || parseInt(command[2])
          );
          break;
        case "div":
          units[command[1]] = div(units[command[1]], units[command[2]]);
          break;
        case "mod":
          units[command[1]] = mod(units[command[1]], units[command[2]]);
          break;
        case "eql":
          units[command[1]] = eql(units[command[1]], units[command[2]]);
          break;
      }
    }
    console.log(units);
  }
}

function add(a, b) {
  console.log(a, b);
  return a + b;
}
function mul(a, b) {
  console.log(a, b);
  return a * b;
}
function div(a, b) {
  return Math.floor(a / b);
}
function mod(a, b) {
  return a % b;
}
function eql(a, b) {
  return a === b ? 1 : 0;
}
