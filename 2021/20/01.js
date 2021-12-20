const fs = require("fs");
// Care if not using windows or other random stuff and delete \r ;D
let input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let imageAlgorithm = input[0];
let originalImage = [];
for (let i = 2; i < input.length; i++) {
  originalImage.push(input[i]);
}

// Border original image twice at the beginning with '.' as the first border gets changed as well while second does not
let borderedImage = borderImage(borderImage(originalImage, "."), ".");

// Part 1
iterateNTimes(2, borderedImage);
// Part 2
iterateNTimes(50, borderedImage);

// Enhances image n times while always applying a new border
function iterateNTimes(n, img) {
  for (let i = 0; i < n; i++) {
    img = enhanceImage(img);
    img = borderImage(img, img[0][0]);
  }
  console.log(countLights(img));
}

function enhanceImage(img) {
  let newImg = [];
  let nextBorder;
  // Check if border will change the next iteration to already apply it for later use
  if (img[0][0] === ".") {
    img[0][0] === imageAlgorithm[0] ? (nextBorder = ".") : (nextBorder = "#");
  } else {
    img[0][0] === imageAlgorithm[imageAlgorithm.length - 1]
      ? (nextBorder = "#")
      : (nextBorder = ".");
  }
  newImg.push(nextBorder.repeat(img[0].length));

  for (let i = 1; i < img.length - 1; i++) {
    let newRow = `${nextBorder}`;
    for (let j = 1; j < img[i].length - 1; j++) {
      let binary = "";
      binary += img[i - 1][j - 1] === "#" ? 1 : 0;
      binary += img[i - 1][j] === "#" ? 1 : 0;
      binary += img[i - 1][j + 1] === "#" ? 1 : 0;
      binary += img[i][j - 1] === "#" ? 1 : 0;
      binary += img[i][j] === "#" ? 1 : 0;
      binary += img[i][j + 1] === "#" ? 1 : 0;
      binary += img[i + 1][j - 1] === "#" ? 1 : 0;
      binary += img[i + 1][j] === "#" ? 1 : 0;
      binary += img[i + 1][j + 1] === "#" ? 1 : 0;
      newRow += imageAlgorithm[parseInt(binary, 2)];
    }
    newRow += nextBorder;
    newImg.push(newRow);
  }
  newImg.push(nextBorder.repeat(img[0].length));
  return newImg;
}

function borderImage(img, border) {
  let newImage = [];
  let newEmpty = border.repeat(img[0].length + 2);

  for (let i = 0; i < img.length; i++) {
    newImage.push(`${border}${img[i]}${border}`);
  }
  newImage.push(newEmpty);
  newImage.unshift(newEmpty);

  return newImage;
}

function countLights(img) {
  let c = 0;
  for (let i = 1; i < img.length - 1; i++) {
    for (let j = 1; j < img[i].length - 1; j++) {
      if (img[i][j] === "#") c++;
    }
  }
  return c;
}
