// factory function to create players
const players = (marker) => {
    const getMarker = () => {
        return marker;
    }
    return {getMarker};
}

// To manage board (module)
const gameBoard = (() => {
    // set starting empty array
    const boardArray = ["", "", "", "", "", "", "", "", ""];
    // update Array with marker input 
    const updateArray = (marker, index) => {
        boardArray[index] = marker;
    }
    // to return value of cell / array
    const getArray = (index) => {
        return boardArray[index];
    }
    // to restart game (link to restart button)
    const resetArray = () => {
        for(let i = 0; i < boardArray.length; i++) {
            boardArray[i] = "";
        }
    }
    return {boardArray, updateArray, getArray, resetArray};
})();

// module to update display
const updateDisplay = (() => {
    const announcements = document.getElementById("announcement");
    const cells = document.querySelectorAll(".tttCells");
    const restartButton = document.querySelector("#restart-button");
    
    // adding event listener for each grid cell
    cells.forEach((cell) => 
        cell.addEventListener("click", (e) => {
            let marker = gameController.currentMarker();
            let index = e.target.getAttribute("cell-index");
            e.target.textContent = marker;
            gameBoard.updateArray(marker, index);
    }))

    // event listener for restarting game
    restartButton.addEventListener("click", () => {
        gameBoard.resetArray();
    });
    
    // function to place marker on cell
    const updateBoard = (marker, cell) => {
        if(cell.textContent === "") {
            cell.textContent = marker;
        } else return;
    }
    // function to update the message section
    const updateMessage = (message) => {
        announcements.textContent = message;
    }
    
    return {cells, updateBoard, updateMessage};
})();

const gameController = (() => {
    const playerX = players("x");
    const playerO = players("o");
    
    let round = 1;
    let roundOver = false;

    // to get 
    let currentMarker = () => {
        return (round % 2 == 0) ? playerO.getMarker() : playerX.getMarker();
    }

    const playRound = () => {
        if(round < 9) {
            round++
        }
    }

    const resetGame = () => {
        return
    }

    // Logic for winning

    //
    return {currentMarker, round, playerO};
})();





// To switch players after each turn (factory function)
const changeMarker = () => {
    if (currentMarker === "x") {
        currentMarker = "o";
    } else {
        currentMarker = "x";
    }
}