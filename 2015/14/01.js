const fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf8").split("\r\n");

let reindeers = inputs.map((input) => {
  let reindeer = [];
  input = input.split(" ");
  reindeer.push(
    input[0],
    parseInt(input[3]),
    parseInt(input[6]),
    parseInt(input[13])
  );
  return reindeer;
});

const racetime = 2503;
let maxDistance = 0;
reindeers.forEach((reindeer) => {
  const oneSprint = reindeer[2] + reindeer[3];
  const numOfSprints = Math.floor(racetime / oneSprint);
  let distanceTravelled = numOfSprints * reindeer[1] * reindeer[2];
  const restTime = racetime - numOfSprints * oneSprint;
  distanceTravelled +=
    restTime - reindeer[2] >= 0
      ? reindeer[1] * reindeer[2]
      : (reindeer[2] - restTime) * reindeer[1];
  if (distanceTravelled > maxDistance) maxDistance = distanceTravelled;
});
console.log(maxDistance);
