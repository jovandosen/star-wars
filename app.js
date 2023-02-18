/* Call checkKeyPressed function on keydown */
document.addEventListener("keydown", checkKeyPressed);

/* star ship element */
var starShip = document.getElementById("star-ship");

/* game container element */
var gameContainer = document.getElementById("game-container");

/* Define starting positions for star ship */
var starShipRightPosition = 0;
var starShipTopPosition = 100;

/* Define id starting points */
var laserStartId = 0;
var opponentStartId = 0;

/* Define containers for lasers and opponents */
var gameLasers = [];
var gameOpponents = [];

var o;
var l;

/* Check which key is pressed */
function checkKeyPressed(e) {
    if(e.keyCode === 13) {
        alert('wait');
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

    var result = comparePositions(gameLasers[0], gameOpponents[0]);

    // console.log(result);

    var currentLaserTimer = setInterval(function() {

        // if(((l + 30) == (window.innerWidth - 100 - o))) {
        //     alert('BOOOOOOM');
        // }

        l = laserLeftPosition;

        laserLeftPosition += 10;
        laser.style.left = laserLeftPosition + "px";

        // console.log(cloneLeftPosition);

        // if(result && (laserLeftPosition == (window.innerWidth - 100 - o))) {
        //     alert('BOOOOOOM');
        // }

        console.log("laser: " + (l + 40));
        console.log("enemy: " + (window.innerWidth - 100 - o));

        /* Correct */
        // if(((l + 40) == (window.innerWidth - 100 - o)) || ((l + 40) > (window.innerWidth - 100 - o))) {
        //     alert('BOOOOOOM 1');
        // }

        if((((l + 40) == (window.innerWidth - 100 - o)) || ((l + 40) > (window.innerWidth - 100 - o))) && result) {
            alert('BOOOOOOM 1');
        }

        // console.log("enemy: " + o);

        // console.log((window.innerWidth - 100 - o));
        if(window.innerWidth <= (laserLeftPosition + 30 + cloneLeftPosition)) {

            for(var i = 0; i < gameLasers.length; i++) {
                if(laser.getAttribute("id") == gameLasers[i].id) {
                    gameLasers.splice(gameLasers[i], 1);
                }
            }

            clearInterval(currentLaserTimer);
            clone.remove();
        }
    }, 30);
}

/* Create opponents */
function createOpponents2() {
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

//
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
        var randomNumber = 200;
        enemy.style.top = randomNumber + "px";

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
//

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
        o = startingPoint;
        startingPoint += 10;
        enemyObj.style.right = startingPoint + "px";

        // if(((l + 40) == (window.innerWidth - 100 - o))) {
        //     alert('BOOOOOOM 2');
        // }

        if((window.innerWidth - 100) <= startingPoint) {

            for(var i = 0; i < gameOpponents.length; i++) {
                if(enemyObj.getAttribute("id") == gameOpponents[i].id) {
                    gameOpponents.splice(gameOpponents[i], 1);
                }
            }

            clearInterval(currentEnemyInterval);
            enemyObj.remove();
        }
    }, 30);
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

function comparePositions(laser, enemy) {
    var found = false;

    for(var i = laser.from; i <= laser.to; i++) {
        for(var j = enemy.from; j <= enemy.to; j++) {
            if(i == j) {
                found = true;
            }
            if(found) {
                break;
            }
        }
    }
    //console.log(found);
    return found;
}