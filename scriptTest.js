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

let currentMarker = "x";
let boardArray = ['x', 'x', 'x', '', '', '', '', '', '']

const indexArray = () => {
    let tempArray = [];
    for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === currentMarker) {
            tempArray.push(i);
        }
    }
    return tempArray;
};

// goal: return a true when winCondition is found in indexArray
const gameOutCome = winConditions.some(condition => {
    return condition.every(el => {
        return indexArray().includes(el); 
    })
});


