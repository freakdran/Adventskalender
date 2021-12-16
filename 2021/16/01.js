const fs = require("fs");

// let hex = fs.readFileSync("./2021/16/input5.txt", { encoding: "utf8" });
let hex = fs.readFileSync("input.txt", { encoding: "utf8" });
let versionSum = 0;

let binary = "";
for (let i = 0; i < hex.length; i++) {
  binary += parseInt(hex[i], 16)
    .toString(2)
    .padStart(4, "0");
}

processA(binary);
console.log(versionSum);

function processA(binary) {
  let version = binary.substring(0, 3);
  if (version) {
    versionSum += parseInt(version, 2);
  }

  let type = binary.substring(3, 6);

  binary = binary.substring(6);
  if (parseInt(type, 2) === 4) {
    return process4(binary) + 6;
  } else {
    if (binary[0] === "1") {
      return process1(binary) + 6;
    } else {
      return process0(binary) + 6;
    }
  }
}

function process0(binary) {
  let binaryLength = parseInt(binary.substring(1, 16), 2);
  let index = 16;
  // console.log(binaryLength);
  while (index - 16 <= binaryLength) {
    index += processA(binary.substring(index));
  }
  return index;
}
function process1(binary) {
  let numberOfSubpackages = parseInt(binary.substring(1, 12), 2);
  let index = 12;
  for (let i = 0; i < numberOfSubpackages; i++) {
    index += processA(binary.substring(index));
  }
  return index;
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
  return index;
}
