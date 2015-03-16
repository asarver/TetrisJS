I.prototype = new Shape();

function I() {
    this.setType("I");
    this.setColor("#00CCFF");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[1, 1, 1, 1]]);
}