const fs = require('fs');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getCompleteOverlaps(filename) {
  const pairs = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n')
    .map((pair) => pair.split(',').map((elf) => elf.split('-').map(Number)));

  const overlapping = pairs.filter(
    ([a, b]) => (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])
  );
  return overlapping.length;
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', getCompleteOverlaps('testInput.txt'));
  console.log('  Real: ', getCompleteOverlaps('input.txt'));
}

module.exports = {
  run,
};
