var playerYellow = 'Y';
var playerRed = 'R';
var currentPlayer = playerRed;

var gameOver = false;
let board;

var rows = 6;
var columns = 7;
var currentColumns;
const dropSound = new Audio('./popSound.mp3');

window.onload = function () {
    setGame();
}
function setGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5]
    for (r = 0; r < rows; r++) {
        let row = [];
        for (c = 0; c < columns; c++) {
            row.push(" ");
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
            tile.addEventListener("mouseenter",gethigh);            
            tile.addEventListener("mouseleave",nonhigh);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    
    r = currentColumns[c];
    
    document.getElementById(r.toString() + "-" + c.toString()).classList.remove("specialEffect");
    if (r < 0) {
        return;
    }
    dropSound.play();

    board[r][c] = currentPlayer;

    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerRed) {
        // turn.style.backgroundColor = "yellow";
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
        turns("yellow");
    }
    else {
        // turn.style.backgroundColor = "red";
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;
        turns("red");
    }
    r -= 1;
    currentColumns[c] = r;
    checkWinner()
}
function checkWinner() {
    // horizontally
    
    for (r = 0; r < rows; r++) {
        for (c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // vertically
    for (c = 0; c < columns; c++) {
        for (r = 0; r < rows - 3; r++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //diagonally
    for (r = 0; r < rows - 3; r++) {
        for (c = 0; c < columns - 3; c++) {
            
            if (board[r][c] != " ") {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
                
            }
        }
    }
    // anti diagonally
    for (r = 3; r < rows; r++) {
        for (c = 0; c < columns - 3; c++) {
            console.log("dia : "+r +" - "+ c);
            if (board[r][c] != " ") {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }

            }
        }
    }


}
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
        winner.style.color = "red"
        
        document.querySelector(".turn").innerHTML = "";
    }
    else {
        winner.innerText = "Yellow Wins"
        document.querySelector(".turn").innerHTML="";
        winner.style.color = "#FFD700"
    }
    gameOver = true;
    document.querySelector("#GameOver").style.display="block";
  
}


function turns(color) {
        turn.style.backgroundColor = color;
}


function gethigh() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    
    r = currentColumns[c];
    if (r < 0) {
        return;
    }
document.getElementById(r.toString() + "-" + c.toString()).classList.add("specialEffect");

}

function nonhigh() {  if (gameOver) {
  return;
}
let coords = this.id.split("-")
let r = parseInt(coords[0]);
let c = parseInt(coords[1]);

r = currentColumns[c];
if (r < 0) {
    return;
}
document.getElementById(r.toString() + "-" + c.toString()).classList.remove("specialEffect");
}

function refreshPage() {
    location.reload();
}