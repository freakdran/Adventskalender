const fs = require("fs");

let scans;

fs.readFile("input2.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }
  scans = inputString.split("\r\n");
  scans.forEach((scan, index) => {
    scans[index] = scan.replace(" -> ", ",").split(",");
  });
  let largest = findBiggest();
  let map = buildMap(largest);
  for (let i = 0; i < scans.length; i++) {
    map = markVents(map, scans[i]);
  }
  printMap(map);
});

function findBiggest() {
  let biggest = 0;

  scans.forEach(scan => {
    for (let i = 0; i < scan.length; i++) {
      if (scan[i] > biggest) biggest = scan[i];
    }
  });
  return biggest;
}

function buildMap(largest) {
  let map = [];
  for (let i = 0; i <= largest; i++) {
    let mapRow = [];
    for (let j = 0; j <= largest; j++) {
      mapRow.push(0);
    }
    map.push(mapRow);
  }
  return map;
}

function markVents(map, movement) {
  let vertical;
  let position, start, end;

  if (movement[0] === movement[2]) {
    vertical = true;
    position = parseInt(movement[0]);
    if (parseInt(movement[1]) > parseInt(movement[3])) {
      start = parseInt(movement[3]);
      end = parseInt(movement[1]);
    } else {
      start = parseInt(movement[1]);
      end = parseInt(movement[3]);
    }
    map = markStraight(map, position, start, end, true);
  } else if (movement[1] === movement[3]) {
    position = parseInt(movement[1]);
    if (parseInt(movement[0]) > parseInt(movement[2])) {
      start = parseInt(movement[2]);
      end = parseInt(movement[0]);
    } else {
      start = parseInt(movement[0]);
      end = parseInt(movement[2]);
    }
    map = markStraight(map, position, start, end, false);
  } else {
    console.log(movement);
    map = markDiagonally(
      map,
      parseInt(movement[0]),
      parseInt(movement[1]),
      parseInt(movement[2]),
      parseInt(movement[3])
    );
  }
  return map;
}

function markStraight(map, position, start, end, vertical) {
  for (let i = start; i <= end; i++) {
    vertical ? map[i][position]++ : map[position][i]++;
  }
  return map;
}

function markDiagonally(map, startX, startY, endX, endY) {
  console.log(
    "sX: " + startX + " sY: " + startY + " eX: " + endX + " eY: " + endY
  );
  let direction = findDirection(startX, startY, endX, endY);
  console.log(direction);
  switch (direction) {
    case "ul":
    case "dr":
      //map = moveDR(map,startX,startY,endX, endY);
      break;
    case "ur":
    case "dl":
      map = moveUR(map, startX, startY, endX, endY);
      break;
    default:
      console.log("ERROR");
  }
  return map;
}

function moveUR(map, startX, startY, endX, endY) {
  console.log("UR");
  console.log(startX + " " + endX);
  console.log(startY + " " + endY);
  if (startX < endX) {
    let temp = startX;
    startX = endX;
    endX = temp;
    temp = startY;
    startY = endY;
    endY = temp;
  }
  for (let i = startX; i >= endX; i--) {
    for (let j = startY; j <= endY; j++) {
      for (let k = 0; k <= Math.abs(startX - endX); k++) {
        if (i + k === startX && j - k === startY) {
          map[i][j]++;
        }
      }
    }
  }
  return map;
}

function moveDR(map, startX, startY, endX, endY) {
  console.log("DR");
  console.log("unchanged");
  console.log(startX + " " + endX);
  console.log(startY + " " + endY);
  if (startX > endX) {
    let temp = startX;
    startX = endX;
    endX = temp;
    temp = startY;
    startY = endY;
    endY = temp;
  }
  console.log("changed");
  console.log(startX + " " + endX);
  console.log(startY + " " + endY);
  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      for (let k = 0; k <= Math.abs(startX - endX); k++) {
        if (i + k === startX && j - k === startY) {
          map[i][j]++;
        }
      }
    }
  }
  return map;
}

function findDirection(startX, startY, endX, endY) {
  if (startX - endX > 0) {
    if (startY - endY > 0) {
      return "ul";
    } else {
      return "ur";
    }
  } else {
    if (startY - endY > 0) {
      return "dl";
    } else {
      return "dr";
    }
  }
}

function printMap(map) {
  let p = "";
  let danger = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] > 1) danger++;
      p += map[i][j];
    }
    p += "\n";
  }
  console.log(p);
  console.log(danger);
}
