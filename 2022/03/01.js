const fs = require('fs');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getWrongPriorities(filename) {
  const rucksacks = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n')
    .map((rucksack) => {
      return [
        rucksack.substring(0, rucksack.length / 2),
        rucksack.substring(rucksack.length / 2),
      ];
    });

  let summedPriorities = 0;
  rucksacks.forEach((rucksack) => {
    summedPriorities += getFaultyPriority(rucksack);
  });

  return summedPriorities;
}

function getFaultyPriority(rucksack) {
  const itemsLeft = rucksack[0].split('');
  const itemsRight = rucksack[1];
  let wrongItem;
  itemsLeft.forEach((item) => {
    if (itemsRight.includes(item)) {
      wrongItem = item
    }
  });

  return priority.indexOf(wrongItem)+1
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', getWrongPriorities('testInput.txt'));
    console.log('  Real: ', getWrongPriorities('input.txt'));
}

module.exports = {
  run,
};
