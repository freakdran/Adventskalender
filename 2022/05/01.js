const fs = require('fs');

function sortCrates(filename) {
  const input = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n');

  let moves = input.splice(input.indexOf(''));
  moves = moves.slice(1);
  const containers = input.slice(0, input.length - 1);

  const depot = buildDepot(containers);
  moves = buildMoves(moves);
  moves.forEach((move) => {
    for (let i = 0; i < move.number; i++) {
      depot[move.to].push(depot[move.from].pop());
    }
  });

  let result = '';
  depot.forEach((column) => {
    result += column[column.length - 1].replace(/\[(\w{1})\]/, '$1');
  });

  return result;
}

function buildMoves(moves) {
  let builtMoves = [];

  moves.forEach((move) => {
    builtMoves.push(
      move.replace('move ', '').replace(' from ', ',').replace(' to ', ',')
    );
  });
  builtMoves = builtMoves.map((x) => {
    const a = x.split(',');
    return { number: a[0], from: a[1] - 1, to: a[2] - 1 };
  });
  return builtMoves;
}

function buildDepot(containers) {
  let depotLines = containers;

  do {
    depotLines.forEach((container, index) => {
      depotLines[index] = container
        .replace(/ {4}\[/, '[-] [')
        .replace(/] {4}/, '] [-]')
        .replace(/ {5}/, ' [-] ');
    });
  } while (depotLines.filter((x) => x.includes('  ')).length > 0);
  depotLines = depotLines.map((x) =>
    x.split(' ').map((y) => y.replace('[-]', ''))
  );

  let depot = depotLines[0].map((_, colIndex) =>
    depotLines.map((row) => row[colIndex])
  );

  depot = depot.map((row) => row.reverse().filter((n) => n));

  return depot;
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', sortCrates('testInput.txt'));
  console.log('  Real: ', sortCrates('input.txt'));
}

module.exports = {
  run,
};
