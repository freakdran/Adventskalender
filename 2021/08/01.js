const fs = require("fs");

let input;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  input = inputString.split("\r\n").map(singleInput => {
    return singleInput.split(" | ").map(singleNumberString => {
      return singleNumberString.split(" ");
    });
  });
  let numbers = [],
    solution = [];
  input.forEach(x => {
    numbers.push(x[0]);
    solution.push(x[1]);
  });
  let uniques = 0;

  input.forEach(x => {
    for (let i = 0; i < x[1].length; i++) {
      let nLength = x[1][i].length;
      if (nLength === 2 || nLength === 3 || nLength === 4 || nLength === 7) {
        uniques++;
      }
    }
  });

  console.log(uniques);
});
