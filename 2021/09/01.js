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

  let solution = 0;
  for (let i = 0; i < lowestPositions.length; i++) {
    solution += lowestPositions[i].value + 1;
  }

  // {x, y, value}
  console.log(lowestPositions);
  console.log(solution);
});
