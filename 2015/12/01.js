const fs = require("fs");

// const input = fs.readFileSync("./2015/12/input.txt", "utf8");
const input = fs.readFileSync("input.txt", "utf8");

let numbers = [...input.matchAll(/-{0,1}\d+/g)];
let sum = 0;
numbers.forEach((num) => (sum += parseInt(num[0])));
console.log(sum);
