const fs = require("fs");

let visited = [];
let horizontal =0;
let vertical =0;

fs.readFile("./2015/03/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  for (let i = 0; i < inputString.length; i++) {
    if(!checkVisited()) {
      visited.push(`${vertical} ${horizontal}`)
    }
    switch (inputString[i]) {
      case "^":
       vertical++
        break;
      case "v":
        vertical--;
        break;
      case "<":
       horizontal--;
        break;
      case ">":
        horizontal++;
        break;
      default:
        console.log('err')
        return;
    }
  }
  console.log(visited.length)
});

function checkVisited() {
  if(visited.length === 0) return false
  let checkFor = `${vertical} ${horizontal}`
  let alreadyVisited = false
  for( let i =0; i<visited.length;i++) {
    if(visited[i] === checkFor) alreadyVisited = true
  }
  return alreadyVisited
}