function Shape() {
    var color = "";
    var type = "";
    var pos_x = 0;
    var pos_y = 0;
    var blocks = [];
    var width = 0; // changes when rotated
    var length = 0; // changes when rotated
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
    var begX = (this.getPosX() - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.getPosY()) / BLOCK_WIDTH;
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    for (var x = begX; x < begX + w; x++) {
        for (var y = begY - l; y < begY; y++) {
            console.log("SETTING x: " + x + ", y: " + y + ", l: " + l);
            if (cells[y][x].exists === 1 && this.blocks[x-begX][y-begY + l] === 1) {
                clearInterval(intervalId);
                clearInterval(currentObjectId);
                console.log("you lose!");
            }
            cells[y][x].exists = this.blocks[x - begX][y - begY + l];
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
    var begX = (this.pos_x - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    for (var x = begX; x < begX + w; x++) {
        if (cells[begY - l - 1][x].exists === 1 && this.blocks[x - begX][this.blocks[0].length - 1] === 1) {
            return true;
        }
    }
    return false;
}

Shape.prototype.willIntersectObjectFromLeft = function () {
    var begX = (this.pos_x - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    if (this.pos_x - BLOCK_WIDTH < TETRIS_BEGIN) {
        return true;
    }
    for (var y = begY; y > begY - l; y--) {
        if (cells[y][begX - 1].exists === 1 && this.blocks[y - begY][0] === 1) {
            return true;
        }
    }
    return false;
}

Shape.prototype.willIntersectObjectFromRight = function () {
    var begX = (this.pos_x - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    var w = this.blocks.length;
    var l = this.blocks[0].length;
    console.log("begX " + begX + ", w " + w);
    if (begX + w >= NCOLS) {
        return true;
    }
    for (var y = begY; y > begY - l; y--) {
        if (cells[y][begX + w].exists === 1 && this.blocks[y - begY][this.blocks[0].length - 1] === 1) {
            return true;
        }
    }
    return false;
}