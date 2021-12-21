let newCharArray = [];
let input = "hxbxwxba";
let str = input;

while (str.length < 9 && !check(str)) {
  str = incrementChar(str);
}
console.log("New password 1: " + str);
let str2 = incrementChar(str);
while (str2.length < 9 && !check(str2)) {
  str2 = incrementChar(str2);
}
console.log("New password 2: " + str2);

function check(str) {
  return rule1(str) && rule2(str);
}

function rule1(str) {
  for (let i = 0; i < str.length - 2; i++) {
    if (
      str[i] < "y" &&
      incrementChar(str[i]) === str[i + 1] &&
      incrementChar(incrementChar(str[i])) === str[i + 2]
    ) {
      return true;
    }
  }

  return false;
}
function rule2(str) {
  return [...str.matchAll(/(.)\1/g)].length >= 2;
}

function nextLetter(char) {
  let temp = char === "z" ? "a" : String.fromCharCode(char.charCodeAt(0) + 1);
  if (temp === "i" || temp === "o" || temp === "l") {
    temp = String.fromCharCode(temp.charCodeAt(0) + 1);
  }

  return temp;
}
function incrementChar(l) {
  const lastChar = l[l.length - 1];
  const remString = l.slice(0, l.length - 1);
  const newChar = lastChar === undefined ? "a" : nextLetter(lastChar);
  newCharArray.unshift(newChar);

  if (lastChar === "z") {
    return incrementChar(remString);
  }
  const batchString = remString + [...newCharArray].join("");
  newCharArray = [];
  return batchString;
}
