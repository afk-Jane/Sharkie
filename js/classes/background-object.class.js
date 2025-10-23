class BackgroundObject extends MovableObject {
    constructor(imagePath, x){
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = 1280;
        this.height = 720;
        this.y = 720 - this.height;
    }

    draw(ctx) {
        ctx.drawImage(
            this.img,
            Math.floor(this.x),
            this.y,
            this.width, 
            ctx.canvas.height
        );
    }
}