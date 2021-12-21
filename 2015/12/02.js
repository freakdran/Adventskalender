const fs = require("fs");

// const input = fs.readFileSync("./2015/12/input2.txt", "utf8");
const input = fs.readFileSync("input.txt", "utf8");

let all = eval(input);

console.log(work(all));

function work(thing) {
  let sum = 0;
  let zero = false;
  if (Array.isArray(thing)) {
    thing.forEach((x) => {
      if (typeof x === "number") {
        sum += x;
      } else if (Array.isArray(x)) {
        sum += work(x);
      } else if (typeof x === "object") {
        sum += work(x);
      }
    });
  } else if (typeof thing === "object") {
    for (x in thing) {
      if (typeof thing[x] === "string" && thing[x] === "red") {
        zero = true;
      } else if (Array.isArray(thing[x])) {
        sum += work(thing[x]);
      } else if (typeof thing === "object") {
        sum += work(thing[x]);
      } else if (typeof thing[x] === "number") {
        sum += thing[x];
      }
    }
  } else if (typeof thing === "number") {
    sum += thing;
  }
  return zero ? 0 : sum;
  // return sum;
}
