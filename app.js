/* Call checkKeyPressed function on keydown */
document.addEventListener("keydown", checkKeyPressed);

/* star ship element */
var starShip = document.getElementById("star-ship");

/* game container element */
var gameContainer = document.getElementById("game-container");

/* Define starting positions for star ship */
var starShipRightPosition = 0;
var starShipTopPosition = 100;

/* Check which key is pressed */
function checkKeyPressed(e) {
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

    /* Add style to star ship clone laser */
    starShipLaser.classList.add("star-ship-laser");

    /* Append laser to clone */
    starShipClone.appendChild(starShipLaser);

    /* Append clone to game container */
    gameContainer.appendChild(starShipClone);

    moveLaser(starShipLaser, starShipClone);
}

/* Move laser */
function moveLaser(laser, clone) {
    var laserLeftPosition = 100;

    var cloneLeftPosition = parseInt(clone.style.left);

    if(isNaN(cloneLeftPosition)) {
        cloneLeftPosition = 0;
    }

    var currentLaserTimer = setInterval(function() {
        laserLeftPosition += 10;
        laser.style.left = laserLeftPosition + "px";
        if(window.innerWidth <= (laserLeftPosition + 30 + cloneLeftPosition)) {
            clearInterval(currentLaserTimer);
            clone.remove();
        }
    }, 30);
}