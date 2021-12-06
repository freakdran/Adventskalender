const fs = require("fs");

let fish = new Array(9);
let days = 256;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  let startFish = inputString.split(",").map(function(singleScan) {
    return parseInt(singleScan);
  });
  initFish(startFish);

  for (let day = 0; day < days; day++) {
    let bornOldFish = fish.shift();

    fish.push(bornOldFish);
    fish[6] += bornOldFish;
  }
  console.log(fish);
  sumFish();
});

function initFish(startFish) {
  for (let i = 0; i < fish.length; i++) {
    fish[i] = 0;
  }
  for (let i = 0; i < startFish.length; i++) {
    switch (startFish[i]) {
      case 0:
        fish[0]++;
        break;
      case 1:
        fish[1]++;
        break;
      case 2:
        fish[2]++;
        break;
      case 3:
        fish[3]++;
        break;
      case 4:
        fish[4]++;
        break;
      case 5:
        fish[5]++;
        break;
      case 6:
        fish[6]++;
        break;
      case 7:
        fish[7]++;
        break;
      case 8:
        fish[8]++;
        break;
      default:
        console.log("Fish out of range");
    }
  }
}

function sumFish() {
  let sum = 0;
  for (let i = 0; i < fish.length; i++) {
    sum += fish[i];
  }
  console.log(sum);
}
