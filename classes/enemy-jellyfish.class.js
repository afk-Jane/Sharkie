class Jellyfish extends MovableObject {
    IMAGES_JELLYFISH_NORMAL_SWIM_PURPLE = [
        'img/2Enemy/2Jellyfish/Regular-damage/Lila1.png',
        'img/2Enemy/2Jellyfish/Regular-damage/Lila2.png',
        'img/2Enemy/2Jellyfish/Regular-damage/Lila3.png',
        'img/2Enemy/2Jellyfish/Regular-damage/Lila4.png'
    ];

    IMAGES_JELLYFISH_DANGEROUS_SWIM_PINK = [
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink1.png',
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink2.png',
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink3.png',
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink4.png'
    ];

    IMAGES_JELLYFISH_DEAD_PINK = [
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink1.png',
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink2.png',
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink3.png',
        'img/2Enemy/2Jellyfish/Super-dangerous/Pink4.png'
    ];

    IMAGES_JELLYFISH_DEAD_PURPLE = [
        'img/2Enemy/2Jellyfish/Dead/Lila/L1.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/L2.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/L3.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/L4.png'
    ];

    currentImage = 0;

    
    constructor() {
        super();
        this.loadImage('./img/2Enemy/2Jellyfish/Super-dangerous/Pink1.png');
        this.loadImages(this.IMAGES_JELLYFISH_NORMAL_SWIM_PURPLE);
        this.loadImages(this.IMAGES_JELLYFISH_DANGEROUS_SWIM_PINK);
        this.loadImages(this.IMAGES_JELLYFISH_DEAD_PINK);
        this.loadImages(this.IMAGES_JELLYFISH_DEAD_PURPLE);
        this.x = 256 + Math.random() * 384;
        this.y = 32 + Math.random() * 288;
        this.height = 128;
        this.width = 64;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.currentState = 'SWIMMING';
        this.startAnimation();
    }

    startAnimation() {
        setInterval(() => this.playAnimation(), 1000 / 15);
    }

    playAnimation() {
        let images;

        if (this.currentState === 'DEAD') {
            images = this.dangerColor === 'pink' ? this.IMAGES_JELLYFISH_DEAD_PINK : this.IMAGES_JELLYFISH_DEAD_PURPLE;
        } else if (this.currentState === 'DANGEROUS') {
            images = this.IMAGES_JELLYFISH_DANGEROUS_SWIM_PINK;
        } else {
            images = this.IMAGES_JELLYFISH_NORMAL_SWIM_PURPLE;
        }

        this.playSwimAnimation(images);
    }

    checkProximity(sharkie) {
        const distance = Math.abs(this.x - sharkie.x);
        if (distance < 150 && this.currentState !== 'DEAD') {
            this.currentState = 'DANGEROUS';
        } else if (distance >= 150 && this.currentState !== 'DEAD') {
            this.currentState = 'SWIMMING';
        }
    }

    die() {
        this.currentState = 'DEAD';
    }

    initEnemyBehavior() {
        setInterval(() => {
            this.enemies.forEach(enemy => {
                if (enemy instanceof Jellyfish && enemy.color === 'purple') {
                    let distance = Math.abs(enemy.x - this.character.x);
                    if (distance < 150) {
                        enemy.becomeDangerous();
                    } else {
                        enemy.becomeCalm();
                    }
                }
            });
        }, 200); 
    }
}