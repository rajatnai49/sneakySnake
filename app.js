//select canvas by element by id
const canvas = document.getElementById('game');
//"2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.
const ctx = canvas.getContext('2d');

//increase snake size create snake parts
class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//decide the speed of snake
let speed = 7;
//width of canvas
let tileCount = 20;
//clientWidth property is common to all Elements and represents the number of pixels horizontally occupied by the canvas
let tileSize = canvas.clientWidth / tileCount - 2;
//intial position of snake
let headX = 10;
let headY = 10;

// array for snake parts
const snakeParts = [];
//starting length of snake
let tailLength = 2;

//initialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;

//draw intial apple
let appleX = 5;
let appleY = 5;

//scores
let score = 0;

// create game loop-to continously update screen
function drawGame() {
    changeSnakePosition();
    // game over logic
    let result = isGameOver();
    if (result) {
        // if result is true
        return;
    }
    clearScreen();
    drawSnake();
    drawApple();
    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000 / speed);//update screen 10 times a second
}

//Game Over function
function isGameOver() {
    let gameOver = false;
    //check whether game has started
    if (yvelocity === 0 && xvelocity === 0) {
        return false;
    }
    if (headX < 0) {
        //if snake hits left wall
        gameOver = true;
    }
    else if (headX === tileCount) {
        //if snake hits right wall
        gameOver = true;
    }
    else if (headY < 0) {
        //if snake hits wall at the top
        gameOver = true;
    }
    else if (headY === tileCount) {
        //if snake hits wall at the bottom
        gameOver = true;
    }

    //stop game when snake crush to its own body

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        //check whether any part of snake is occupying the same space
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            // to break out of for loop
            break;
        }
    }

    //display text Game Over
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdana";
        //position our text in center
        ctx.fillText("Game Over! ", canvas.clientWidth / 6.5, canvas.clientHeight / 2);
    }

    // this will stop execution of drawgame method
    return gameOver;
}

// score function
function drawScore() {
    // set our text color to white
    ctx.fillStyle = "white"
    //set font size to 10px of font family verdena
    ctx.font = "10px verdena"
    // position our score at right hand corner 
    ctx.fillText("Score: " + score, canvas.clientWidth - 50, 10);
}

// clear our screen
function clearScreen() {
    // make screen black
    ctx.fillStyle = 'black'
    // black color start from 0px left, right to canvas width and canvas height
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

function drawSnake() {
    ctx.fillStyle = "green";
    //loop through our snakeparts array
    for (let i = 0; i < snakeParts.length; i++) {
        //draw snake parts
        let part = snakeParts[i]
        // ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.roundRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize, [10]);
        ctx.stroke();
        ctx.fill();
    }
    //add parts to snake --through push
    //put item at the end of list next to the head
    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        //remove furthest item from  snake part if we have more than our tail size
        snakeParts.shift();
    }
    // ctx.fillStyle = "orange";
    // ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    ctx.strokeStyle = 'orange';
    ctx.fillStyle = 'orange'
    ctx.beginPath();
    ctx.roundRect(headX * tileCount, headY * tileCount, tileSize, tileSize, [10]);
    ctx.stroke();
    ctx.fill();
}

function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}

function drawApple() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.roundRect(appleX* tileCount, appleY * tileCount, tileSize, tileSize, [10]);
    ctx.stroke();
    ctx.fill();
}

// check for collision and change apple position
function checkCollision() {
    let cox=-1
    let coy=-1
    
     for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        cox=part.x
        coy=part.y
        if(cox==appleX && coy==appleY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        ctx.checkCollison()
            
        }
    }
    
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        //increase our score value
        score++;
    }
}

//add event listener to our body
document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //left
    if (event.keyCode == 37) {
        //prevent snake from moving in opposite direcction
        if (xvelocity == 1)
            return;
        yvelocity = 0;
        xvelocity = -1;
    }
    //up
    if (event.keyCode == 38) {
        if (yvelocity == 1)
            return;
        yvelocity = -1;
        xvelocity = 0;

    }
    //down
    if (event.keyCode == 40) {
        if (yvelocity == -1)
            return;
        yvelocity = 1;
        xvelocity = 0;
    }


    //right
    if (event.keyCode == 39) {
        if (xvelocity == -1)
            return;
        yvelocity = 0;
        xvelocity = 1;
    }
}

$(document).ready(function () {
    $("#upbtn").click(function () {
        if (yvelocity == 1)
            return;
        yvelocity = -1;
        xvelocity = 0;
    });

    $("#leftbtn").click(function () {
        if (xvelocity == 1)
            return;
        yvelocity = 0;
        xvelocity = -1;
    });

    $("#rightbtn").click(function () {
        if (xvelocity == -1)
            return;
        yvelocity = 0;
        xvelocity = 1;
    });

    $("#downbtn").click(function () {
        if (yvelocity == -1)
            return;
        yvelocity = 1;
        xvelocity = 0;
    });

});

drawGame(); 
