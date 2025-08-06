class CollectableObject extends MovableObject {

    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.currentImage = 0;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.animationImages = [];
    }

    setAnimation(images) {
        this.animationImages = images;
        this.loadImages(images);
    }

    playAnimation() {
        let now = Date.now();
        if (now - this.lastFrameTime > this.frameInterval) {
            this.lastFrameTime = now;
            this.currentImage = (this.currentImage + 1) % this.animationImages.length;
            this.img = this.imageCache[this.animationImages[this.currentImage]];
        }
    }

    update() {
        this.playAnimation();
    }
}