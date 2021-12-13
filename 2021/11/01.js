const fs = require("fs");

let octopi;
let allFlashes = 0;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  octopi = inputString.split("\r\n").map(function(singleScan) {
    return singleScan.split("").map(octopus => {
      return parseInt(octopus);
    });
  });

  for (let rounds = 0; rounds < 100; rounds++) {
    increaseAllByOne();
    let flashes = checkFlash();
  }
  console.log(allFlashes);
});

function increaseAllByOne() {
  for (let i = 0; i < octopi.length; i++) {
    for (let j = 0; j < octopi[i].length; j++) {
      octopi[i][j]++;
    }
  }
}

function checkFlash() {
  let flashes = [];
  for (let y = 0; y < octopi.length; y++) {
    for (let x = 0; x < octopi[y].length; x++) {
      if (octopi[y][x] > 9) {
        flashes.push({ x: x, y: y });
      }
    }
  }
  if (flashes.length > 0) flashAll(flashes);
}

function flashAll(flashes) {
  flashes.forEach(flash => {
    allFlashes++;
    octopi[flash.y][flash.x] = 0;
    increaseAdjacentsByOne(flash);
  });
  checkFlash();
}

function increaseAdjacentsByOne(flash) {
  let adjacents = getAdjacents(flash);
  adjacents.forEach(adjacent => {
    if (octopi[adjacent.y][adjacent.x] !== 0) {
      octopi[adjacent.y][adjacent.x]++;
    }
  });
}

function getAdjacents(flash) {
  let adjacents = [];
  adjacents.push({ y: flash.y + 1, x: flash.x });
  adjacents.push({ y: flash.y - 1, x: flash.x });
  adjacents.push({ y: flash.y, x: flash.x + 1 });
  adjacents.push({ y: flash.y, x: flash.x - 1 });
  adjacents.push({ y: flash.y + 1, x: flash.x + 1 });
  adjacents.push({ y: flash.y + 1, x: flash.x - 1 });
  adjacents.push({ y: flash.y - 1, x: flash.x + 1 });
  adjacents.push({ y: flash.y - 1, x: flash.x - 1 });
  adjacents = adjacents.filter(
    a => a.x >= 0 && a.x <= 9 && a.y >= 0 && a.y <= 9
  );
  return adjacents;
}

function printArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(""));
  }
}
