const fs = require("fs");

let lines = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let distances = [];
let cities = [];

lines.forEach((line) => {
  line = line.split(" to ");
  let rest = line[1].split(" = ");

  if (!cities.find((x) => x === line[0])) cities.push(line[0]);
  if (!cities.find((x) => x === rest[0])) cities.push(rest[0]);
  distances.push([[line[0], rest[0]], parseInt(rest[1])]);
});

let permutations = buildPermutations(cities);

let smallestDistance, largestDistance;

permutations.forEach((permutation) => {
  let distance = 0;
  for (let i = 0; i < permutation.length - 1; i++) {
    for (let j = 0; j < distances.length; j++) {
      if (
        distances[j][0].find((x) => x === permutation[i]) &&
        distances[j][0].find((x) => x === permutation[i + 1])
      ) {
        distance += distances[j][1];
      }
    }
  }
  smallestDistance ??= distance;
  largestDistance ??= distance;
  if (smallestDistance > distance) smallestDistance = distance;
  if (largestDistance < distance) largestDistance = distance;
});
console.log("Smallest distance: " + smallestDistance);
console.log("Largest distance: " + largestDistance);
console.log("Runtime = " + performance.now());
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
