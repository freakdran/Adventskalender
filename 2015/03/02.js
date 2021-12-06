const fs = require("fs");

let visited = [];
let horizontalSanta =0;
let verticalSanta =0;
let horizontalRobo =0;
let verticalRobo =0;

fs.readFile("./2015/03/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  for (let i = 0; i < inputString.length; i++) {
    if(i%2===0) {
      if(!checkVisitedSanta()) {
        visited.push(`${verticalSanta} ${horizontalSanta}`)
      }
    } else {
      if(!checkVisitedRobo()) {
        visited.push(`${verticalRobo} ${verticalRobo}`)
      }
    }
    switch (inputString[i]) {
      case "^":
        if(i%2===0) {
          verticalSanta++
        } else {
          verticalRobo++
        }
        break;
      case "v":
        if(i%2===0) {
          verticalSanta--
        } else {
          verticalRobo--
        }
        break;
      case "<":
       if(i%2===0) {
          horizontalSanta--
        } else {
          horizontalRobo--
        }
        break;
      case ">":
        if(i%2===0) {
          horizontalSanta++
        } else {
          horizontalRobo++
        }
        break;
      default:
        console.log('err')
        return;
    }
    
    if(i%2===0) {
      if(!checkVisitedSanta()) {
        visited.push(`${verticalSanta} ${horizontalSanta}`)
      }
    } else {
      if(!checkVisitedRobo()) {
        visited.push(`${verticalRobo} ${horizontalRobo}`)
      }
    }
  }
  console.log(visited.length);
});

function checkVisitedSanta() {
  if(visited.length === 0) return false
  let checkFor = `${verticalSanta} ${horizontalSanta}`
  let alreadyVisited = false
  for( let i =0; i<visited.length;i++) {
    if(visited[i] === checkFor) {
      alreadyVisited = true
    }
  }
  return alreadyVisited
}

function checkVisitedRobo() {
  if(visited.length === 0) return false
  let checkFor = `${verticalRobo} ${horizontalRobo}`
  let alreadyVisited = false
  for( let i =0; i<visited.length;i++) {
    if(visited[i] === checkFor) {
      alreadyVisited = true
    }
  }
  return alreadyVisited
}