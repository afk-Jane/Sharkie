class DrawableObject {
    x = 0;
    y = 0;
    height = 128;
    width = 64;
    img;
    imageCache = {};
    currentImage = 0;
    distance = 1;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
            this.imageLoaded = true;
        };
    }
    
    playAnimation() {
        setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.imageCache.length;
            this.img = this.imageCache[this.currentImage];
        }, 100); 
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}    