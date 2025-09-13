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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = COLOR.ballColor
    ctx.fill()
}

function drawPaddle() {
    // Draw paddle on the right edge
    const paddleX = canvas.width / scale - (paddleWidth + 10) // Right edge in CSS pixels
    const paddleY = (canvas.height / scale - paddleHeight) / 2 // Vertically centered

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

    if (x + ballRadius > canvas.width / scale || x - ballRadius < 0) {
        dx = -dx
    } 

    if (y + ballRadius > canvas.height / scale || y - ballRadius < 0) {
        dy = -dy
    }
}

// Start animation loop
setInterval(draw, 10)