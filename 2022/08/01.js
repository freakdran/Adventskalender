const fs = require('fs');

function main(filename) {
  const input = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n')
    .map((row) => row.split(''));

  const forestSize = input.length;
  let visibleTrees = forestSize * 4 - 4;

  for (let i = 1; i < forestSize - 1; i++) {
    for (let j = 1; j < forestSize - 1; j++) {
      let visibleN = true;
      let visibleW = true;
      let visibleS = true;
      let visibleE = true;

      for (let walker = 0; walker < forestSize; walker++) {
        if (walker < j && input[i][j] <= input[i][walker]) {
          visibleW = false;
        }
        if (walker > j && input[i][j] <= input[i][walker]) {
          visibleE = false;
        }
        if (walker < i && input[i][j] <= input[walker][j]) {
          visibleN = false;
        }
        if (walker > i && input[i][j] <= input[walker][j]) {
          visibleS = false;
        }
      }

      if (visibleE || visibleW || visibleN || visibleS) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', main('testInput.txt'));
  console.log('  Real: ', main('input.txt'));
}

module.exports = {
  run,
};
