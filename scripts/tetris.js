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
    upDown = false;
    spaceDown = false;
    SCORE = 0;
    DROP_INTERVAL = 1000;
    REFRESH_RATE = 10;
    LEVEL = 1;
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
    
    intervalId = setInterval(draw, REFRESH_RATE);
    currentObjectId = setInterval(changeObjectPosition, DROP_INTERVAL);
}

function onKeyUp(evt) {
    if (evt.keyCode === 39) rightDown = true;
    else if (evt.keyCode === 37) leftDown = true;
    else if (evt.keyCode === 40) downDown = true;
    else if (evt.keyCode === 38) upDown = true;
    else if (evt.keyCode === 32)
    {
        spaceDown = true;
        clearInterval(currentObjectId);
        currentObjectId = setInterval(changeObjectPosition, DROP_INTERVAL);
    }
}

function onKeyDown(evt) {
    if (evt.keyCode === 32 && spaceDown)
    {
        spaceDown = false;
        clearInterval(currentObjectId);
        currentObjectId = setInterval(changeObjectPosition, 100);
    }
}

function changeObjectPosition() {
    var currentY = current_obj.getPosY();
    var l = current_obj.getBlocks()[0].length;
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
    for (var i = 0; i < NCOLS; i++) {
        allExists &= cells[y][i].exists === 1;
    }
    if (allExists) {
        SCORE += 100;
	$('[id*=lblScore]').html("Score: " + SCORE);
        if (SCORE % 1000 === 0) {
            LEVEL += 1;
            DROP_INTERVAL -= 50;
            $('[id*=lblLevel]').html("Level: " + LEVEL);
        }
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
        currentObjectId = setInterval(changeObjectPosition, DROP_INTERVAL);
        current_obj.drawShape();
    } else {
        current_obj.drawShape();
    }
    
    if (rightDown) {
        var posX = current_obj.getPosX();
        var w = current_obj.getBlocks().length;
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
        current_obj.rotateLeft();
        downDown = false;
    } else if (upDown) {
        current_obj.rotateRight();
        upDown = false;
    }
}

function drawCells() {
    for (var x = NCOLS-1; x >= 0; x--) {
        for (var y = 0; y < NROWS; y++) {
            if (cells[y][x].exists === 1) {
                var xStart = TETRIS_END - (x+1)*BLOCK_WIDTH;
                var yStart = HEIGHT - (1+y)*BLOCK_WIDTH;
                block(xStart, yStart, cells[y][x].color);
            }
        }
    }
}

function createObject() {
    var possible_objects = [new O(), new I(), new J(), new L(), new S(), new T(), new Z()];
    
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
    $(document).keydown(onKeyDown);
    init();
});
