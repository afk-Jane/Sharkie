class Bubble extends MovableObject {
    constructor(x, y, toLeft = false, poisoned = false) {
        super();
        this.x = x;
        this.y = y - 28;
        this.width = 64;
        this.height = 64;
        this.speed = 6;
        this.poisoned = poisoned;
        this.toLeft = toLeft;
        this.type = 'projectile';

        let bubbleImg = poisoned
            ? './img/1Sharkie/4Attack/Bubble-trap/Poisoned-Bubble.png'
            : './img/1Sharkie/4Attack/Bubble-trap/Bubble.png';

        this.loadImage(bubbleImg);
    }

    move() {
        this.x += this.toLeft ? -this.speed : this.speed;
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    onCollision(enemy) {
        this.markForRemoval = true;
        if (typeof enemy.takeDamage === 'function') {
            enemy.takeDamage();
        }
    }
}