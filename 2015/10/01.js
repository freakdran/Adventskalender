let input = "1113122113";
let iterations = 50;
let changedInput = input;

for (let i = 0; i < iterations; i++) {
  changedInput = lookAndSay(changedInput);
}
console.log(changedInput.length);

function lookAndSay(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let currentNumber = str[i];
    let stop = false;
    for (let j = 1; j < str.length && !stop; j++) {
      if (str[i + j] !== currentNumber) {
        i += j - 1;
        result += j + currentNumber;
        stop = true;
      }
    }
  }
  return result;
}
