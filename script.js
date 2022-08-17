const X_class = 'x';
const O_class = 'o';

const cellElement = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restart = document.querySelector('.restartBtn');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winning-message');
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let oTurn;
let xTurn;

startGame();

restart.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_class);
        cell.classList.remove(O_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {
            once: true
        });
    })
    setBoardHoverClass();

    winningMessage.classList.remove('show');
}



//Click event handler
function handleClick(event) {
    // placeMark
    event.preventDefault();
    const cell = event.target;
    const currentClass = oTurn ? O_class : X_class;
    placeMark(cell, currentClass);

    // check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        // check for draw
        endGame(true);
    } else {
        // Switch turn
        swapTurn();
        //Set Hover state for board 
        setBoardHoverClass();
    }
}

//marking position in the grid
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

//Switching turn for each player
function swapTurn() {
    oTurn = !oTurn;
}

//Setting the hover state for move suggestions
function setBoardHoverClass() {
    board.classList.remove(X_class);
    board.classList.remove(O_class);

    oTurn ? board.classList.add(O_class) : board.classList.add(X_class);
}

//Cheking for the winner 
function checkWin(currentClass) {
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        })
    })
}

//end of the game loop
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `Draw!`;
    } else {
        winningMessageTextElement.innerText = `${oTurn ? 'O' : 'X'} Wins!`
    }

    winningMessage.classList.add('show');
}

//Cheking for a draw match
function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(O_class);
    })
}