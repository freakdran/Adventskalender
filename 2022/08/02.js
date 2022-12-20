const fs = require('fs');

function main(filename) {
  const input = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n')
    .map((row) => row.split(''));

  const forestSize = input.length;
  let maxScore = 0

  for (let i = 0; i < forestSize; i++) {
    for (let j = 0; j < forestSize; j++) {
      let stopN = i === 0;
      let stopW = j === 0;
      let stopS = i === forestSize - 1;
      let stopE = j === forestSize - 1;

      let scoreN = 0;
      let scoreW = 0;
      let scoreS = 0;
      let scoreE = 0;
      for (
        let walker = 1;
        walker < forestSize && !(stopN && stopW && stopE && stopS);
        walker++
      ) {
        if (!stopN) {
          if (i - walker < 0) {
            stopN = true;
          } else if (input[i - walker][j] < input[i][j]) {
            scoreN++;
          } else {
            scoreN++;
            stopN = true;
          }
        }
        if (!stopW) {
          if (j - walker < 0) {
            stopW = true;
          } else if (input[i][j - walker] < input[i][j]) {
            scoreW++;
          } else {
            scoreW++;
            stopW = true;
          }
        }
        if (!stopS) {
          if (i + walker > forestSize - 1) {
            stopS = true;
          } else if (input[i + walker][j] < input[i][j]) {
            scoreS++;
          } else {
            scoreS++;
            stopS = true;
          }
        }
        if (!stopE) {
          if (j + walker > forestSize - 1) {
            stopE = true;
          } else if (input[i][j + walker] < input[i][j]) {
            scoreE++;
          } else {
            scoreE++;
            stopE = true;
          }
        }
      }

      const score = scoreN * scoreW * scoreS * scoreE;

      if (score > maxScore) {
        maxScore = score;
      }
    }
  }

  return maxScore;
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', main('testInput.txt'));
  console.log('  Real: ', main('input.txt'));
}

module.exports = {
  run,
};
