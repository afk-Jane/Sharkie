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
    deadAnimationFinished = false;

    constructor() {
        super();
        this.loadImage('./img/2Enemy/1Pufferfish/1Swim/1swim1.png');
        this.loadImages(this.IMAGES_PUFFERFISH_SWIM);
        this.loadImages(this.IMAGES_PUFFERFISH_TRANSITION);
        this.loadImages(this.IMAGES_PUFFERFISH_ATTACKING);
        this.loadImages(this.IMAGES_PUFFERFISH_DEAD);
        this.x = 256 + Math.random() * 500;
        this.y = 32 + Math.random() * 288;
        this.height = 48;
        this.width = 64;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.currentState = 'SWIMMING';
        this.type = 'enemy';
        setInterval(() => {
            this.playAnimation();
        }, 1000 / 15);
    }

    onCollision(source) {
        if (source.type === 'player' || source.type === 'melee' || source.type === 'projectile') {
            this.takeDamage();
        }
    }

   takeDamage() {
        this.energy -= 20;
        if (this.energy <= 0 && this.currentState !== 'DEAD') {
            this.currentState = 'DEAD';
            this.currentImage = 0;
            this.deadAnimationFinished = false;
        }
    }

    playAnimation() {
        let images;
        switch (this.currentState) {
            case 'SWIMMING':
                images = this.IMAGES_PUFFERFISH_SWIM;
                this.playSwimAnimation(images);
                break;
            case 'TRANSITION':
                images = this.IMAGES_PUFFERFISH_TRANSITION;
                this.playSwimAnimation(images);
                break;
            case 'ATTACKING':
                images = this.IMAGES_PUFFERFISH_ATTACKING;
                this.playSwimAnimation(images);
                break;
            case 'DEAD':
                images = this.IMAGES_PUFFERFISH_DEAD;
                if (!this.deadAnimationFinished) {
                    this.playDeathAnimation(images);
                }
                break;
            default:
                images = this.IMAGES_PUFFERFISH_SWIM;
                this.playSwimAnimation(images);
        }
    }

    playDeathAnimation(images) {
        if (this.currentImage < images.length) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        } else {
            this.deadAnimationFinished = true;
        }
    }
}