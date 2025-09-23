const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

// High-DPI support
const scale = window.devicePixelRatio;
canvas.width = canvas.offsetWidth * scale;
canvas.height = canvas.offsetHeight * scale;
ctx.scale(scale, scale);

const COLOR = {
    ballColor: "#4949ccff"
}

let ballRadius = 10
let x = canvas.width / (2 * scale) // Use canvas.width and scale
let y = canvas.height / scale - 30
let dx = 2;
let dy = -2;

let paddleHeight = 40
let paddleWidth = 10

let paddleX = canvas.width / scale - (paddleWidth + 10) // Right edge in CSS pixels
let paddleY = (canvas.height / scale - paddleHeight) / 2 // Vertically centered
let paddleA = 10;
let paddleB = (canvas.height / scale - paddleHeight) / 2 // Setting up the second paddle


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = COLOR.ballColor
    ctx.fill()
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight)
    ctx.fillStyle = COLOR.ballColor
    ctx.fill();
    ctx.closePath();
}

function draw() {
    console.log("draw called")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle(paddleA, paddleB)
    drawPaddle(paddleX, paddleY)

    x += dx
    y += dy

    // Ball hits left paddle
    if (
        x - ballRadius <= paddleA + paddleWidth && // Ball reaches right edge of left paddle
        y >= paddleB &&                           // Ball is below paddle's top
        y <= paddleB + paddleHeight               // Ball is above paddle's bottom
    ) {
        dx = -dx; // Bounce back
    }

    // Ball hits right paddle
    if (
        x + ballRadius >= paddleX && // Ball reaches left edge of right paddle
        y >= paddleY &&              // Ball is below paddle's top
        y <= paddleY + paddleHeight  // Ball is above paddle's bottom
    ) {
        dx = -dx; // Bounce back
    }

    // Wall collision
    if (x + ballRadius > canvas.width / scale || x - ballRadius < 0) {
        gameOver()
    }
    if (y + ballRadius > canvas.height / scale || y - ballRadius < 0) {
        dy = -dy
    }

    // Move the paddle vertically
    if (upPressed) {
        paddleY = Math.max(0, paddleY - 3);
    } else if (downPressed) {
        paddleY = Math.min(canvas.height / scale - paddleHeight, paddleY + 3);
    }

    // Move the left paddle vertically
    if (wPressed) {
        paddleB = Math.max(0, paddleB - 3);
    } else if (sPressed) {
        paddleB = Math.min(canvas.height / scale - paddleHeight, paddleB + 3);
    }

}

function gameOver() {
    gameRunning = false;
    clearInterval(intervalId)
    ctx.font = "24px Arial";
    ctx.fillStyle = "#de5b2fff";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / (2 * scale), canvas.height / (2 * scale));
}

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "ArrowDown") {
        downPressed = true;
    } else if (event.key === "w" || event.key === "W") {
        wPressed = true;
    } else if (event.key === "s" || event.key === "S") {
        sPressed = true;
    }
})

document.addEventListener('keyup', function(event) {
    if (event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "ArrowDown") {
        downPressed = false;
    } else if (event.key === "w" || event.key === "W") {
        wPressed = false;
    } else if (event.key === "s" || event.key === "S") {
        sPressed = false;
    }
})

// Start animation loop
let intervalId= setInterval(draw, 10)