Square.prototype = new Shape();

function Square() {
    this.setType("square");
    this.setColor("#FFFF00");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setWidth(2);
    this.setLength(2);
}

Square.prototype.drawShape = function () {
    var color = this.getColor();
    var posX = this.getPosX();
    var posY = this.getPosY();
    block(posX, posY, color);
    block(posX + BLOCK_WIDTH, posY, color);
    block(posX, posY + BLOCK_WIDTH, color);
    block(posX + BLOCK_WIDTH, posY + BLOCK_WIDTH, color);
};


Square.prototype.setCells = function () {
    var begX = (this.getPosX() - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.getPosY()) / BLOCK_WIDTH;
    var w = this.getWidth();
    var l = this.getLength();
    for (var x = begX; x < begX + l; x++) {
        for (var y = begY - l; y < begY; y++) {
            console.log("SETTING x: " + x + ", y: " + y + ", l: " + l);
            if (cells[y][x].exists === 1) {
                clearInterval(intervalId);
                clearInterval(currentObjectId);
                console.log("you lose!");
            }
            cells[y][x].exists = 1;
            cells[y][x].color = this.getColor();
        }
    }

    for (var y = begY - l; y < begY; y++) {
        if (checkRowComplete(y, x)) {
            y -= 1;
            begY -= 1;
        }
    }
}
