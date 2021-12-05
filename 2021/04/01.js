const fs = require("fs");

let boards = []
let won = false;


let winner, winningNumber;

fs.readFile("./2021/04/input.txt", "utf8", (err, inputString) => {
  if (err) {
    throw err;
  }
  
  let arr = inputString.split("\n")
  arr = removeEmpty(arr)
  let bingoNumbers = arr[0].split(',')
  for(let i = 1; i<arr.length; i+=5) {
    boards.push(buildBoard(arr, i))
  }
  for(let i =0; i<bingoNumbers.length;i++) {
    if(!won) {
      boards.forEach((board,index) => {
        boards[index] = removeNumber(board, bingoNumbers[i])
        checkWin(boards[index], index, bingoNumbers[i])
      })
    }
  }
  let leftovers = addWinnerLeftovers(boards[winner])
  console.log(leftovers + " * " + winningNumber);
  console.log(leftovers*winningNumber)
});

function removeEmpty(arr) {
  newArr =[]
  for(let i = 0; i < arr.length; i++) {
    if( arr[i] !== '' ) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}

function buildBoard(arr, start) {
  let newBoard = []
  for(let i = 0; i<5;i++) {
    let row = arr[start+i].split(' ')
    row = removeEmpty(row)
    newBoard.push(row)
  }
  for(let i = 0; i < newBoard[0].length; i++) {
    let col =[]
    col.push(newBoard[0][i])
    col.push(newBoard[1][i])
    col.push(newBoard[2][i])
    col.push(newBoard[3][i])
    col.push(newBoard[4][i])
    newBoard.push(col)
  }
  return newBoard;
}

function removeNumber(arr, number) {
  let newArr = []
  for(let i = 0; i<arr.length; i++) {
    let newElement =[]
    for(let j = 0; j<arr[i].length;j++){
      if(arr[i][j]!==number) {
        newElement.push(arr[i][j])
      }
    }
    newArr.push(newElement)
  }
  return newArr
}

function checkWin (arr, winnerBoard, number) {
  arr.forEach(e => {
    if(e.length ===0) { 
      winner=winnerBoard;
      winningNumber = number;
      won = true;
    }
  })
}

function addWinnerLeftovers (arr) {
  let added = 0;
  for(let i = 0; i<5;i++) {
    let currentRow = arr[i];
    for(let j = 0;j<currentRow.length;j++) {
      added += parseInt(currentRow[j])
    }
    
  }
  return added
  
}