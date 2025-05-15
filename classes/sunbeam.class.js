class Sunbeam extends MovableObject {
    constructor(config) {
        super();
        this.loadImage(config.image || './img/3Background/Layers/1Light/1.png');
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.opacity = config.opacity;
        this.speed = config.speed;
    }

    move() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = this.x + this.resetOffset;
        }
    }

    draw(ctx) {
        if (!this.isImageLoaded()) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }
}