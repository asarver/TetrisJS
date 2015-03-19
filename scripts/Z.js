Z.prototype = new Shape();

function Z() {
    this.setType("Z");
    this.setColor("#FF3333");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[1, 0], [1, 1], [0, 1]]);
}