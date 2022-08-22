// fatory function to generate players
const Player = (marker) => {
    this.marker = marker;
    // function to obtain the marker of player
    const getMarker = () => marker;
    return {getMarker}
};

// module to control flow of overall game
const gameController = (() => {
    // 1. initialise public variables 
    const playerX = Player("x");
    const playerO = Player("o");
    let round = 1;
    let gameOver = false;
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

    // function to determine currentMarker based on round
    let currentMarker = () => {
        return (round % 2 === 0) ? playerO.getMarker() : playerX.getMarker();
    };

    const getState = () => {
        return gameOver;
    }

    // to RESET Board and Array
    const resetRound = (event) => {
        round = 1;
        gameOver = false;
        gameBoard.reset();
        displayController.updateAnnouncement("Welcome!! X starts First");
        displayController.updateGameBoard(gameBoard.boardArray);
    }

    // ***** function to facilitate game play (1 round) *****//
    const playRound = (event) => {
        // 3. update game board (Array)
        gameBoard.updateBoardArray(event);
        // 4. update board display 
        displayController.updateGameBoard(gameBoard.boardArray);
        console.log(`round: ${round}`); // REMOVE

        winLogic();
        // change players
        displayController.updateAnnouncement("sample");
        
        round++;
        // check if game has ended
        if (gameOver) {
            console.log("GAMEOVER");
        }
    };

    // 5. Obtain array of all currentMarker's positions
    let indexArray = (board) => {
        let tempArray = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === currentMarker()) {
                tempArray.push(i);
            }
        }
        return tempArray;
    };

    // 6. Check indexArray with winConditions Array (updates gameOver status)
    const winLogic = () => {
        // option 1 
        const gameOutCome = winConditions.some(condition => {
            return condition.every(el => {
                return indexArray(gameBoard.boardArray).includes(el); //
            })
        });
        // updates status of the game
        if (gameOutCome || round > 9) {
            gameOver = true;
        }
    };
    // making variables public
    return {gameOver,
        getState, currentMarker, playRound, winLogic, resetRound};
})();

// module to keep track of game board Array
const gameBoard = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    // 3. Update gameArray (1D Array) based on selected cell index with currentMarker
    const updateBoardArray = (event) => {
        // a) obtain index of selected cell
        let selectedCell = event.target.getAttribute("cell-index");
        // b) use index to update boardArray with current Marker
        if (boardArray[selectedCell] === "") {
            boardArray[selectedCell] = gameController.currentMarker();
        }
    };
    // for loop works but forEach does not update boardArray object?
    const reset = () => {
        for (let i = 0; i < boardArray.length; i++) {
          boardArray[i] = "";
        }
      };
    return {boardArray, updateBoardArray, reset}
})();

const displayController = (() => {
    // to link with event listeners
    const announcement = document.querySelector("#announcement");
    const restartButton = document.querySelector("#restart-button");
    const cells = document.querySelectorAll(".tttCells");

    // 2a. Player select TTT cell -> link to playRound
    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (!gameController.getState() & cell.textContent === "") gameController.playRound(e);
        })
    })
    // 2b. Reset button -> resets round
    restartButton.addEventListener("click", (e) => {
        gameController.resetRound();
    })
    // 4. Update gameBoard with values from boardArray
    const updateGameBoard = (board) => {
        // add currentMarker to the targeted cell (event)
        for (let i = 0; i < 9; i++) {
            cells[i].textContent = board[i];
        }
    };
    // 7. update Announcement text (Win / Lose / Draw / Continue)
    const updateAnnouncement = (message) => {
        announcement.textContent = message;
    };
    return {updateAnnouncement, updateGameBoard};
})();