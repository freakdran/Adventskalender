const fs = require("fs");

let scans;
let paths = [];
let nodes = [];

// fs.readFile("./2021/12/input2.txt", "utf8", (err, inputString) => {
fs.readFile("input2.txt", "utf8", (err, inputString) => {
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

        moveToDestination(path, dest);
      });
    }
  });

  console.log(paths.length);
});

function moveToDestination(path, destination) {
  if (destination.name === "end") {
    let t = path.slice(0);
    t.push(destination.name);
    paths.push(t);
  } else {
    let t = path.slice(0);
    t.push(destination.name);
    destination.destinations = deleteVisited(
      t,
      destination.destinations.slice(0)
    );

    if (destination.destinations.length > 0) {
      destination.destinations.forEach(x => {
        let dest = JSON.parse(
          JSON.stringify(nodes[nodes.findIndex(node => node.name === x)])
        );
        moveToDestination(t, dest);
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

// start,A,b,A,c,A,end
// start,b,A,c,A,end
