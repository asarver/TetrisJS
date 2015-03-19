L.prototype = new Shape();

function L() {
    this.setType("L");
    this.setColor("#FF9900");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[0, 0, 1], [1, 1, 1]]);
}