/* Call checkKeyPressed function on keydown */
document.addEventListener("keydown", checkKeyPressed);

/* star ship element */
var starShip = document.getElementById("star-ship");

/* game container element */
var gameContainer = document.getElementById("game-container");

/* Game total points */
var totalPoints = 0;

/* Define starting positions for star ship */
var starShipRightPosition = 0;
var starShipTopPosition = 100;

/* Define id starting points */
var laserStartId = 0;
var opponentStartId = 0;

/* Define containers for lasers and opponents */
var gameLasers = [];
var gameOpponents = [];

/* Define laser and opponent intervals */
var gameLaserIntervals = [];
var gameOpponentIntervals = [];

/* Define laser and opponent positions */
var laserLeftPositions = [];
var opponentRightPositions = [];

/* Check which key is pressed */
function checkKeyPressed(e) {
    if(e.keyCode === 13) {
        // gameLaserIntervals.splice("laser-1", 1);
        // console.log(gameLaserIntervals["laser-1"]);

        // for(var i = 0; i < gameLaserIntervals.length; i++) {
        //     if(i == 0) {
        //         clearInterval(gameLaserIntervals[i].timer);
        //     }
        // }

        // for(var i = 0; i < gameOpponentIntervals.length; i++) {
        //     if(i == 0) {
        //         clearInterval(gameOpponentIntervals[i].timer);
        //     }
        // }
    }
    if(e.keyCode === 32) {
        fireLaserStarShip();
    }
    if(e.keyCode === 37) {
        moveStarShipLeft();
    }
    if(e.keyCode === 38) {
        moveStarShipUp();
    }
    if(e.keyCode === 39) {
        moveStarShipRight();
    }
    if(e.keyCode === 40) {
        moveStarShipDown();
    }
}

/* Move star ship right */
function moveStarShipRight() {
    if(starShipRightPosition === (window.innerWidth - 100)) {
        return;
    }
    starShipRightPosition += 10;
    starShip.style.left = starShipRightPosition + "px";
}

/* Move star ship left */
function moveStarShipLeft() {
    if(starShipRightPosition === 0) {
        return;
    }
    starShipRightPosition -= 10;
    starShip.style.left = starShipRightPosition + "px"; 
}

/* Move star ship down */
function moveStarShipDown() {
    if(starShipTopPosition === (window.innerHeight - 100)) {
        return;
    }
    starShipTopPosition += 10;
    starShip.style.top = starShipTopPosition + "px";
}

/* Move star ship up */
function moveStarShipUp() {
    if(starShipTopPosition === 100) {
        return;
    }
    starShipTopPosition -= 10;
    starShip.style.top = starShipTopPosition + "px";
}

/* Fire laser with star ship */
function fireLaserStarShip() {
    /* Create star ship clone */
    var starShipClone = document.createElement("div");

    /* Add style to star ship clone */
    starShipClone.classList.add("star-ship-clone");

    /* Define star ship clone positions */
    starShipClone.style.top = starShip.style.top;
    starShipClone.style.left = starShip.style.left;

    /* Create star ship clone laser */
    var starShipLaser = document.createElement("div");

    /* Assign id to laser */
    laserStartId += 1;
    var laserId = "laser-" + laserStartId;
    starShipLaser.setAttribute("id", laserId);

    /* Store laser object in laser container */
    var topData = parseInt(starShip.style.top);
    var fromData;
    var toData;

    if(isNaN(topData)) {
        fromData = 100 + 45;
    } else {
        fromData = topData + 45;
    }

    toData = fromData + 10;

    gameLasers.push({id: laserId, from: fromData, to: toData});

    starShipLaser.dataset.from = fromData;
    starShipLaser.dataset.to = toData;

    /* Add style to star ship clone laser */
    starShipLaser.classList.add("star-ship-laser");

    /* Append laser to clone */
    starShipClone.appendChild(starShipLaser);

    /* Append clone to game container */
    gameContainer.appendChild(starShipClone);

    /* Start moving laser */
    moveLaser(starShipLaser, starShipClone);
}

/* Move laser */
function moveLaser(laser, clone) {
    var laserLeftPosition = 100;

    var cloneLeftPosition = parseInt(clone.style.left);

    if(isNaN(cloneLeftPosition)) {
        cloneLeftPosition = 0;
    }

    var foundEnemy = findInRangeOpponents(laser);

    var currentLaserTimer = setInterval(function() {

        laserLeftPosition += 10;
        laser.style.left = laserLeftPosition + "px";

        addOrUpdateLaserLeftPosition(laser, laserLeftPosition);

        if(foundEnemy) {
            // var foundEnemyRightPosition = opponentRightPositions[foundEnemy.getAttribute("id")];
            var foundEnemyRightPosition = findEnemyRightPosition(foundEnemy);

            if((findLaserLeftPosition(laser)) >= (window.innerWidth - 100 - foundEnemyRightPosition)) {

                /* Clear laser and opponent intervals */
                clearLaserInterval(laser);
                clearEnemyInterval(foundEnemy);

                /* Remove laser and opponent intervals from global arrays */
                gameLaserIntervals.splice(laser.getAttribute("id"), 1);
                gameOpponentIntervals.splice(foundEnemy.getAttribute("id"), 1);

                /* Remove laser and opponent elements from DOM */
                clone.remove();
                foundEnemy.remove();

                /* Remove laser from global array of all lasers */
                gameLasers.splice(laser.getAttribute("id"), 1);

                /* Remove opponent from global array of all opponents */
                gameOpponents.splice(foundEnemy.getAttribute("id"), 1);

                /* Update total points */
                totalPoints += 1;
                document.getElementById("game-total-points").innerHTML = totalPoints;
            }
        }

        /* Check if laser is outside of game container */
        if(window.innerWidth <= (findLaserLeftPosition(laser) + 30 + cloneLeftPosition)) {
            clearLaserInterval(laser);
            gameLaserIntervals.splice(laser.getAttribute("id"), 1);
            gameLasers.splice(laser.getAttribute("id"), 1);
            clone.remove();
        }

    }, 100);

    gameLaserIntervals.push({id: laser.getAttribute("id"), timer: currentLaserTimer});
}

/* Create opponents */
function createOpponents() {
    var numberOfOpponents = [1];
    var opponentColors = ["red", "green", "blue", "yellow", "black"];

    var currentNumber = numberOfOpponents[Math.floor(Math.random() * numberOfOpponents.length)];

    for(var i = 0; i < currentNumber; i++) {
        /* Create enemy */
        var enemy = document.createElement("div");

        /* Assign id to enemy */
        opponentStartId += 1;
        var opponentId = "opponent-" + opponentStartId;
        enemy.setAttribute("id", opponentId);

        /* Add style to enemy */
        enemy.classList.add("opponent-ship");
        var currentColor = opponentColors[Math.floor(Math.random() * opponentColors.length)];
        enemy.style.backgroundColor = currentColor;

        /* Add position to enemy */
        var randomNumber = numberInRange((window.innerHeight - 100), 100);
        enemy.style.top = randomNumber + "px";

        enemy.dataset.from = randomNumber;
        enemy.dataset.to = randomNumber + 100;

        /* Store enemy object in opponents container */
        gameOpponents.push({id: opponentId, from: randomNumber, to: randomNumber + 100});

        // console.log(gameOpponents);

        /* Add enemy to DOM */
        gameContainer.appendChild(enemy);

        /* Start moving enemy */
        moveOpponent(enemy);
    }

    // setTimeout(createOpponents, 3000);
}

/* Call create opponents function */
createOpponents();

/* create a function to get a random number between two numbers */
function numberInRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Move opponent */
function moveOpponent(enemyObj) {
    var startingPoint;

    var enemyPosition = parseInt(enemyObj.style.right);

    if(isNaN(enemyPosition)) {
        startingPoint = 0;
    }

    var currentEnemyInterval = setInterval(function() {

        startingPoint += 10;
        enemyObj.style.right = startingPoint + "px";

        addOrUpdateEnemyRightPosition(enemyObj, startingPoint);

        if((window.innerWidth - 100) <= startingPoint) {

            clearEnemyInterval(enemyObj);

            gameOpponentIntervals.splice(enemyObj.getAttribute("id"), 1);

            /* Remove opponent from global array of all opponents */
            gameOpponents.splice(enemyObj.getAttribute("id"), 1);

            enemyObj.remove();
        }
    }, 100);

    gameOpponentIntervals.push({id: enemyObj.getAttribute("id"), timer: currentEnemyInterval});
}

/* Game main timer */
function gameMainTimer(totalSeconds) {
    if(isNaN(totalSeconds)) {
        return;
    }

    var finalTimerData = "";

    var totalMin = Math.floor(totalSeconds / 60);

    var totalSec = totalSeconds - (totalMin * 60);

    if(totalMin < 10) {
        totalMin = "0" + totalMin;
    }

    if(totalSec < 10) {
        totalSec = "0" + totalSec;
    }

    finalTimerData = totalMin + ":" + totalSec;

    document.getElementById("game-main-timer").innerHTML = finalTimerData;

    totalSeconds--;

    if(totalSeconds < 0) {
        clearTimeout(mainTimerInterval);
        document.getElementById("game-main-timer").innerHTML = "GAME OVER";
        document.getElementById("game-container").remove();
        return;
    }

    var mainTimerInterval = setTimeout(function() {
        gameMainTimer(totalSeconds);
    }, 1000);
}

gameMainTimer(300);

/* Compare position of laser and enemy */
function comparePositions(laser, enemy) {
    var inRange = false;
    var found = false;

    for(var i = laser.dataset.from; i <= laser.dataset.to; i++) {
        for(var j = enemy.dataset.from; j <= enemy.dataset.to; j++) {
            if(i == j) {
                found = true;
            }
            if(found) {
                inRange = enemy;
                break;
            }
        }
    }

    return inRange;
}

/* Check which opponents are in range */
function findInRangeOpponents(laser) {
    var enemies = document.getElementsByClassName("opponent-ship");

    var result;

    for(var i = 0; i < enemies.length; i++) {
        result = comparePositions(laser, enemies[i]);
    }

    return result;
}

/* Clears laser interval */
function clearLaserInterval(laser) {
    for(var i = 0; i < gameLaserIntervals.length; i++) {
        if(laser.getAttribute("id") == gameLaserIntervals[i].id) {
            clearInterval(gameLaserIntervals[i].timer);
            break;
        }
    }
}

/* Finds current laser left position */
function findLaserLeftPosition(laser) {
    var position = 0;

    for(var i = 0; i < laserLeftPositions.length; i++) {
        if(laser.getAttribute("id") == laserLeftPositions[i].id) {
            position = laserLeftPositions[i].left;
            break;
        }
    }

    return position;
}

function addOrUpdateLaserLeftPosition(laser, left) {
    var found = false;

    for(var i = 0; i < laserLeftPositions.length; i++) {
        if(laser.getAttribute("id") == laserLeftPositions[i].id) {
            found = true;
            laserLeftPositions[i].left = left;
            break;
        }
    }

    if(found === false) {
        laserLeftPositions.push({id: laser.getAttribute("id"), left: left});
    }
}

function clearEnemyInterval(enemy) {
    for(var i = 0; i < gameOpponentIntervals.length; i++) {
        if(enemy.getAttribute("id") == gameOpponentIntervals[i].id) {
            clearInterval(gameOpponentIntervals[i].timer);
            break;
        }
    }
}

function findEnemyRightPosition(enemy) {
    var position = 0;

    for(var i = 0; i < opponentRightPositions.length; i++) {
        if(enemy.getAttribute("id") == opponentRightPositions[i].id) {
            position = opponentRightPositions[i].right;
            break;
        }
    }

    return position;
}

function addOrUpdateEnemyRightPosition(enemy, right) {
    var found = false;

    for(var i = 0; i < opponentRightPositions.length; i++) {
        if(enemy.getAttribute("id") == opponentRightPositions[i].id) {
            found = true;
            opponentRightPositions[i].right = right;
            break;
        }
    }

    if(found === false) {
        opponentRightPositions.push({id: enemy.getAttribute("id"), right: right});
    }
}