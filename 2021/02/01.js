const fs = require("fs");

let course;
let height = 0,
  position = 0;

fs.readFile("input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }

  course = inputString.split("\r\n").map(item => {
    return item.split(" ");
  });

  walkTheSea();
});

function walkTheSea() {
  for (let a = 0; a < course.length; a++) {
    switch (course[a][0]) {
      case "forward":
        position += parseInt(course[a][1]);
        break;
      case "up":
        height -= parseInt(course[a][1]);
        break;
      case "down":
        height += parseInt(course[a][1]);
        break;
      default:
        return -1;
    }
  }

  console.log(`Ergebnis: ${height * position}`);
}
