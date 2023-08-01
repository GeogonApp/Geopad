import { Position } from "./position.js"

class Point {

    // Here I will pass a link to an instance of
    // start / end positions of the line

    constructor(position) {
        this.position = position;
    }

    updatePosition(toX, toY) {
        this.position.moveTo(toX, toY);
    }

    // Getters

    getPos() {
        return this.position.getPos();
    }
}

class Line {
    constructor(startX, startY, endX, endY) {

        // init positions
        this.startPosition = new Position(startX, startY);
        this.endPosition = new Position(endX, endY);
        
        // init start Point
        this.startPoint = this.setPoint(this.startPosition);

        if (this.endPosition) {
            this.endPoint = this.setPoint(this.endPosition);
        }
    }

    // Getters

    getStartPos() {
        return this.startPosition.getPos();
    }

    getEndPos() {
        return this.endPosition.getPos();
    }

    // Setters

    setPoint(position) {
        return new Point(position);
    }

    updateEndPoint(x, y) {
        if (this.endPoint) {
            this.endPoint.updatePosition(x, y);
        } else {
            this.endPoint = new Point(x, y);
        }

        return this.endPoint;
    }

    updateEndPosition(x, y) {
        this.endPosition.updatePosition(x, y);
    }
}

export {
    Line,
}