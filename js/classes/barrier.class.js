
class Barrier extends MovableObject {

    IMAGES_BARRIER = [
        './img/3Background/Barrier/1.png',
        './img/3Background/Barrier/1-2.png',
        './img/3Background/Barrier/1-3.png',
        './img/3Background/Barrier/2.png',
        './img/3Background/Barrier/3.png'
    ];

    type = 'barrier';

    constructor(index, x, y) {
        super();
        const imgIndex = Math.max(1, Math.min(3, index)) - 1;
        this.loadImage(this.IMAGES_BARRIER[imgIndex]);
        this.x = x;
        this.y = y;
        this.width = 196;
        this.height = 128;
    }
}