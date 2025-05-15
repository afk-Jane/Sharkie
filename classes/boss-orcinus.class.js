class Boss_Orcinus extends MovableObject {

    ORCINUS_IMAGES_INTRODUCE = [
        './img/2Enemy/3Orcinus/1Introduce/1.png',
        './img/2Enemy/3Orcinus/1Introduce/2.png',
        './img/2Enemy/3Orcinus/1Introduce/3.png',
        './img/2Enemy/3Orcinus/1Introduce/4.png',
        './img/2Enemy/3Orcinus/1Introduce/5.png',
        './img/2Enemy/3Orcinus/1Introduce/6.png',
        './img/2Enemy/3Orcinus/1Introduce/7.png',
        './img/2Enemy/3Orcinus/1Introduce/8.png',
        './img/2Enemy/3Orcinus/1Introduce/9.png',
        './img/2Enemy/3Orcinus/1Introduce/10.png'
    ];

    ORCINUS_IMAGES_SWIMMING = [
        './img/2Enemy/3Orcinus/2floating/1.png',
        './img/2Enemy/3Orcinus/2floating/2.png',
        './img/2Enemy/3Orcinus/2floating/3.png',
        './img/2Enemy/3Orcinus/2floating/4.png',
        './img/2Enemy/3Orcinus/2floating/5.png',
        './img/2Enemy/3Orcinus/2floating/6.png',
        './img/2Enemy/3Orcinus/2floating/7.png',
        './img/2Enemy/3Orcinus/2floating/8.png',
        './img/2Enemy/3Orcinus/2floating/9.png',
        './img/2Enemy/3Orcinus/2floating/10.png',
        './img/2Enemy/3Orcinus/2floating/11.png',
        './img/2Enemy/3Orcinus/2floating/12.png',
        './img/2Enemy/3Orcinus/2floating/13.png'
    ];

    ORCINUS_IMAGES_ATTACKING = [
        './img/2Enemy/3Orcinus/Attack/1.png',
        './img/2Enemy/3Orcinus/Attack/2.png',
        './img/2Enemy/3Orcinus/Attack/3.png',
        './img/2Enemy/3Orcinus/Attack/4.png',
        './img/2Enemy/3Orcinus/Attack/5.png',
        './img/2Enemy/3Orcinus/Attack/6.png'
    ];

    ORCINUS_IMAGES_HURT_POISONED = [
        './img/2Enemy/3Orcinus/Hurt/1.png',
        './img/2Enemy/3Orcinus/Hurt/2.png',
        './img/2Enemy/3Orcinus/Hurt/3.png',
        './img/2Enemy/3Orcinus/Hurt/4.png'
    ];

    ORCINUS_IMAGES_DEAD_POISONED = [
        './img/2Enemy/3Orcinus/Dead/Dead1.png',
        './img/2Enemy/3Orcinus/Dead/Dead2.png',
        './img/2Enemy/3Orcinus/Dead/Dead3.png',
        './img/2Enemy/3Orcinus/Dead/Dead4.png',
        './img/2Enemy/3Orcinus/Dead/Dead5.png',
        './img/2Enemy/3Orcinus/Dead/Dead6.png'
    ];

    currentImage = 0;

    constructor() {
        super();
        this.loadImage('./img/2Enemy/3Orcinus/2floating/1.png');
        this.loadImages(this.ORCINUS_IMAGES_SWIMMING);
        this.loadImages(this.ORCINUS_IMAGES_INTRODUCE);
        this.loadImages(this.ORCINUS_IMAGES_ATTACKING);
        this.loadImages(this.ORCINUS_IMAGES_HURT_POISONED);
        this.loadImages(this.ORCINUS_IMAGES_DEAD_POISONED);
        this.height = 256;
        this.width = 512;
        this.x = 1000;
        this.y = 100;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.currentState = 'SWIMMING';
        setInterval(() => {
            this.playAnimation();
        }, 1000 / 15);
    }

    playAnimation() {
        let images;
        switch (this.currentState) {
            case 'SWIMMING':
                images = this.ORCINUS_IMAGES_SWIMMING;
                break;
            case 'INTRODUCE':
                images = this.ORCINUS_IMAGES_INTRODUCE;
                break;
            case 'ATTACKING':
                images = this.ORCINUS_IMAGES_ATTACKING;
                break;
            case 'HURT':
                images = this.ORCINUS_IMAGES_HURT_POISONED;
                break;
            case 'DEAD':
                images = this.ORCINUS_IMAGES_DEAD_POISONED;
                break;
            default:
                images = this.ORCINUS_IMAGES_SWIMMING;
        }
        this.playSwimAnimation(images);
    }

}