class Pufferfish extends MovableObject {
    IMAGES_PUFFERFISH_SWIM = [
        './img/2Enemy/1Pufferfish/1Swim/1swim2.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim3.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim4.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim5.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim1.png'
    ];

    IMAGES_PUFFERFISH_TRANSITION = [
        './img/2Enemy/1Pufferfish/2Transition/1transition1.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition2.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition3.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition4.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition5.png'
    ];

    IMAGES_PUFFERFISH_ATTACKING = [
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim1.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim2.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim3.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim4.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim5.png'
    ];

    IMAGES_PUFFERFISH_DEAD = [
        './img/2Enemy/1Pufferfish/4DIE/1Dead1.png',
        './img/2Enemy/1Pufferfish/4DIE/1Dead2.png',
        './img/2Enemy/1Pufferfish/4DIE/1Dead3.png'
    ];

    currentImage = 0;

    constructor() {
        super();
        this.loadImage('./img/2Enemy/1Pufferfish/1Swim/1swim1.png');
        this.loadImages(this.IMAGES_PUFFERFISH_SWIM);
        this.loadImages(this.IMAGES_PUFFERFISH_TRANSITION);
        this.loadImages(this.IMAGES_PUFFERFISH_ATTACKING);
        this.loadImages(this.IMAGES_PUFFERFISH_DEAD);
        this.x = 256 + Math.random() * 500;
        this.height = 48;
        this.width = 64;
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
                images = this.IMAGES_PUFFERFISH_SWIM;
                break;
            case 'TRANSITION':
                images = this.IMAGES_PUFFERFISH_TRANSITION;
                break;
            case 'ATTACKING':
                images = this.IMAGES_PUFFERFISH_ATTACKING;
                break;
            case 'DEAD':
                images = this.IMAGES_PUFFERFISH_DEAD;
                break;
            default:
                images = this.IMAGES_PUFFERFISH_SWIM;
        }
        this.playSwimAnimation(images);
    }
}