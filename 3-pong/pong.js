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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = COLOR.ballColor
    ctx.fill()
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight)
    ctx.fillStyle = COLOR.ballColor
    ctx.fill();
    ctx.closePath();
}

function draw() {
    console.log("draw called")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()

    x += dx
    y += dy

    // Move the ball horizontally and vertically
    if (x + ballRadius > canvas.width / scale || x - ballRadius < 0) {
        dx = -dx
    } else if (
        x + ballRadius >= paddleX && // Ball reaches paddle's left edge
        y >= paddleY &&              // Ball is below paddle's top
        y <= paddleY + paddleHeight  // Ball is above paddle's bottom
    ) {
        dx = -dx; // Bounce back
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

}

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "ArrowDown") {
        downPressed = true;
    }
})

document.addEventListener('keyup', function(event) {
    if (event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "ArrowDown") {
        downPressed = false;
    }
})

// Start animation loop
setInterval(draw, 10)