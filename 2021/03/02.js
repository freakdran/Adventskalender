const fs = require("fs");

let diagnosisGen;
let diagnosisScrub

fs.readFile("./2021/03/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  diagnosisGen = inputString.split("\n");
  diagnosisScrub = inputString.split("\n");
  
  let numberBits = diagnosisGen[0].length
  
  for(let i =0; i<numberBits; i++) {
    let deleteGen = findMost(diagnosisGen, i, true);
    let deleteScrub = findMost(diagnosisScrub, i, false);
    console.log(deleteGen + ' ' + deleteScrub)
    diagnosisGen = removeFalse(diagnosisGen, i, deleteGen);
    diagnosisScrub = removeFalse(diagnosisScrub, i, deleteScrub);
  }
  console.log(parseInt(diagnosisGen[0], 2)*parseInt(diagnosisScrub[0],2))
});


function findMost(arr, index, most = true) {
  let one = 0, zero =0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i][index] === "0") {
      zero++
    } else {
      one++
    }
  }
  if(most) {
    if(one >= zero) {
      return "0"
    } else {
      return "1"
    }
  } else {
    if(one >= zero) {
      return "1"
    } else {
      return "0"
    }
  }
}

function removeFalse(arr, index, rightKey) {
  let newArr = []
  
  if(arr.length === 1) return arr
  
  for(let i = 0; i<arr.length; i++) {
    if(arr[i][index]!== rightKey) { newArr.push(arr[i])
    }
  }
  return newArr;
}