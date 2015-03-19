function Shape() {
    var color = "";
    var type = "";
    var pos_x = 0;
    var pos_y = 0;
    var blocks = [];
}

Shape.prototype.getColor = function () {
    return this.color;
}

Shape.prototype.getType = function () {
    return this.type;
}

Shape.prototype.getPosX = function () {
    return this.pos_x;
}

Shape.prototype.getPosY = function () {
    return this.pos_y;
}

Shape.prototype.getBlocks = function() {
    return this.blocks;
}

Shape.prototype.setType = function (type) {
    this.type = type;
}

Shape.prototype.setColor = function (color) {
    this.color = color;
}

Shape.prototype.setPosX = function (x) {
    this.pos_x = x;
}

Shape.prototype.setPosY = function (y) {
    this.pos_y = y;
}

Shape.prototype.setBlocks = function(blocks) {
    this.blocks = blocks;
}

Shape.prototype.drawShape = function () {
    for (var r = 0; r < this.blocks.length; r++) {
        for (var c = 0; c < this.blocks[r].length; c++) {
            if (this.blocks[r][c] === 1) {
                block(this.pos_x + BLOCK_WIDTH * r,
                    this.pos_y + BLOCK_WIDTH * c,
                    this.color);
            }
        }
    }
}

Shape.prototype.setCells = function () {
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    var begX = (TETRIS_END - this.getPosX()) / BLOCK_WIDTH;
    begX -= w;
    var begY = (HEIGHT - this.getPosY()) / BLOCK_WIDTH;
    for (var x = begX; x < begX + w; x++) {
        for (var y = begY - l; y < begY; y++) {
            console.log("SETTING x: " + x + ", y: " + y + ", l: " + l);
            if (cells[y][x].exists === 1 && this.blocks[begX + w - x - 1][begY - y - 1] === 1) {
                clearInterval(intervalId);
                clearInterval(currentObjectId);
                console.log("you lose!");
            }else if (this.blocks[begX + w - x - 1][begY - y - 1] === 1) {
                cells[y][x].exists = this.blocks[begX + w - x - 1][begY - y - 1];
                cells[y][x].color = this.getColor();
            }
        }
    }

    for (var y = begY - l; y < begY; y++) {
        if (checkRowComplete(y, x)) {
            y -= 1;
            begY -= 1;
        }
    }
}

Shape.prototype.rotate = function () {
    var newBlocks = [];
    for (var c = 0; c < this.blocks[0].length; c++) {
        newBlocks[c] = []
        for (var r = 0; r < this.blocks.length; r++) {
            newBlocks[c][r] = this.blocks[r][c];
        }
    }
    this.blocks = newBlocks;
}

Shape.prototype.willIntersectObjectFromBelow = function () {
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    var begX = (TETRIS_END - this.pos_x) / BLOCK_WIDTH;
    begX -= w;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;

    if (this.pos_Y + BLOCK_WIDTH > HEIGHT) {
        return true;
    }

    for (var x = begX; x < begX + w; x++) {
        for (var y = begY - l; y < begY; y++) {
            if (cells[y-1][x].exists === 1 && this.blocks[begX + w - x - 1][begY - y - 1] === 1) {
                return true;
            }
        }
    }
    return false;
}

Shape.prototype.willIntersectObjectFromLeft = function () {
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    var begX = (TETRIS_END - this.pos_x) / BLOCK_WIDTH;
    begX -= w;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;

    if (this.pos_x - BLOCK_WIDTH < TETRIS_BEGIN) {
        return true;
    }

    for (var x = begX; x < begX + w; x++) {
        for (var y = begY - l; y < begY; y++) {
            if (cells[y][x+1].exists === 1 && this.blocks[begX + w - x - 1][begY - y - 1] === 1) {
                return true;
            }
        }
    }
    return false;
}

Shape.prototype.willIntersectObjectFromRight = function () {
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    var begX = (TETRIS_END - this.pos_x) / BLOCK_WIDTH;
    begX -= w;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    console.log("begX " + begX + ", w " + w);

    if (begX >= NCOLS) {
        return true;
    }

    for (var x = begX; x < begX + w; x++) {
        for (var y = begY - l; y < begY; y++) {
            if (cells[y][x-1].exists === 1 && this.blocks[begX + w - x - 1][begY - y - 1] === 1) {
                return true;
            }
        }
    }
    return false;
}