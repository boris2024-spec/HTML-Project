// Инициализация переменных
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
let currentPlayer = "X";

let gameActive = true;
const gameState = ["", "", "", "", "", "", "", "", ""]; 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return; 
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
}


function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `${currentPlayer} Win!`;
        gameActive = false; 
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        status.textContent = "Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`; 
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState.fill("");
    cells.forEach((cell) => (cell.textContent = ""));
    status.textContent = "Player X's turn";

}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
});
resetBtn.addEventListener("click", resetGame);




