class Bubble extends MovableObject {
    constructor(x, y, toLeft = false, poisoned = false) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 6;
        this.poisoned = poisoned;
        this.toLeft = toLeft;

        let bubbleImg = poisoned
            ? './img/1Sharkie/4Attack/Bubble-trap/Bubble.png'
            : './img/1Sharkie/4Attack/Bubble-trap/Poisoned-Bubble.png';

        this.loadImage(bubbleImg);
    }

    move() {
        this.x += this.toLeft ? -this.speed : this.speed;
    }
}