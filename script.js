// factory function for player
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
    const gBoard = document.getElementById("Board");
    const announcements = document.getElementById("announcement");
    const cells = document.getElementsByClassName("tttCells");
    
    // adding event listener for each grid cell
    
    
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
    
    return {cells, displayBoard, updateBoard, updateMessage};
})();

const gameController = (() => {
    const playerX = players("x");
    const playerO = players("o");
    const currentMarker = "x";
    
    updateDisplay.displayBoard(gameBoard.boardArray);

    // Logic for winning

    //
    return {};
})();





// To switch players after each turn (factory function)
const changeMarker = () => {
    if (currentMarker === "x") {
        currentMarker = "o";
    } else {
        currentMarker = "x";
    }
}