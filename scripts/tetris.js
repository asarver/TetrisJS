function init() {
    ctx = $('#canvas')[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    BLOCK_WIDTH = 10;
    NROWS = (HEIGHT-60) / BLOCK_WIDTH;
    NCOLS = 10;
    X_START = (WIDTH - 2 * BLOCK_WIDTH) / 2;
    Y_START = 60;
    leftDown = false;
    rightDown = false;
    downDown = false;
    SKIP_ROW = -1;
    TETRIS_BEGIN = (WIDTH - BLOCK_WIDTH * NCOLS) / 2;
    TETRIS_END = TETRIS_BEGIN + (BLOCK_WIDTH * NCOLS);
    current_obj = null;
    cells = [];
    for (var i = 0; i < NROWS; i++) {
        cells.push(new Array(NCOLS));
        for (var j = 0; j < NCOLS; j++) {
            cells[i][j] = { exists: 0, color: "#000000" };   
        }
    }
    
    intervalId = setInterval(draw, 10);
    currentObjectId = setInterval(changeObjectPosition, 1000);
}

function onKeyUp(evt) {
    if (evt.keyCode === 39) rightDown = true;
    else if (evt.keyCode === 37) leftDown = true;
    else if (evt.keyCode === 40) downDown = true;
}

function changeObjectPosition() {
    var currentY = current_obj.getPosY();
    var l = current_obj.getLength();
    if (currentY + BLOCK_WIDTH*l >= HEIGHT || current_obj.willIntersectObjectFromBelow()) {
        current_obj.setCells();
        current_obj = null;
        clearInterval(currentObjectId);
    } else {
        current_obj.setPosY(currentY + BLOCK_WIDTH);
    }
}

function checkRowComplete(y,x) {
    var allExists = true;
    //console.log("y = " + y);
    for (var i = 0; i < NCOLS; i++) {
        allExists &= cells[y][i].exists === 1;
    }
    if (allExists) {
        console.log("all Exists for row " + y);
        for (var r = y; r < NROWS-1; r++) {
            for (var c = 0; c < NCOLS; c++) {
                cells[r][c] = cells[r+1][c];
            }
        }
        for (var c = 0; c < NCOLS; c++) {
            cells[NROWS-1][c] = { exists: 0, color: "#000000"};
        }
        return true;
    }
    return false;
}

function block(x, y, color) {
    rect(x,y,BLOCK_WIDTH,BLOCK_WIDTH,color);
}

function rect(x,y,w,h,color) {
    if (typeof color === 'undefined') {
        color = "#000000";
    }
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = color;
    ctx,strokeStyle = "#FFFFFF";
    ctx.fill();
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    rect(0,0,WIDTH,HEIGHT, "#CCCCCC");
    rect(TETRIS_BEGIN, 60, TETRIS_END-TETRIS_BEGIN,HEIGHT-60,"#6699CC");
}

function draw() {
    clear();
    
    drawTetrisSign();
    
    drawCells();
    
    if (current_obj === null) {
        current_obj = createObject();
        clearInterval(currentObjectId);
        currentObjectId = setInterval(changeObjectPosition, 1000);
        current_obj.drawShape();
    } else {
        current_obj.drawShape();
    }
    
    if (rightDown) {
        var posX = current_obj.getPosX();
        var w = current_obj.getWidth();
        var projX = posX;
        if (posX + BLOCK_WIDTH*w < TETRIS_END && 
            !current_obj.willIntersectObjectFromRight()) {
            projX = posX + BLOCK_WIDTH;
        }
        current_obj.setPosX(projX);
        rightDown = false;
    } else if (leftDown) {
        var posX = current_obj.getPosX();
        var projX = posX;
        if (posX - BLOCK_WIDTH >= TETRIS_BEGIN && 
            !current_obj.willIntersectObjectFromLeft()) {
            projX = posX - BLOCK_WIDTH;
        }
        current_obj.setPosX(projX);
        leftDown = false;
    } else if (downDown) {
        current_obj.rotate();
        downDown = false;
    }
}

function drawCells() {
    for (var x = 0; x < NCOLS; x++) {
        for (var y = 0; y < NROWS; y++) {
            if (cells[y][x].exists === 1 && SKIP_ROW !== y) {
                var xStart = TETRIS_BEGIN + x*BLOCK_WIDTH;
                var yStart = HEIGHT - (1+y)*BLOCK_WIDTH;
                //console.log("xStart: " + xStart + ", yStart: " + yStart);
                block(xStart, yStart, cells[y][x].color);
            }
        }
    }
}

function createObject() {
    var possible_objects = [new O(), new I()];
    //console.log(possible_objects);
    
    return possible_objects[Math.floor(Math.random() * possible_objects.length)];
}

function drawTetrisSign() {
    var tetrisX = (WIDTH - 21*BLOCK_WIDTH) / 2;
    var tetrisY = 1;
    
    drawT(tetrisX,tetrisY);
    drawE(tetrisX + 4 * BLOCK_WIDTH, tetrisY);
    drawT(tetrisX + 8 * BLOCK_WIDTH, tetrisY);
    drawR(tetrisX + 12 * BLOCK_WIDTH, tetrisY);
    drawI(tetrisX + 16 * BLOCK_WIDTH, tetrisY);
    drawS(tetrisX + 18 * BLOCK_WIDTH, tetrisY);
}

function drawT(x,y) {
    for (var i = 0; i < 3; i++) {
        block(x + (i * BLOCK_WIDTH), y);
    }
    
    for (var i = 1; i < 5; i++) {
        block(x + (BLOCK_WIDTH), y + (i * BLOCK_WIDTH));   
    }
}

function drawE(x,y) {
    for (var i = 0; i < 5; i++) {
        block(x, y + (i*BLOCK_WIDTH));
        if (i % 2 == 0) {
            block(x + BLOCK_WIDTH, y + (i*BLOCK_WIDTH));
            block(x + (2 * BLOCK_WIDTH), y + (i*BLOCK_WIDTH));
        }
    }
}

function drawR(x,y) {
    for (var i = 0; i < 5; i++) {
        block(x, y + (i*BLOCK_WIDTH));
        if (i !== 3) {
            block(x + (2 * BLOCK_WIDTH), y + (i*BLOCK_WIDTH));
        }
        if (i === 3 || i === 0 || i == 2) {
            block(x + BLOCK_WIDTH, y + (i*BLOCK_WIDTH));
        }
    }
}

function drawI(x,y) {
    for (var i = 0; i < 5; i++) {
        block(x, y + (i * BLOCK_WIDTH));   
    }
}

function drawS(x,y) {
    for (var i = 0; i < 5; i++) {
        if (i !== 1 && i !== 3) {
            block(x, y + (i * BLOCK_WIDTH));
            block(x + BLOCK_WIDTH, y + (i * BLOCK_WIDTH));
            block(x + (2 * BLOCK_WIDTH), y + (i * BLOCK_WIDTH));
        } else if (i !== 1) {
            block(x + (2 * BLOCK_WIDTH), y + (i * BLOCK_WIDTH));
        } else {
            block(x, y + (i * BLOCK_WIDTH));
        }
    }
}

$(document).ready(function() {
    $(document).keyup(onKeyUp);
    init();
});
