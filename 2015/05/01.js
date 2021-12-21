const fs = require("fs");

let letters = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");
let niceStrings = 0;

letters.forEach((letter) => {
  if (checkForDouble(letter) && threeVowels(letter) && !badExpression(letter))
    niceStrings++;
});
console.log(niceStrings);

function checkForDouble(str) {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) return true;
  }
  return false;
}

function threeVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let numberOfVowels = 0;
  str = str.split("");
  str.forEach((x) => {
    if (vowels.includes(x)) numberOfVowels++;
  });
  if (numberOfVowels >= 3) {
    return true;
  } else {
    return false;
  }
}

function badExpression(str) {
  const disallowed = ["ab", "cd", "pq", "xy"];
  let badExpression = false;
  disallowed.forEach((d) => {
    if (str.includes(d)) badExpression = true;
  });
  return badExpression;
}
