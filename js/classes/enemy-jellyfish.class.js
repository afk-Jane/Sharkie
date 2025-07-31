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
        'img/2Enemy/2Jellyfish/Dead/Pink/P1.png',
        'img/2Enemy/2Jellyfish/Dead/Pink/P2.png',
        'img/2Enemy/2Jellyfish/Dead/Pink/P3.png',
        'img/2Enemy/2Jellyfish/Dead/Pink/P4.png'
    ];

    IMAGES_JELLYFISH_DEAD_PINK_WITHOUT_BUBBLE = [
        'img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P1-without-bubble.png',
        'img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P2-without-bubble.png',
        'img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P3-without-bubble.png',
        'img/2Enemy/2JellyfishDead/Pink/without-bubble/P4-without-bubble.png'
    ];

    IMAGES_JELLYFISH_DEAD_PURPLE = [
        'img/2Enemy/2Jellyfish/Dead/Lila/L1.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/L2.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/L3.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/L4.png'
    ];

    IMAGES_JELLYFISH_DEAD_PURPLE_WITHOUT_BUBBLE = [
        'img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L1-without-bubble.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L2-without-bubble.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L3-without-bubble.png',
        'img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L4-without-bubble.png'
    ];

    currentImage = 0;

    constructor() {
        super();
        this.deadAnimationFinished = false;
        this.loadImage('./img/2Enemy/2Jellyfish/Super-dangerous/Pink1.png');
        this.loadImages(this.IMAGES_JELLYFISH_NORMAL_SWIM_PURPLE);
        this.loadImages(this.IMAGES_JELLYFISH_DANGEROUS_SWIM_PINK);
        this.loadImages(this.IMAGES_JELLYFISH_DEAD_PINK);
        this.loadImages(this.IMAGES_JELLYFISH_DEAD_PURPLE);
        this.x = 256 + Math.random() * 384;
        this.y = 32 + Math.random() * 288;
        this.energy = 20;
        this.height = 128;
        this.width = 64;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.currentState = 'SWIMMING';
        this.type = 'enemy';
        this.startAnimation();
    }

    startAnimation() {
        setInterval(() => this.playAnimation(), 1000 / 15);
    }

    playDeathAnimation(images) {
        if (this.currentImage < images.length) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        } else {
            this.deadAnimationFinished = true;
        }
    }

    playAnimation() {
        let images;
         if (this.currentState === 'DEAD') {
            images = this.dangerColor === 'pink'
                ? this.IMAGES_JELLYFISH_DEAD_PINK
                : this.IMAGES_JELLYFISH_DEAD_PURPLE;

            if (!this.deadAnimationFinished) {
                this.playDeathAnimation(images);
            }
            return;
        }
        if (this.currentState === 'DANGEROUS') {
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
        this.currentImage = 0;
        this.deadAnimationFinished = false;
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

    onCollision(source) {
        if (source.type === 'player' || source.type === 'melee' || source.type === 'projectile') {
            this.takeDamage();
        }
    }

    takeDamage() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.markForRemoval = true;

        }
    }
}
