const Part1 = require('./01');
const Part2 = require('./02');

const tests = process.argv[2] === 'true' ? true : false;

console.log('\x1b[32m%s\x1b[0m', 'Day 4:');
console.log('\x1b[34m%s\x1b[0m', ' Part 1:');
Part1.run(tests)
console.log('\x1b[34m%s\x1b[0m', ' Part 2:');
Part2.run(tests)