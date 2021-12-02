const fs = require("fs");

let course;
let aim = 0,
  height = 0,
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
        height += parseInt(course[a][1]) * aim;
        break;
      case "up":
        aim -= parseInt(course[a][1]);
        break;
      case "down":
        aim += parseInt(course[a][1]);
        break;
      default:
        return -1;
    }
  }

  console.log(`Final Position: ${position}
Final Height: ${height}
Ergebnis: ${height * position}`);
}
