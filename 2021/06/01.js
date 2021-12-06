const fs = require("fs");

let fish;
let days = 80;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  fish = inputString.split(",").map(function(singleScan) {
    return parseInt(singleScan);
  });
  for (let day = 0; day < days; day++) {
    let newFish = 0;
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        newFish++;
        fish[i] = 6;
      } else {
        fish[i]--;
      }
    }
    for (let i = 0; i < newFish; i++) {
      fish.push(8);
    }
  }

  console.log(fish.length);
});
