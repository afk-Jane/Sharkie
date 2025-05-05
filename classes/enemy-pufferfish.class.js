class Pufferfish extends MovableObject {
    y = 290;
    height = 48;

    constructor() {
        super();
        this.loadImage('./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
        this.x = 256 + Math.random() * 500;
    }
}