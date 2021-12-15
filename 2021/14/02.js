const fs = require("fs");

let input;
let template, pairs;
let iterations = 40;
let templateKeyValues = {};
let keyTransforms = {};
let first, last;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  input = inputString.split("\r\n");
  template = input[0];
  pairs = input.filter(x => x.includes("->")).map(x => x.split(" -> "));
  first = template[0];
  last = template[template.length - 1];

  buildKeyValues();
  let templatePairs = splitTemplatePairs();

  templatePairs.forEach(pair => {
    templateKeyValues[pair]++;
  });

  for (let i = 0; i < iterations; i++) {
    insertElement();
  }
  countOcc(first);
});

function insertElement() {
  let newValues = {};

  for (const [key, value] of Object.entries(templateKeyValues)) {
    newValues[keyTransforms[key][0]] =
      (newValues[keyTransforms[key][0]] || 0) + value;
    newValues[keyTransforms[key][1]] =
      (newValues[keyTransforms[key][1]] || 0) + value;
  }
  templateKeyValues = newValues;
}

function countOcc(first) {
  let a = {};

  for (const [key, value] of Object.entries(templateKeyValues)) {
    a[key[0]] = (a[key[0]] || 0) + value;
    a[key[1]] = (a[key[1]] || 0) + value;
  }

  let min, max;
  for (const [key, value] of Object.entries(a)) {
    a[key] = Math.floor(value / 2);
  }

  a[first] = a[first] ? a[first] + 1 : 0;
  a[last] = a[last] ? a[last] + 1 : 0;

  for (const [key, value] of Object.entries(a)) {
    if (!max && !min) {
      max = a[key];
      min = a[key];
    }
    if (value > max) max = value;
    if (value < min) min = value;
  }

  console.log(a);
  console.log(`${max} - ${min} = ${max - min}`);
}

function buildKeyValues() {
  pairs.forEach(pair => {
    templateKeyValues[pair[0]] = 0;
    keyTransforms[pair[0]] = [pair[0][0] + pair[1], pair[1] + pair[0][1]];
  });
}
function splitTemplatePairs() {
  let templatePairs = [];
  for (let i = 0; i < template.length - 1; i++) {
    templatePairs.push(`${template[i]}${template[i + 1]}`);
  }
  return templatePairs;
}
