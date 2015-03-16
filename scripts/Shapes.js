function Shape() {
    var color = "";
    var type = "";
    var pos_x = 0;
    var pos_y = 0;
    var width = 0; // changes when rotated
    var length = 0; // changes when rotated
}

Shape.prototype.getColor = function () {
    return this.color;
}

Shape.prototype.getType = function () {
    return this.type;
}

Shape.prototype.setType = function (type) {
    this.type = type;
}

Shape.prototype.setColor = function (color) {
    this.color = color;
}

Shape.prototype.getPosX = function () {
    return this.pos_x;
}

Shape.prototype.getPosY = function () {
    return this.pos_y;
}

Shape.prototype.getWidth = function () {
    return this.width;
}

Shape.prototype.getLength = function () {
    return this.length;
}

Shape.prototype.setWidth = function (w) {
    this.width = w;
}

Shape.prototype.setLength = function (l) {
    this.length = l;
}

Shape.prototype.setPosX = function (x) {
    this.pos_x = x;
}

Shape.prototype.setPosY = function (y) {
    this.pos_y = y;
}

Shape.prototype.drawShape = function () {
    console.log("this needs to be implemented by inheritor.");
}

Shape.prototype.rotate = function () {
    console.log("rotating");
    var l = this.length;
    this.length = this.width;
    this.width = l;
}

Shape.prototype.willIntersectObjectFromBelow = function () {
    console.log("intersect: x: " + this.x + ", y: " + this.y + ", l: " + this.l);
    var begX = (this.pos_x - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    var w = this.width;
    var l = this.length;
    for (var x = begX; x < begX + w; x++) {
        if (cells[begY - l - 1][x].exists === 1) {
            return true;
        }
    }
    return false;
}

Shape.prototype.willIntersectObjectFromLeft = function () {
    var begX = (this.pos_x - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    var w = this.width;
    var l = this.length;
    if (this.pos_x - BLOCK_WIDTH < TETRIS_BEGIN) {
        return true;
    }
    for (var y = begY; y > begY - l; y--) {
        if (cells[y][begX - 1].exists === 1) {
            return true;
        }
    }
    return false;
}

Shape.prototype.willIntersectObjectFromRight = function () {
    var begX = (this.pos_x - TETRIS_BEGIN) / BLOCK_WIDTH;
    var begY = (HEIGHT - this.pos_y) / BLOCK_WIDTH;
    var w = this.width;
    var l = this.length;
    console.log("begX " + begX + ", w " + w);
    if (begX + w >= NCOLS) {
        return true;
    }
    for (var y = begY; y > begY - l; y--) {
        if (cells[y][begX + w].exists === 1) {
            return true;
        }
    }
    return false;
}