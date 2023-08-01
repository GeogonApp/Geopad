class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Getters
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getPos() {
        return {
            x : this.x,
            y : this.y
        }
    }

    // Setters
    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    // Other methods
    moveTo(newX, newY) {
        this.setX(newX);
        this.setY(newY);
    }
}

export {
    Position,
}