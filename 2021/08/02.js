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

  let finalValue = 0;

  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = findNumberStrings(numbers[i]);
    numbers[i] = sortNumbers(numbers[i]);
    solution[i] = sortNumbers(solution[i]);

    finalValue += solveNumber(numbers[i], solution[i]);
  }
  console.log(finalValue);
});

function findNumberStrings(numbers) {
  let numbersSolution = new Array(10);

  //easy to find
  numbersSolution[1] = numbers.find(x => x.length === 2);
  numbersSolution[4] = numbers.find(x => x.length === 4);
  numbersSolution[7] = numbers.find(x => x.length === 3);
  numbersSolution[8] = numbers.find(x => x.length === 7);

  //a bit harder
  numbersSolution[3] = numbers.find(
    x =>
      x.length === 5 &&
      x.includes(numbersSolution[1][0]) &&
      x.includes(numbersSolution[1][1])
  );

  //harder?
  numbersSolution[6] = numbers.find(
    x =>
      x.length === 6 &&
      xOR(x.includes(numbersSolution[1][0]), x.includes(numbersSolution[1][1]))
  );

  //last ones
  //find different segment (top right for 2 and then 5)
  let tr;
  for (let i = 0; i < numbersSolution[8].length; i++) {
    if (!numbersSolution[6].includes(numbersSolution[8][i]))
      tr = numbersSolution[8][i];
  }
  numbersSolution[2] = numbers.find(
    x => x.length === 5 && x.includes(tr) && x !== numbersSolution[3]
  );
  numbersSolution[5] = numbers.find(
    x => x.length === 5 && x !== numbersSolution[3] && x !== numbersSolution[2]
  );

  //bottom left for 9 and then 0
  let bl;
  for (let i = 0; i < numbersSolution[6].length; i++) {
    if (!numbersSolution[5].includes(numbersSolution[6][i]))
      bl = numbersSolution[6][i];
  }
  numbersSolution[9] = numbers.find(
    x =>
      x.length === 6 &&
      x.includes(numbersSolution[1][0]) &&
      x.includes(numbersSolution[1][1]) &&
      !x.includes(bl)
  );
  numbersSolution[0] = numbers.find(
    x => x.length === 6 && x !== numbersSolution[6] && x !== numbersSolution[9]
  );

  return numbersSolution;
}

function xOR(a, b) {
  return a ? !b : b;
}

function sortNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i]
      .split("")
      .sort()
      .join("");
  }
  return numbers;
}

function solveNumber(numbers, solution) {
  for (let i = 0; i < solution.length; i++) {
    solution[i] = numbers.indexOf(solution[i]);
  }
  return parseInt(solution.join(""));
}
