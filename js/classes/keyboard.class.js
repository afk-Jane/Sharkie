class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    B = false;
    P = false;
    V = false;

    W = false;
    A = false;
    S = false;
    D = false;
    E = false;
    F = false;
    ESC = false;
    Q = false;
    

    get BUBBLE() {
        return this.B || this.E;
    }

    get FIN() {
        return this.SPACE || this.F;
    }

    get POISON() {
        return this.V || this.Q;
    }
}