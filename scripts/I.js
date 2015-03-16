I.prototype = new Shape();

function I() {
    this.setType("I");
    this.setColor("#00CCFF");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setWidth(1);
    this.setLength(4);
}

I.prototype.drawShape = function() {
    var color = this.getColor();
    var posX = this.getPosX();
    var posY = this.getPosY();
    var w = this.getWidth();
    var l = this.getLength();
    for (var i = 0; i < w; i++) {
        block(posX + (i * BLOCK_WIDTH), posY, color);   
    }
    for (var i = 0; i < l; i++) {
        block(posX, posY + (i * BLOCK_WIDTH), color);   
    }
}

I.prototype.setCells = function() {
    var begX = (this.getPosX() - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.getPosY()) / BLOCK_WIDTH;
    var w = this.getWidth();
    var l = this.getLength();
    for (var x = begX; x < begX + w; x++) {
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