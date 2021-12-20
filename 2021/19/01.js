const fs = require("fs");

let unformattedInput = fs
  .readFileSync("input2.txt", { encoding: "utf8" })
  .split("\r\n\r\n");
unformattedInput = unformattedInput.map(x => {
  return x.split("\r\n");
});

let scanners = [];
let overlaps = [];
buildScanners();
// console.log(scanners[0]);
scanners[0].pos = [0, 0, 0];
// console.log(scanners[0]);
compareDistances(scanners[0], scanners[1]);
// overlaps[0].sameBeacons.forEach(x => console.log(x));

scanners.forEach((scanner, index) => {
  for (let i = index + 1; i < scanners.length; i++) {
    //vergleiche alle beacon distances
  }
});

// console.log(scanners[0].beacons[0].pos);

function buildScanners() {
  unformattedInput.forEach(x => {
    let scanner = { name: x[0], beacons: [] };
    for (let i = 1; i < x.length; i++) {
      scanner.beacons.push({ pos: x[i].split(",") });
    }
    scanner.beacons = buildBeacons(scanner.beacons);
    scanners.push(scanner);
  });
}

function buildBeacons(beacons) {
  beacons.forEach((beacon, index) => {
    beacon.otherBeacons = [];
    for (let i = 0; i < beacons.length; i++) {
      if (i !== index) {
        let t = new Array(3);
        t[0] = beacon.pos[0] - beacons[i].pos[0];
        t[1] = beacon.pos[1] - beacons[i].pos[1];
        t[2] = beacon.pos[2] - beacons[i].pos[2];
        dist = getDistance(t);
        beacon.otherBeacons.push({ pos: t, distance: dist });
      }
    }
  });
  return beacons;
}

function getDistance(v) {
  return parseFloat(
    Math.sqrt(
      Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2)
    ).toFixed(5)
  );
}

function compareDistances(scanner1, scanner2) {
  let sameSame = [];
  for (let i = 0; i < scanner1.beacons.length; i++) {
    for (let j = 0; j < scanner2.beacons.length; j++) {
      for (let ii = 0; ii < scanner1.beacons[i].otherBeacons.length; ii++) {
        for (let jj = 0; jj < scanner2.beacons[j].otherBeacons.length; jj++) {
          if (
            scanner1.beacons[i].otherBeacons[ii].distance ===
            scanner2.beacons[j].otherBeacons[jj].distance
          ) {
            if (
              !sameSame.find(
                x =>
                  x.bc1 === scanner1.beacons[i].pos &&
                  x.bc2 === scanner2.beacons[j].pos
              )
            ) {
              sameSame.push({
                bc1: scanner1.beacons[i].pos,
                bc2: scanner2.beacons[j].pos
              });
            }
          }
        }
      }
    }
  }
  overlaps.push({
    sc1: scanner1.name,
    sc2: scanner2.name,
    sameBeacons: [sameSame]
  });
}

const ot = require("./others.js");
ot.part1("input");
