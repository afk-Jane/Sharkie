class BackgroundObject extends MovableObject {
    constructor(imagePath, x){
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.width = 720;
        this.height = 480;
        this.y = 480 - this.height;
    }
}