'use strict'
const PACMAN = '⍩⃝';


var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === CHERRY) {
        updateScore(10);
    }
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount--
    }

    if (nextCell === POWERFOOD) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;

        }, 5000);
    }

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            nextCell === EMPTY;
            var ghostIdx = getGhostIdx(nextLocation);
            gGhosts.splice(ghostIdx, 1);
        } else {
            gameOver();
            return;
        }
    }

    if (gFoodCount === 0) {
        gameOver();
    }

    console.log(gFoodCount);

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // var elPacman = document.evaluate('//td[text()="⍩⃝"]',document);
    // var thisPacman = elPacman.iterateNext();
    // var currPacmanCell = thisPacman.split(' ')
    // console.log(currPacmanCell);
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;

            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}