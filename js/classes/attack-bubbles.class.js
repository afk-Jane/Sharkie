type = 'projectile';

class Bubble extends MovableObject {
    constructor(x, y, toLeft = false, poisoned = false) {
        super();
        this.x = x + 32;
        this.y = y - 28;
        this.width = 64;
        this.height = 64;
        this.speed = 8;
        this.poisoned = poisoned;
        this.toLeft = toLeft;
        this.type = 'projectile';

        this.spawnTime = performance.now();
        this.maxLifetime = 1800; 
        this.fadeDuration = 700;
        this.alpha = 1;

        this.followDead = false;
        this.markForRemoval = false;

        let bubbleImg = poisoned
            ? './img/1Sharkie/4Attack/Bubble-trap/Poisoned-Bubble.png'
            : './img/1Sharkie/4Attack/Bubble-trap/Bubble.png';

        this.loadImage(bubbleImg);
    }

    move() {
        if (!this.followDead) {
            this.x += this.toLeft ? -this.speed : this.speed;
        }
        if (!this.followDead) {
            const t = performance.now() - this.spawnTime;
            if (t > this.maxLifetime) {
            const fadeT = Math.min(1, (t - this.maxLifetime) / this.fadeDuration);
            this.alpha = 1 - fadeT;
            if (fadeT >= 1) this.markForRemoval = true;
            }
        } else {
            this.alpha = 1;
        }
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    onCollision(enemy) {
        if (this.followDead || this.markForRemoval) return;
        this.markForRemoval = true;
        if (typeof enemy.takeDamage === 'function') {
            enemy.takeDamage('bubble', this.x, this);
        }
    }

    draw(ctx) {
        if (!this.isImageLoaded()) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}