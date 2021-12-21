const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\r\n");

const playerInitialPos = [];
const finalScore = 21;
const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

input.forEach((line) => {
  let startingPos = parseInt(line[line.length - 1]);
  playerInitialPos.push(startingPos);
});

const memo = [];

function wins(p1Score, p1Pos, p2Score, p2Pos, p1Turn) {
  if (memo[[p1Score, p1Pos, p2Score, p2Pos, p1Turn]] !== undefined)
    return memo[[p1Score, p1Pos, p2Score, p2Pos, p1Turn]];
  if (p1Score >= finalScore) {
    memo[[p1Score, p1Pos, p2Score, p2Pos, p1Turn]] = [1, 0];
    return [1, 0];
  }
  if (p2Score >= finalScore) {
    memo[[p1Score, p1Pos, p2Score, p2Pos, p1Turn]] = [0, 1];
    return [0, 1];
  }
  let totalWins = [0, 0];

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        if (!p1Turn) {
          const newPos = board[(p2Pos + i + j + k - 1) % 10];
          const currWin = wins(
            p1Score,
            p1Pos,
            p2Score + newPos,
            newPos,
            !p1Turn
          );
          totalWins = [totalWins[0] + currWin[0], totalWins[1] + currWin[1]];
        } else {
          const newPos = board[(p1Pos + i + j + k - 1) % 10];
          const currWin = wins(
            p1Score + newPos,
            newPos,
            p2Score,
            p2Pos,
            !p1Turn
          );
          totalWins = [totalWins[0] + currWin[0], totalWins[1] + currWin[1]];
        }
      }
    }
  }

  memo[[p1Score, p1Pos, p2Score, p2Pos, p1Turn]] = totalWins;
  return totalWins;
}

const winnings = wins(0, playerInitialPos[0], 0, playerInitialPos[1], true);

console.log(Math.max(...winnings));
