const fs = require("fs");

let input;
let template, pairs;
let iterations = 5;

fs.readFile("input2.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  input = inputString.split("\r\n");
  template = input[0];
  pairs = input.filter(x => x.includes("->")).map(x => x.split(" -> "));

  for (let i = 0; i < iterations; i++) {
    let templatePairs = splitTemplatePairs();
    insertPairs(templatePairs);
  }
  countElements();
  console.log(template);
});

function splitTemplatePairs() {
  let templatePairs = [];
  for (let i = 0; i < template.length - 1; i++) {
    templatePairs.push(`${template[i]}${template[i + 1]}`);
  }
  return templatePairs;
}

function insertPairs(templatePairs) {
  let newTemplate = [];
  templatePairs.forEach((pair, index) => {
    for (let i = 0; i < pairs.length; i++) {
      if (pair === pairs[i][0]) {
        if (index === 0) {
          newTemplate.push(
            pair.substring(0, 1) + pairs[i][1] + pair.substring(1, 2)
          );
        } else {
          newTemplate.push(pairs[i][1] + pair.substring(1, 2));
        }
      }
    }
  });
  template = newTemplate.join("");
}

function countElements() {
  let biggest;
  let smallest;
  let a = {};

  for (let i = 0; i < template.length; i++) {
    a[template[i]] = (a[template[i]] || 0) + 1;
  }
  for (const [key, value] of Object.entries(a)) {
    if (!biggest && !smallest) {
      biggest = value;
      smallest = value;
    }
    if (value > biggest) biggest = value;
    if (value < smallest) smallest = value;
  }
  console.log(a);
  console.log(`${biggest} - ${smallest} = ${biggest - smallest}`);
}
