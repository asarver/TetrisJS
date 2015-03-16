O.prototype = new Shape();

function O() {
    this.setType("O");
    this.setColor("#FFFF00");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[1, 1],[1, 1]]);
}