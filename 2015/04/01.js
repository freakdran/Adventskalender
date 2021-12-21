const fs = require("fs");
const md5 = require("./md5");

const word = "iwrupvqb";

let found = false;
let i = 0;
while (!found) {
  let md5h = md5.md5(`${word}${i}`);
  if (md5h.substring(0, 6) === "000000") {
    found = true;
  } else {
    i++;
  }
}
console.log(i);
