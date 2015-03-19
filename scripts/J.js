J.prototype = new Shape();

function J() {
    this.setType("J");
    this.setColor("#0000CC");
    this.setPosX(X_START);
    this.setPosY(Y_START);
    this.setBlocks([[1,0,0],[1, 1, 1]]);
}