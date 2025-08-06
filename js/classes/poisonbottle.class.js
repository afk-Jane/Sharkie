class PoisonBottle extends CollectableObject {
    IMAGES = [
        './img/4Marcadores/collectables/poison/Animada/1.png',
        './img/4Marcadores/collectables/poison/Animada/2.png',
        './img/4Marcadores/collectables/poison/Animada/3.png',
        './img/4Marcadores/collectables/poison/Animada/4.png',
        './img/4Marcadores/collectables/poison/Animada/5.png',
        './img/4Marcadores/collectables/poison/Animada/6.png',
        './img/4Marcadores/collectables/poison/Animada/7.png',
        './img/4Marcadores/collectables/poison/Animada/8.png',
    ];

    IMAGE_DAY_LEFT = './img/4Marcadores/collectables/poison/LightLeft.png';
    IMAGE_DAY_RIGHT = './img/4Marcadores/collectables/poison/LightRight.png';
    IMAGE_NIGHT_LEFT = './img/4Marcadores/collectables/poison/DarkLeft.png';
    IMAGE_NIGHT_RIGHT = './img/4Marcadores/collectables/poison/DarkRight.png';

    constructor(x, y, direction = 'left') {
        super(x, y, 60, 76);
        this.direction = direction;
        this.type = 'collectable';
        this.collectType = 'poison';
        this.loadImages(this.IMAGES);
        this.setAnimation(this.IMAGES);
        this.animationInterval = 90;
        this.lastFrameTime = Date.now();
        this.groundImg = new Image();
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
        if (this.groundImg?.complete && this.groundImg.naturalWidth !== 0) {
            ctx.drawImage(this.groundImg, this.x, this.y, this.width, this.height);
        }

        const offsetX = this.direction === 'right' ? 10 : -10;
        const bubbleX = this.x + offsetX;
        const bubbleY = this.y - 2; 

        ctx.drawImage(this.img, bubbleX, bubbleY, this.width, this.height);
    }

    setTheme(theme) {
        this.theme = theme;
        if (theme === 'day' && this.direction === 'left') this.groundImg.src = this.IMAGE_DAY_LEFT;
        else if (theme === 'day' && this.direction === 'right') this.groundImg.src = this.IMAGE_DAY_RIGHT;
        else if (theme === 'night' && this.direction === 'left') this.groundImg.src = this.IMAGE_NIGHT_LEFT;
        else if (theme === 'night' && this.direction === 'right') this.groundImg.src = this.IMAGE_NIGHT_RIGHT;
        else this.groundImg.src = this.IMAGE_NIGHT_LEFT;
    }
}