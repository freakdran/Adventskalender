const fs = require("fs");

let floor = 0;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  for (let i = 0; i < inputString.length; i++) {
    switch (inputString[i]) {
      case ")":
        floor--;
        break;
      case "(":
        floor++;
        break;
      default:
        return;
    }
  }
  console.log(floor);
});
