const fs = require("fs");
const Reindeer = require("./Reindeer.js");

const inputs = fs.readFileSync("input.txt", "utf8").split("\r\n");

let reindeers = inputs.map((input) => {
  input = input.split(" ");
  let reindeer = new Reindeer(
    input[0],
    parseInt(input[3]),
    parseInt(input[6]),
    parseInt(input[13])
  );
  return reindeer;
});

const racetime = 2503;

for (let i = 0; i < racetime; i++) {
  reindeers.forEach((reindeer) => {
    if (reindeer.sprinting > 0) {
      reindeer.position += reindeer.speed;
      reindeer.sprinting -= 1;
      if (reindeer.sprinting === 0) {
        reindeer.resting = reindeer.restTime;
      }
    } else if (reindeer.resting > 0) {
      reindeer.resting -= 1;
      if (reindeer.resting === 0) {
        reindeer.sprinting = reindeer.sprintTime;
      }
    } else {
      console.log("This one is unfortunately dead");
    }
  });
  let first = Math.max.apply(
    Math,
    reindeers.map(function (o) {
      return o.position;
    })
  );

  reindeers
    .filter((x) => x.position === first)
    .forEach((reindeer) => (reindeer.points += 1));
}

let first = Math.max.apply(
  Math,
  reindeers.map(function (o) {
    return o.points;
  })
);
console.log(first);
