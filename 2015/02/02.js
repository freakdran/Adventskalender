const fs = require("fs");

let packages;
let ribbon = 0;

fs.readFile("./2015/02/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  //packages = inputString.split("\r\n");
  packages = inputString.split("\n");
  packages.forEach((gift, index) => {
    packages[index] = gift.split("x").map(x => parseInt(x));
  });
  packages.forEach((gift, index) => {
   if(gift[0]>=gift[1]&&gift[0]>=gift[2]){
    ribbon += (gift[1]+gift[2])*2
   }else
   if(gift[1]>=gift[0]&&gift[1]>=gift[2]){
     ribbon += (gift[0]+gift[2])*2
   }else {
     ribbon += (gift[0]+gift[1])*2
   }

   ribbon+=gift[0] *gift[1] *gift[2]

  });

  console.log(ribbon);
});
