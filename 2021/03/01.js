const fs = require("fs");

let diagnosis;
let pcounter

fs.readFile("./2021/03/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  diagnosis = inputString.split("\n")
  let numberBits = diagnosis[0].length
  pcounter = initArray(numberBits)
  
  diagnosis.forEach(number => {
    for(let i=0;i<numberBits;i++) {
      if(number[i]==='1') pcounter[i]++
    }
  })
  let gamma = "", delta=""
  for(let i = 0; i<numberBits;i++){
    if(pcounter[i]> diagnosis.length-pcounter[i]) {gamma+=1} else gamma+=0
  }

  delta = changeBit(gamma)
  console.log(gamma)
  console.log(delta)
  console.log(parseInt(gamma, 2)*parseInt(delta,2))
});


function initArray(len) {
  let arr = []
  for(let i = 0;i<len;i++) {
    arr.push(0)
  }
  return arr;
}

function changeBit(str){
  let newStr = ""
  for(let i = 0; i<str.length; i++) {
    if(str[i]==='1') {newStr += 0} else {newStr+=1 }
  }
  return newStr
}