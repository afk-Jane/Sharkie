
class Barrier extends MovableObject {

    IMAGES_BARRIER = [
        './img/3Background/Barrier/1.png',
        './img/3Background/Barrier/1-2.png',
        './img/3Background/Barrier/1-3.png',
        './img/3Background/Barrier/2.png',
        './img/3Background/Barrier/3.png'
    ];

    defaultSizes = [
        { width: 896, height: 720 },
        { width: 896, height: 288 },
        { width: 1024, height: 384 },
        { width: 1024, height: 512 },
        { width: 256, height: 752 }
    ];

    type = 'barrier';

    constructor(index, x, y, width = null, height = null) {
        super();
        const imgIndex = Math.max(0, Math.min(this.IMAGES_BARRIER.length - 1, index - 1));
        this.loadImage(this.IMAGES_BARRIER[imgIndex]);
        this.x = x;
        this.y = y;
        const size = this.defaultSizes[imgIndex];
        this.width = width !== null ? width : size.width;
        this.height = height !== null ? height : size.height;
    }
}