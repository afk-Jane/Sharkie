class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    imageCache = {};
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
            this.imageLoaded = true;
        };
    }

    /** 
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr){
        arr.forEach((path, index) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
            if (index === 0) {
                this.img = img;
            }
        });
    }

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
}