let activeGame = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const playerTurn = () => `${currentPlayer} turn`;

const winMsg = () => `${currentPlayer} is won`;
const drawMsg = () => `Game is draw`;

const winGame = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let playingStatus = document.querySelector(".playing-status");
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClickHandler));

function turnPlayer(){
    playingStatus.innerHTML = playerTurn();    
}


function cellPlayedHandler(cell, idx){
    // Change to O or X
    gameState[idx] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

function changePlayer(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    turnPlayer();
}

function validateGame(){
    let playerWon = false;
    let i = 0;
    for(i; i <= 7; i++){
        const winPosition = winGame[i];
        let a = gameState[winPosition[0]];
        let b = gameState[winPosition[1]];
        let c = gameState[winPosition[2]];

        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a == b && b == c) {
            playerWon = true;
            break
        }
    }

    if (playerWon) {
        playingStatus.innerHTML = winMsg();
        activeGame = false;
        return;
    }

    let gameDraw = gameState.includes("");
    if(!gameDraw){
        playingStatus.innerHTML = drawMsg();
        activeGame = false;
        return;
    }

    changePlayer();
}

// Get cell info
function cellClickHandler(event) {
    if(!activeGame){
        return;
    }

    const cellSelected = event.target;

    const cellSelectedIndex = Number(
        cellSelected.getAttribute('index-of-cell')
    );

    if(gameState[cellSelectedIndex] != ""){
        return
    }

    cellPlayedHandler(cellSelected, cellSelectedIndex);
    validateGame();
}

// Restart game state
function restartGame() {
    activeGame = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    turnPlayer();

    // reset all cell
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}