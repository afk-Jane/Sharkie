class Jellyfish extends MovableObject {
    y = 290;
    height = 128;

    constructor() {
        super();
        this.loadImage('./img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png');
        this.x = 256 + Math.random() * 384;
        this.y = 32 + Math.random() * 288;
    }
}