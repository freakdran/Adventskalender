const fs = require("fs");

let player1 = { score: 0 };
let player2 = { score: 0 };
let dice = 0;
let rolls = 0;
let input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");
player1.position = parseInt(input[0][input[0].length - 1]);
player2.position = parseInt(input[1][input[1].length - 1]);

while (player1.score < 1000 && player2.score < 1000) {
  roll(player1);
  if (player1.score >= 1000) break;
  roll(player2);
}
console.log("Player 1 score: " + player1.score);
console.log("Player 2 score: " + player2.score);
console.log("Number of rolls: " + rolls);
console.log(
  "Result: " +
    (player1.score < player2.score ? player1.score : player2.score) * rolls
);

function roll(player) {
  let roll = 0;
  if (dice < 98) {
    roll = dice + 1 + dice + 2 + dice + 3;
    dice += 3;
  } else if (dice < 99) {
    roll = dice + 1 + dice + 2 + 1;
    dice = 1;
  } else if (dice < 100) {
    roll = dice + 1 + 1 + 2;
    dice = 2;
  } else {
    roll = 1 + 2 + 3;
    dice = 3;
  }
  let playerPos = player.position + roll;
  playerPos = playerPos % 10 === 0 ? 10 : playerPos % 10;
  player.score += playerPos;
  player.position = playerPos;
  rolls += 3;
  return player;
}
