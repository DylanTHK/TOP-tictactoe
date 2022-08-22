// module to control flow of overall game
const gameController = (() => {
    
    // 1. initialise public variables 
    let currentMarker = "x";
    let round = 0;
    let gameOver = false;
    let boardArray = ["", "", "", "", "", "", "", "", ""];
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
    
    // to link with event listeners
    const restartButton = document.querySelector("#restart-button");
    const announcement = document.querySelector("#announcement");
    const cells = document.querySelectorAll(".tttCells");

    // 2a. Player select TTT cell -> link to playRound
    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (!gameOver) playRound(e);
        })
    })

    // 2b. Reset button -> resets round
    restartButton.addEventListener("click", (e) => {
        resetRound();
    })
    const resetRound = (event) => {
        currentMarker = "x";
        round = 0;
        gameOver = false;
        boardArray = ["", "", "", "", "", "", "", "", ""];
        announcement.textContent = "Welcome!! X starts First";
        updateGameBoard(event);
    }

    // 3. Update gameArray (1D Array) based on selected cell index with currentMarker
    const updateBoardArray = (event) => {
        // a) obtain index of selected cell
        let selectedCell = event.target.getAttribute("cell-index");
        // b) use index to update boardArray with current Marker
        if (boardArray[selectedCell] === "") {
            boardArray[selectedCell] = currentMarker;
            round++;
        }
    };

    // 4. Update gameBoard with values from boardArray
    const updateGameBoard = () => {
        // add currentMarker to the targeted cell (event)
        for (let i = 0; i < 9; i++) {
            cells[i].textContent = boardArray[i];
        }
    };

    // 5. Obtain array of all currentMarker's positions
    let indexArray = () => {
        let tempArray = [];
        for (let i = 0; i < boardArray.length; i++) {
            if (boardArray[i] === currentMarker) {
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
                return indexArray().includes(el); //
            })
        });
        // updates status of the game
        if (gameOutCome || round > 9) {
            gameOver = true;
        }
    };

    // 7. update Announcement text (Win / Lose / Draw / Continue)
    const updateAnnouncement = () => {
        if (gameOver){ // check gameOver status check rounds, if rounds >= 9, end the game
            announcement.textContent = `Congrats! Player ${currentMarker.toUpperCase()} has won!`;
        }  else if (round >= 9){ // check rounds, if rounds >= 9, end the game
            announcement.textContent = "It's a Draw!";
        } else if (currentMarker === "x"){ // if game has not ended, update next player's turn
            announcement.textContent = "Player O's Turn";
        } else {
            announcement.textContent = "Players X's Turn";
        }
    };

    // 8. if game has not ended, change player(if gameOver is false, change player else nothing)
    const changePlayer = () => {
        currentMarker === "x" ? currentMarker = "o" : currentMarker = "x";
    };

    // ***** function to facilitate game play (1 round) *****//
    const playRound = (event) => {
        // 3. update game board (Array)
        updateBoardArray(event);
        // 4. update board display 
        updateGameBoard(event);
        
        console.log(`round: ${round}`);
        console.log(indexArray());
        winLogic();
        // change players
        updateAnnouncement();
        changePlayer();

        if (gameOver) {
            console.log("GAMEOVER");
        }
    };

    // making variables public
    return {updateBoardArray, updateGameBoard, indexArray, winLogic, updateAnnouncement, changePlayer};
})();
