const fs = require("fs");

let visited = [];
let horizontal =0;
let vertical =0;

fs.readFile("./2015/03/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  for (let i = 0; i < inputString.length; i++) {
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
    visited.push(`${horizontal} ${vertical}`)
  }
  console.log(visited)
  for(let i =0;i<visited.length;i++) {
    console.log("iteration")
    for(let j = visited.length;j > i+1;j--) {
      console.log(`-----\n${visited[i]}\n${visited[j]}`)
      if(visited[i]==visited[j]) {
        visited.splice(j)
      }
    }
  }
  console.log(visited)
  console.log(visited.length);
});
