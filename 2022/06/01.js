const fs = require('fs');

function main(filename) {
  const input = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n');


    let result = []
  input.forEach((line) => {
    result.push(workline(line));
  });

  return result.join(', ');
}

function workline(line) {
  let packet = '';
  for (let i = 0; i < line.length; i++) {
    if (packet.length === 4) return i;
    if (packet.includes(line[i])) {
      const doubleCharIndex = packet.indexOf(line[i]);
      packet = packet.substring(doubleCharIndex + 1) + line[i];
    } else {
      packet += line[i];
    }
  }
  console.log(packet);
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', main('testInput.txt'));
  console.log('  Real: ', main('input.txt'));
}

module.exports = {
  run,
};
