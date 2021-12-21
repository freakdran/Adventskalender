const fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf8").split("\r\n");
let a = [];
let seatings = inputs.map((input) => {
  input = input.substring(0, input.length - 1);
  input = input.split(" ");
  input.splice(1, 1);
  input.splice(3, 6);
  if (input[1] === "lose") {
    input[2] = parseInt("-" + input[2]);
  } else {
    input[2] = parseInt(input[2]);
  }
  input.splice(1, 1);
  input[0] = input[0].substring(0, 1);
  input[2] = input[2].substring(0, 1);
  if (!a.includes(input[0])) a.push(input[0]);
  return input;
});

let permutations = buildPermutations(a);
console.log(permutations);

let maxHappiness = 0;
permutations.forEach((permutation) => {
  let happiness = 0;
  for (let i = 1; i < permutation.length - 1; i++) {
    for (let j = 0; j < seatings.length; j++) {
      if (
        (seatings[j][0] === permutation[i] &&
          seatings[j][2] === permutation[i + 1]) ||
        (seatings[j][0] === permutation[i] &&
          seatings[j][2] === permutation[i - 1])
      ) {
        happiness += seatings[j][1];
      }
    }
  }
  for (let j = 0; j < seatings.length; j++) {
    if (
      (seatings[j][0] === permutation[0] &&
        seatings[j][2] === permutation[1]) ||
      (seatings[j][0] === permutation[0] &&
        seatings[j][2] === permutation[permutation.length - 1])
    ) {
      happiness += seatings[j][1];
    }
  }
  for (let j = 0; j < seatings.length; j++) {
    if (
      (seatings[j][0] === permutation[permutation.length - 1] &&
        seatings[j][2] === permutation[0]) ||
      (seatings[j][0] === permutation[permutation.length - 1] &&
        seatings[j][2] === permutation[permutation.length - 2])
    ) {
      happiness += seatings[j][1];
    }
  }
  if (maxHappiness < happiness) maxHappiness = happiness;
});
console.log(maxHappiness);

//

function buildPermutations(arr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(arr);

  return result;
}
