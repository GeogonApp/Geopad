const canvas = document.getElementById("canvas")
const clearButton = document.getElementById("clear-btn")

function setup() {
    setupCanvasSize()
}

function setupCanvasSize() {
    const screenWidth = window.screen.availWidth
    const screenHeight = window.screen.availHeight

    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

setup()

const ctx = canvas.getContext("2d")

let startPos

function drawLine(ctx, pos1, pos2) {
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 5
    ctx.moveTo(pos1.x, pos1.y)
    ctx.lineTo(pos2.x, pos2.y)
    ctx.stroke()
    ctx.closePath()
}

function drawPoint(ctx, pos) {
    const img = new Image()
    img.src = 'images/point.svg'
    img.onload = function() {
        ctx.drawImage(img, pos.x, pos.y, 32, 32)
    }
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function getMousePosition(canvas, e) {
    return {
        x: e.offsetX - canvas.offsetLeft,
        y: e.offsetY - canvas.offsetTop
    }
}

// MARK: - Canvas listeners

let mouseIsDown = false

canvas.addEventListener("mousedown", (e) => {
    startPos = getMousePosition(canvas, e)
    mouseIsDown = true
})

canvas.addEventListener("mousemove", (e) => {
    if (mouseIsDown) {
        clearCanvas()
        const pos = getMousePosition(canvas, e)
        drawLine(ctx, startPos, pos)
    }
})

canvas.addEventListener("mouseup", (e) => {
    mouseIsDown = false
})

// MARK: - Buttons

clearButton.addEventListener("click", (e) => {
    clearCanvas()
})
