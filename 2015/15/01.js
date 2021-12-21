const fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf8").split("\r\n");
// const inputs = fs.readFileSync("./2015/15/input.txt", "utf8").split("\r\n");

let incredients = inputs.map((input) => {
  return (inc = [...input.matchAll(/-{0,1}\d+/g)].map((x) => x[0]));
});
console.log(incredients);
let maxScore = 0;
for (let i = 0; i <= 100; i++) {
  for (let j = 0; j <= 100 - i; j++) {
    for (let k = 0; k <= 100 - i - j; k++) {
      for (let l = 0; l <= 100 - i - j - k; l++) {
        if (i + j + k + l === 100) {
          let score = getScore([i, j, k, l]);
          if (score > maxScore) maxScore = score;
        }
      }
    }
  }
}
console.log(maxScore);
function getScore(incrPart) {
  let cookie = [0, 0, 0, 0];
  incredients.forEach((incredient, index) => {
    for (let i = 0; i < cookie.length; i++) {
      cookie[i] += incredient[i] * incrPart[index];
    }
  });
  if (cookie.find((x) => x < 0)) {
    return 0;
  } else {
    return cookie.reduce((pv, cv) => pv * cv, 1);
  }
}
