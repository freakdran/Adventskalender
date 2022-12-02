const fs = require('fs');

const Outcome = {
  X: 0,
  Y: 3,
  Z: 6,
};

const Move = {
  AX: 3,
  AY: 1,
  AZ: 2,
  BX: 1,
  BY: 2,
  BZ: 3,
  CX: 2,
  CY: 3,
  CZ: 1,
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
    result += Outcome[step[1]] + Move[step];
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
