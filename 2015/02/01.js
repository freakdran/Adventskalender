const fs = require("fs");

let packages;
let paper = 0;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  packages = inputString.split("\r\n");
  packages.forEach((gift, index) => {
    packages[index] = gift.split("x").map(x => parseInt(x));
  });
  console.log(paper);
  packages.forEach(gift => {
    let A = gift[0] * gift[1];
    let B = gift[0] * gift[2];
    let C = gift[1] * gift[2];
    let smallest = findSmallest(A, B, C);
    let neededPaperForGift = 2 * A + 2 * B + 2 * C + smallest;
    paper += neededPaperForGift;
  });

  console.log(paper);
});

function findSmallest(A, B, C) {
  // if (A > C) {
  //   if (B > C) {
  //     return C;
  //   } else {
  //     return B;
  //   }
  // } else {
  //   if (A > B) {
  //     return B;
  //   } else {
  //     return A;
  //   }
  // }
  if (A <= B && A <= C) return A;
  if (B <= A && B <= C) return B;
  if (C <= A && C <= B) return C;
}
