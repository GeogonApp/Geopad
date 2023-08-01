import { Line } from "./models/line.js"
import { Position } from "./models/position.js"

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

let lines = []

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
    const size = 32
    img.src = 'images/point.svg'
    img.onload = function() {
        ctx.drawImage(img, pos.x - size/2, pos.y - size/2, size, size)
    }
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function getMousePosition(canvas, e) {
    return new Position(e.offsetX - canvas.offsetLeft, e.offsetY - canvas.offsetTop)
}

// MARK: - Canvas listeners

let mouseIsDown = false

canvas.addEventListener("mousedown", (e) => {
    const startPos = getMousePosition(canvas, e)
    mouseIsDown = true

    const line = new Line(startPos.x, startPos.y, startPos.x, startPos.y)
    drawPoint(ctx, startPos)
    lines.push(line)
})

canvas.addEventListener("mousemove", (e) => {
    if (mouseIsDown) {
        redrawAll(canvas, e)
    }
})

canvas.addEventListener("mouseup", (e) => {
    if (mouseIsDown) {
        redrawAll(canvas, e)
        mouseIsDown = false
    }
})

function redrawAll(canvas, e) {
    clearCanvas()

    const pos = getMousePosition(canvas, e)
    lines[lines.length - 1].updateEndPoint(pos.x, pos.y)

    for (const l of lines) {
        const lStartPosition = l.getStartPos()
        const lEndPosition = l.getEndPos()
        drawLine(ctx, lStartPosition, lEndPosition)
        drawPoint(ctx, lStartPosition)
        drawPoint(ctx, lEndPosition)
    }
}

// MARK: - Buttons

clearButton.addEventListener("click", (e) => {
    clearCanvas()
    lines = []
})
