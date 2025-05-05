class Character extends MovableObject {
    height = 256;
    width = 256;
    y = 192;
    speed = 10;

    constructor() {
        super();
        this.loadImage('./img/1.Sharkie/3.Swim/1.png'); 
        this.loadImages([
            './img/1.Sharkie/3.Swim/1.png',
            './img/1.Sharkie/3.Swim/2.png',
            './img/1.Sharkie/3.Swim/3.png',
            './img/1.Sharkie/3.Swim/4.png'
        ]);
    }

    loadImages(imagePaths) {
        this.imageCache = imagePaths.map(path => {
            const img = new Image();
            img.src = path;
            return img;
        });
    }
    
    playSwimAnimation() {
        this.currentImage = (this.currentImage + 1) % this.imageCache.length;
        this.img = this.imageCache[this.currentImage];
    }

    swim() {
        if (this.world.keyboard.RIGHT) {
            this.x += this.speed;
        }
        if (this.world.keyboard.LEFT) {
            this.x -= this.speed;
        }
        if (this.world.keyboard.UP) {
            this.y -= this.speed;
        }
        if (this.world.keyboard.DOWN) {
            this.y += this.speed;
        }
    }

}