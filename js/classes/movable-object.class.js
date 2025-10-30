class MovableObject extends DrawableObject {
    speed = 150;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    imageCache = {};
    collidable = true;
    frameTimer = 0;

    moveRight(deltaTime) {
        this.x += this.speed * deltaTime;
    }

    moveLeft(deltaTime) {
        this.x -= this.speed * deltaTime;
    }

    jump() {
        this.speedY = 30;
    }

    isCollidingWith(other) {
        if (!this.collidable || !other || other.collidable === false) return false;
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    onCollision(other) {
        this.energy -= 10;
        console.log(`Collision! ${this.constructor.name} and ${other.constructor.name}`);
        console.log(`Energy: this=${this.energy}, other=${other.energy}`);
    }

    playSwimAnimation(images, deltaTime) {
        this.frameTimer += deltaTime;
        const frameIntervalSec = this.frameInterval / 1000;
        if (this.frameTimer > frameIntervalSec) {
            this.frameTimer = 0;
            this.currentImage = (this.currentImage + 1) % images.length;
        }
        const imgPath = images[this.currentImage];
        if (this.imageCache[imgPath]) {
            this.img = this.imageCache[imgPath];
        }
    }

    playAnimation(images, deltaTime) {
        this.frameTimer += deltaTime;
        const frameIntervalSec = this.frameInterval / 1000;
        if (this.frameTimer > frameIntervalSec) {
            this.frameTimer = 0;
            this.currentImage++;
            const index = this.currentImage % images.length;
            const path = images[index];
            this.img = this.imageCache[path];
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Jellyfish ||
            this instanceof Pufferfish ||
            this instanceof Boss_Orcinus
        ) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}