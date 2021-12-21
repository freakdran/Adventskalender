const fs = require("fs");

let letters = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");
let niceStrings = 0;

letters.forEach((letter) => {
  if (doubleDouble(letter) && between(letter)) niceStrings++;
});
console.log(niceStrings);

function doubleDouble(str) {
  for (let i = 0; i < str.length - 1; i++) {
    let s = str.substring(i, i + 2);
    let rest = str.substring(i + 2);
    if (rest.includes(s)) return true;
  }
  return false;
}

function between(str) {
  for (let i = 0; i < str.length - 2; i++) {
    let s = str.substring(i, i + 3);
    if (s[0] === s[2]) {
      return true;
    }
  }
  return false;
}
