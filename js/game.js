'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = '🧃'
const CHERRY = '🍒';

var gFoodCount = -1;
var gBoard;
var gCherryInterval = 0;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0;
    updateScore(0);
    gCherryInterval = setInterval(addCherry, 5000);
    closeModalBtn();
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--;
            }
            if (i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === 1 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWERFOOD;
                gFoodCount--;
            }
        }
    }
    console.log('food count is', gFoodCount);
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    if (gFoodCount === 0) {
        var elModal = document.querySelector('.modal span');
        elModal.innerText = 'VICTORIOUS ! ! !'
        openModalBtn();
    } else {
        openModalBtn();
    }
    gFoodCount = -1;
}

function openModalBtn() {
    var elModal = document.querySelector(".btn-modal");
    elModal.style.display = "block";
}

function closeModalBtn() {
    var elModal = document.querySelector(".btn-modal");
    elModal.style.display = "none";
}

function addCherry() {
    var emptyCells = checkEmptyCells();
    if (!emptyCells.length) return;
    var idx = getRandomInt(0, gBoard.length);
    console.log(idx);
    var emptyCell = emptyCells[idx];
    console.log(emptyCell);
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY);
}

function checkEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            if (cell === EMPTY) {
                emptyCells.push({ i: i, j: j });
            }
        }
    }
    return emptyCells;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
