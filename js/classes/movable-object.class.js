class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    imageCache = {};

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isCollidingWith(other) {
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
        console.log(`Energie: this=${this.energy}, other=${other.energy}`);
    }

    playSwimAnimation(images) {
        let now = new Date().getTime();
        if (now - this.lastFrameTime > this.frameInterval) {
            this.lastFrameTime = now;
            this.currentImage = (this.currentImage + 1) % images.length;
        }
        const imgPath = images[this.currentImage % images.length];
        if (this.imageCache[imgPath]) {
            this.img = this.imageCache[imgPath];
        }
    }

    playAnimation() {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Boss_Orcinus) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


}