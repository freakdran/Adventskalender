const fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf8").split("\r\n");
// const inputs = fs.readFileSync("./2015/15/input.txt", "utf8").split("\r\n");

let incredients = inputs.map((input) => {
  return (inc = [...input.matchAll(/-{0,1}\d+/g)].map((x) => x[0]));
});
let cookies = [];
for (let i = 0; i <= 100; i++) {
  for (let j = 0; j <= 100 - i; j++) {
    for (let k = 0; k <= 100 - i - j; k++) {
      for (let l = 0; l <= 100 - i - j - k; l++) {
        if (i + j + k + l === 100) {
          bakeCookie([i, j, k, l]);
        }
      }
    }
  }
}
console.log(findBest(cookies));

function bakeCookie(incrPart) {
  let cookie = [0, 0, 0, 0, 0];
  incredients.forEach((incredient, index) => {
    for (let i = 0; i < cookie.length; i++) {
      cookie[i] += incredient[i] * incrPart[index];
    }
  });
  if (cookie[4] <= 500 && cookie.filter((x) => x > 0).length === 5) {
    cookies.push(cookie);
  }
}

function findBest(cookies) {
  let max = 0;
  cookies.forEach((cookie) => {
    cookie.splice(cookie.length - 1, 1);
    let score = cookie.reduce((pv, cv) => pv * cv, 1);
    if (score > max) max = score;
  });
  return max;
}

// return cookie.reduce((pv, cv) => pv * cv, 1);
