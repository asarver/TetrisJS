S.prototype = new Shape();

function S() {
    this.setType("S");
    this.setColor("#33FF33");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[0, 1], [1, 1], [1, 0]]);
}