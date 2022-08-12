// ******* practice code without modules *******

// global variables
const cells = document.querySelectorAll(".tttCells");
const restartButton = document.querySelector("#restart-button");
const displayArea = document.querySelector("#announcement");
let currentMarker = "x";
let round = 1;
let gameOver = false;
let boardArray = ["", "", "", "", "", "", "", "", ""];
// Event Listener to link to game logic
cells.forEach(cell => 
    cell.addEventListener("click", (e) => {
        let index = e.target.getAttribute("cell-index");
        playRound(index); 
}));
// Event Listener for reset button (restart round)
restartButton.addEventListener("click", (e) => {
    resetRound();
    updateBoard();
});
// linked to reset button to reset board
function resetRound() {
    for(let i=0; i<boardArray.length; i++) {
        boardArray[i] = "";
    }
    round = 1;
    currentMarker = "x";
    gameOver = false;
    displayArea.textContent = "Welcome! X starts First";
}
// 1. function to update array (for game logic)
function updateArray(marker, index) {
    if(boardArray[index] === "") {
        boardArray[index] = marker;
        // update Display
        updateBoard();
        round++
    }
}

// 1.1 update board based on updated array
function updateBoard() {
    for(let i=0; i<boardArray.length; i++) {
        cells[i].textContent = boardArray[i];
    }
}


// 2. swap player every turn
function changePlayer() {
    if (gameOver) {
        return ;
    }
    if(round % 2 == 0) {
        currentMarker = "o";
    } else currentMarker = "x";
}

// 4. function to return index array
function getIndex() {
    // get index of x markers
    // link query to search for current marker's index 
    let indexArray = []
    for (let i = 0; i < boardArray.length; i++) {
        if(boardArray[i] === currentMarker) {
            indexArray.push(i);
        }
    };
    return indexArray;
}

// 3. check status of the game
function winLogic() {
    let tempArray = getIndex()
    // if index positions all share the same marker, winner = marker
    // .filter => get the positions of markers o and x
    const winConditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];
    // loop to run through winConditions to check if any 3 combinations matches
    winConditions.forEach(condition => {
        const testing = condition.every(value => {
            return tempArray.includes(value);
        });
        if (testing) {
            gameOver = true;
        }
    });
}

function updateDisplay() {
    if(gameOver) {
        displayArea.textContent = `The winner is player ${currentMarker}!`
    } else {
        displayArea.textContent = `player ${currentMarker}'s turn`
    }
}

function gameEnded() {
    // check if markers match the winning combinations
    // if no combination and round > 9 => draw
    if (gameOver || round > 9) {
        updateDisplay();
    }
}

// to add ending round and displaying winner (Controller)
function playRound(index) {
    // updateArray
    updateArray(currentMarker, index);
    // check win logic
    winLogic();
    gameEnded();
    // change player
    changePlayer();
    updateDisplay();

}