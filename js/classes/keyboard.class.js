class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    B = false;
    ESC = false;

    W = false;
    A = false;
    S = false;
    D = false;
    E = false;
    F = false;
    p = false;

    get BUBBLE() {
        return this.SPACE || this.E;
    }

    get FIN() {
        return this.B || this.F;
    }

    get POISON() {
        return this.Q || this.V;
    }
}