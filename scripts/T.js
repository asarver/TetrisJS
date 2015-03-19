T.prototype = new Shape();

function T() {
    this.setType("T");
    this.setColor("#9900CC");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[0, 1], [1, 1], [0, 1]]);
}