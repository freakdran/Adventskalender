const fs = require('fs');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getWrongPriorities(filename) {
  const rucksacks = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n');

  const groups = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
  }

  let summedPriorities = 0;
  groups.forEach((group) => {
    summedPriorities += getBadgePriority(group);
  });

  return summedPriorities;
}

function getBadgePriority(rucksack) {
  const elf1 = rucksack[0];
  const elf2 = rucksack[1];
  const elf3 = rucksack[2];
  let elf12 = '';
  for (let i = 0; i < elf1.length; i++) {
    if (elf2.includes(elf1[i])) elf12 += elf1[i];
  }
  let elf123;
  for (let i = 0; i < elf12.length; i++) {
    if (elf3.includes(elf12[i])) elf123 = elf12[i];
  }

  return priority.indexOf(elf123) + 1;
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', getWrongPriorities('testInput.txt'));
  console.log('  Real: ', getWrongPriorities('input.txt'));
}

module.exports = {
  run,
};
