const fs = require('fs');

function findBestElf(filename) {
  const elves = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n')
    .map(function (singleScan) {
      return parseInt(singleScan);
    })
    .join(',')
    .split(',NaN,');

  elves.forEach((elf, index) => {
    elves[index] = elf
      .split(',')
      .map((ration) => parseInt(ration))
      .reduce((a, b) => a + b, 0);
  });

  elves.sort((a, b) => (a < b ? 1 : -1));

  return elves[0] + elves[1] + elves[2];
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', findBestElf('testInput.txt'));
  console.log('  Real: ', findBestElf('input.txt'));
}

module.exports = {
  run,
};
