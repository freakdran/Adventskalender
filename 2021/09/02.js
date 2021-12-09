const fs = require("fs");

let heightmap;

// fs.readFile("./2021/09/input.txt", "utf8", (err, inputString) => {
fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  heightmap = inputString.split("\r\n").map(singleInput => {
    return singleInput.split("").map(singleNumberString => {
      return parseInt(singleNumberString);
    });
  });

  borderHeightmap();

  let lowestPositions = findLowest();
  let basins = [];

  for (let i = 0; i < lowestPositions.length; i++) {
    let basin = countBasins(lowestPositions[i].x, lowestPositions[i].y);
    basin = checkForDuplicates(basin);
    basins.push(basin);
  }

  basins.sort();

  let solution =
    basins[basins.length - 1].length *
    basins[basins.length - 2].length *
    basins[basins.length - 3].length;
  console.log(solution);
});

function countBasins(x, y, basins = []) {
  if (heightmap[x][y] !== 9) {
    let up = false,
      down = false,
      left = false,
      right = false;
    basins.push({ x: x, y: y });
    for (let i = 0; i < basins.length; i++) {
      if (basins[i].x === x + 1 && basins[i].y === y) up = true;
      if (basins[i].x === x - 1 && basins[i].y === y) down = true;
      if (basins[i].x === x && basins[i].y === y - 1) left = true;
      if (basins[i].x === x && basins[i].y === y + 1) right = true;
    }
    if (!up) countBasins(x + 1, y, basins);
    if (!down) countBasins(x - 1, y, basins);
    if (!right) countBasins(x, y + 1, basins);
    if (!left) countBasins(x, y - 1, basins);
  }
  return basins;
}

function findLowest() {
  let lowestPositions = [];
  for (let x = 0; x < heightmap.length; x++) {
    for (let y = 0; y < heightmap[x].length; y++) {
      let positionValue = heightmap[x][y];

      if (x === 0) {
        if (y === 0) {
          if (
            positionValue < heightmap[x + 1][y] &&
            positionValue < heightmap[x][y + 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        } else if (y === heightmap[x].length - 1) {
          if (
            positionValue < heightmap[x + 1][y] &&
            positionValue < heightmap[x][y - 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        } else if (y !== 0 && y !== heightmap[x].length - 1) {
          if (
            positionValue < heightmap[x + 1][y] &&
            positionValue < heightmap[x][y + 1] &&
            positionValue < heightmap[x][y - 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        }
      } else if (x === heightmap.length - 1) {
        if (y === 0) {
          if (
            positionValue < heightmap[x - 1][y] &&
            positionValue < heightmap[x][y + 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        } else if (y === heightmap[x].length - 1) {
          if (
            positionValue < heightmap[x - 1][y] &&
            positionValue < heightmap[x][y - 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        } else if (y !== 0 && y !== heightmap[x].length - 1) {
          if (
            positionValue < heightmap[x - 1][y] &&
            positionValue < heightmap[x][y + 1] &&
            positionValue < heightmap[x][y - 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        }
      } else if (y === 0) {
        if (x !== 0 && x !== heightmap.length - 1) {
          if (
            positionValue < heightmap[x + 1][y] &&
            positionValue < heightmap[x - 1][y] &&
            positionValue < heightmap[x][y + 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        }
      } else if (y === heightmap[x].length - 1) {
        if (x !== 0 && x !== heightmap.length - 1) {
          if (
            positionValue < heightmap[x + 1][y] &&
            positionValue < heightmap[x - 1][y] &&
            positionValue < heightmap[x][y - 1]
          ) {
            lowestPositions.push({ x: x, y: y, value: positionValue });
          }
        }
      } else {
        if (
          positionValue < heightmap[x + 1][y] &&
          positionValue < heightmap[x - 1][y] &&
          positionValue < heightmap[x][y + 1] &&
          positionValue < heightmap[x][y - 1]
        ) {
          lowestPositions.push({ x: x, y: y, value: positionValue });
        }
      }
    }
  }
  return lowestPositions;
}

function checkForDuplicates(basin) {
  let cleanBasin = [];
  cleanBasin.push(basin[0]);
  for (let i = 0; i < basin.length; i++) {
    let notFound = true;
    for (let j = 0; j < cleanBasin.length; j++) {
      if (basin[i].x === cleanBasin[j].x && basin[i].y === cleanBasin[j].y) {
        notFound = false;
      }
    }
    if (notFound) cleanBasin.push(basin[i]);
  }
  return cleanBasin;
}

function borderHeightmap() {
  let arr = [];
  for (let i = 0; i < heightmap.length; i++) {
    heightmap[i].splice(0, 0, 9);
    heightmap[i].push(9);
  }
  for (let i = 0; i < heightmap[0].length; i++) {
    arr.push(9);
  }
  heightmap.splice(0, 0, arr);
  heightmap.push(arr);
}
