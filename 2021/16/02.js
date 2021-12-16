const fs = require("fs");

const types = ["sum", "mult", "min", "max", "lit", "big", "small", "eq"];

// let hex = fs.readFileSync("./2021/16/input2.txt", { encoding: "utf8" });
let hex = fs.readFileSync("input.txt", { encoding: "utf8" });

let binary = "";
for (let i = 0; i < hex.length; i++) {
  binary += parseInt(hex[i], 16)
    .toString(2)
    .padStart(4, "0");
}

let allValue = processA(binary);
console.log(allValue.value);

function processA(binary) {
  let version = binary.substring(0, 3);

  let type = parseInt(binary.substring(3, 6), 2);
  // console.log(binary);
  binary = binary.substring(6);
  // console.log(binary);

  if (type === 4) {
    let { index, value } = process4(binary);
    index += 6;
    return { index: index, value: value };
  } else {
    if (binary[0] === "1") {
      let { index, value } = process1(binary, type);
      index += 6;
      return { index: index, value: value };
    } else {
      let { index, value } = process0(binary, type);
      index += 6;
      return { index: index, value: value };
    }
  }
}

function process0(binary, type) {
  let binaryLength = parseInt(binary.substring(1, 16), 2);
  let pIndex = 16;
  let values = [];

  while (pIndex - 16 < binaryLength) {
    let { index, value } = processA(binary.substring(pIndex));
    pIndex += index;
    values.push(value);
  }
  let value = processValues(values, type);
  return { index: pIndex, value: value };
}
function process1(binary, type) {
  let numberOfSubpackages = parseInt(binary.substring(1, 12), 2);
  let pIndex = 12;
  let values = [];

  for (let i = 0; i < numberOfSubpackages; i++) {
    let { index, value } = processA(binary.substring(pIndex));
    pIndex += index;
    values.push(value);
  }
  let value = processValues(values, type);
  return { index: pIndex, value: value };
}

function process4(hex) {
  let splitHex = hex.match(/.{1,5}/g) || [];
  let endchar = false;
  let finalBinary = "";
  let index;
  for (let i = 0; !endchar && i < splitHex.length; i++) {
    if (splitHex[i][0] === "0") {
      endchar = true;
      index = (i + 1) * 5;
    }
    finalBinary += splitHex[i].substring(1);
  }
  // console.log(finalBinary);
  // console.log(parseInt(finalBinary, 2));
  return { index: index, value: parseInt(finalBinary, 2) };
}

function processValues(arr, type) {
  switch (type) {
    case 0:
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    case 1:
      let prod = 1;
      for (let i = 0; i < arr.length; i++) {
        prod *= arr[i];
      }
      return prod;
    case 2:
      return Math.min(...arr);
    case 3:
      return Math.max(...arr);
    case 5:
      return arr[0] > arr[1] ? 1 : 0;
    case 6:
      return arr[0] < arr[1] ? 1 : 0;
    case 7:
      return arr[0] === arr[1] ? 1 : 0;
    default:
      console.log(`WRONG TYPE ${type}`);
  }
}
