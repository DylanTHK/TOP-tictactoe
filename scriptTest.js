round = 2;

const Player = (marker) => {
    this.marker = marker;
    // function to obtain the marker of player
    const getMarker = () => marker;
    return {getMarker}
};

const playerX = Player("x");
const playerO = Player("o");

// function to determine currentMarker based on round
let currentMarker = () => {
    return (round & 2 === 0) ? playerO.getMarker() : playerX.getMarker();
};