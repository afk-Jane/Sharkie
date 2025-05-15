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
    }

    loadImages(arr) {
        arr.forEach((path, index) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
            if (index === 0) {
                this.img = img;
            }
        });
    }
    
    playAnimation() {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}    