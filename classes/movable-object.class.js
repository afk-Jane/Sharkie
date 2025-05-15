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

    isImageLoaded() {
        return this.img && this.img.complete && this.img.naturalWidth !== 0;
    }

    playSwimAnimation(images) {
        let now = new Date().getTime();
        if (now - this.lastFrameTime > this.frameInterval) {
            this.lastFrameTime = now;
            this.currentImage = (this.currentImage + 1) % images.length;
            this.img = this.imageCache[images[this.currentImage]];
        }
    }

    playAnimation() {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
        console.log('playAnimation genutzt \(^.^)/')
    }
}