const fs = require("fs");

let scans;
let paths = [];
let nodes = [];

// fs.readFile("./2021/12/input2.txt", "utf8", (err, inputString) => {
fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  scans = inputString.split("\r\n");
  buildNodes();

  nodes.forEach(node => {
    if (node.name === "start") {
      let path = [node.name];
      node.destinations.forEach(destination => {
        let dest = JSON.parse(
          JSON.stringify(
            nodes[nodes.findIndex(node => node.name === destination)]
          )
        );

        moveToDestination(path, dest, 0);
      });
    }
  });
  let falsePathes = visitedChecker();
  console.log(falsePathes);
  console.log(paths.length);
  console.log(paths.length - falsePathes);
});

function moveToDestination(path, destination, visited) {
  if (destination.name === "end") {
    let t = path.slice(0);
    t.push(destination.name);
    paths.push(t);
  } else {
    let t = path.slice(0);
    if (visited > 0) {
      t.push(destination.name);
      destination.destinations = deleteVisited(
        t,
        destination.destinations.slice(0)
      );
    } else {
      t.push(destination.name);
      if (
        destination.name.toLowerCase() === destination.name &&
        path.findIndex(x => x === destination.name) >= 0
      )
        visited++;
    }

    if (destination.destinations.length > 0) {
      destination.destinations.forEach(x => {
        let dest = JSON.parse(
          JSON.stringify(nodes[nodes.findIndex(node => node.name === x)])
        );
        if (x !== "start") moveToDestination(t, dest, visited);
      });
    }
  }
}

function deleteVisited(path, destinations) {
  path.forEach(visited => {
    let i = destinations.findIndex(
      destination => destination.toLowerCase() === visited
    );
    if (i >= 0) {
      destinations.splice(i, 1);
    }
  });

  return destinations;
}

function buildNodes() {
  scans.forEach(scan => {
    let temp = scan.split("-");
    let indexOf = nodes.findIndex(node => node.name === temp[0]);
    if (indexOf >= 0) {
      nodes[indexOf].destinations.push(temp[1]);
    } else {
      nodes.push({ name: temp[0], destinations: [temp[1]] });
    }
    indexOf = nodes.findIndex(node => node.name === temp[1]);
    if (indexOf >= 0) {
      nodes[indexOf].destinations.push(temp[0]);
    } else {
      nodes.push({ name: temp[1], destinations: [temp[0]] });
    }
  });
}

function visitedChecker() {
  let falsePathes = 0;
  paths.forEach((path, index) => {
    let v = 0;

    path = path.filter(x => {
      return x.toLowerCase() === x && x !== "start" && x !== "end";
    });
    let a = {};
    path.forEach(x => {
      a[x] = (a[x] || 0) + 1;
    });

    for (const [key, value] of Object.entries(a)) {
      if (value >= 2) v++;
    }
    if (v > 1) {
      // console.log(`ERROR AT ${index}`);
      falsePathes++;
    }
  });
  return falsePathes;
}
