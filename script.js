/* --------------- DOM --------------- */
const ground = document.getElementById("ground");
const player = document.getElementById("player");
let places;




/* --------------- Global --------------- */
// 7x6(42) places grid board
const lenCol = 7, lenRow = 6;
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
let validClickedCount = 0;




/* --------------- Function --------------- */
// all
const all = (a, b, c, d) => (a===b) && (b===c) && (c===d) && (d!==0);


// game win over common
const gameWinOverCommon = () => {
    // remove click event listener
    places.forEach(i => i.removeEventListener("click", clickedPlace));
    // hide player root for DOM
    player.parentElement.remove();
};



// game over
const gameOver = () => {
    // game win over common
    gameWinOverCommon();
    // show winner name in DOM
    document.getElementById("title").innerText = `Game Over :(`;
};


// game win
const gameWin = (player, a, b, c, d) => {
    // game win over common
    gameWinOverCommon();

    //// Colored Win Place
    // getting their id
    let _a = a[0] *lenCol +a[1];
    let _b = b[0] *lenCol +b[1];
    let _c = c[0] *lenCol +c[1];
    let _d = d[0] *lenCol +d[1];
    // now color them
    [_a, _b, _c, _d].forEach(i => places[i].style.backgroundColor = "#ffffff");

    // show winner name in DOM
    document.getElementById("title").innerText = `Player ${player} won the Game!`;
};


// check for win
const checkForWin = () => {
    // horizontaly
    for (let r=0; r<lenRow; r++) {
        for (let c=0; c<lenCol-3; c++) {
            // all value are same, than win [0]
            if (all(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3])) {
                gameWin(board[r][c], [r, c], [r, c+1], [r, c+2], [r, c+3]);
                return;
            };
        };
    };

    // verticaly
    for (let r=0; r<lenRow-3; r++) {
        for (let c=0; c<lenCol; c++) {
            // all value are same, than win [0]
            if (all(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c])) {
                gameWin(board[r][c], [r, c], [r+1, c], [r+2, c], [r+3, c]);
                return;
            };
        };
    };

    // daigonal '\'
    for (let r=0; r<lenRow-3; r++) {
        for (let c=0; c<lenCol-3; c++) {
            // all value are same, than win [0]
            if (all(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3])) {
                gameWin(board[r][c], [r, c], [r+1, c+1], [r+2, c+2], [r+3, c+3]);
                return;
            };
        };
    };

    // daigonal '/'
    for (let r=3; r<lenRow; r++) {
        for (let c=0; c<lenCol-3; c++) {
            // all value are same, than win [0]
            if (all(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3])) {
                gameWin(board[r][c], [r, c], [r-1, c+1], [r-2, c+2], [r-3, c+3]);
                return;
            };
        };
    };

    // game over
    validClickedCount += 1;
    if (validClickedCount === (lenCol*lenRow)) { gameOver() };
};


// clicked place
const clickedPlace = (e) => {
    // getting column
    let col = e.target.getAttribute("data-id") %lenCol;

    // is valid positon
    if (board[lenRow-1][col] === 0) {
        let row;
        // get a valid row
        for (let r=0; r<lenRow; r++) {
            // checking r's col === 0, than, row willbe r
            if (board[r][col] === 0) { row = r; break };
        };

        // did we get a row(int)
        if (typeof(row) === "number") {
            // drop the player to board
            board[row][col] = player.innerText;
            // change place's color
            places[row*lenCol+col].style.backgroundColor = (player.innerText === 'X') ? "#ff0000":"#0000ff";
            // check for win
            checkForWin();
            // change player
            player.innerText = (player.innerText === 'X') ? 'Y':'X';
        };
    };
};


// create board
const createBoard = () => {
    // 7x6(42) place grid board
    for (let i=0; i<lenCol*lenRow; i++) { ground.innerHTML += `<div class="place" data-id="${i}"><div>` };
    // update places
    places = [...document.getElementsByClassName("place")];
    // add click event listener
    places.forEach(i => i.addEventListener("click", clickedPlace));
};


// start game
const startGame = () => {
    // create board
    createBoard();
};




/* --------------- Run --------------- */
startGame();