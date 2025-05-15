class Barrier extends MovableObject {
    IMAGES_BARRIER = [
        './img/3Background/Barrier/1.png',
        './img/3Background/Barrier/2.png',
        './img/3Background/Barrier/3.png'
    ];

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }
}