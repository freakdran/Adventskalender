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
        if (floor < 0) {
          console.log(i + 1);
          return;
        }
        break;
      case "(":
        floor++;
        break;
      default:
        return;
    }
  }
});
