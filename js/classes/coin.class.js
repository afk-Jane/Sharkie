class Coin extends CollectableObject {

    IMAGES = [
        './img/4Marcadores/collectables/Coins/1.png',
        './img/4Marcadores/collectables/Coins/2.png',
        './img/4Marcadores/collectables/Coins/3.png',
        './img/4Marcadores/collectables/Coins/4.png',
    ];

    constructor(x, y) {
        super(x, y, 48, 48);
        this.type = 'collectable';
        this.collectType = 'coin';
        this.loadImages(this.IMAGES);
        this.setAnimation(this.IMAGES);
        this.animationInterval = 100;
        this.lastFrameTime = Date.now();
    }

    playAnimation() {
        let now = Date.now();
        if (now - this.lastFrameTime > this.animationInterval) {
            this.currentImage = (this.currentImage + 1) % this.IMAGES.length;
            this.img = this.imageCache[this.IMAGES[this.currentImage]];
            this.lastFrameTime = now;
        }
    }

    draw(ctx) {
        this.playAnimation();
        super.draw(ctx);
    }
}