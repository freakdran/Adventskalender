const fs = require('fs');

const Move = {
  X: 1,
  Y: 2,
  Z: 3,
};

const Outcome = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
};

function getRPSScore(filename) {
  const guide = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n')
    .map((step) => {
      return step.split(' ').join('');
    });

  let result = 0;
  guide.forEach((step) => {
    result += Outcome[step] + Move[step[1]];
  });

  return result;
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', getRPSScore('testInput.txt'));
  console.log('  Real: ', getRPSScore('input.txt'));
}

module.exports = {
  run,
};
