class Jellyfish extends MovableObject {

    colorConfig = {
        purple: {
            swim: [
                './img/2Enemy/2Jellyfish/Regular-damage/Lila1.png',
                './img/2Enemy/2Jellyfish/Regular-damage/Lila2.png',
                './img/2Enemy/2Jellyfish/Regular-damage/Lila3.png',
                './img/2Enemy/2Jellyfish/Regular-damage/Lila4.png'
            ],
            dead: [
                './img/2Enemy/2Jellyfish/Dead/Lila/L1.png',
                './img/2Enemy/2Jellyfish/Dead/Lila/L2.png',
                './img/2Enemy/2Jellyfish/Dead/Lila/L3.png',
                './img/2Enemy/2Jellyfish/Dead/Lila/L4.png'
            ],
            deadWithoutBubbles: [
                './img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L1-without-bubble.png',
                './img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L2-without-bubble.png',
                './img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L3-without-bubble.png',
                './img/2Enemy/2Jellyfish/Dead/Lila/withou-bubble/L4-without-bubble.png'
            ]
        },

        yellow: {
            swim: [
                './img/2Enemy/2Jellyfish/Regular-damage/Yellow1.png',
                './img/2Enemy/2Jellyfish/Regular-damage/Yellow2.png',
                './img/2Enemy/2Jellyfish/Regular-damage/Yellow3.png',
                './img/2Enemy/2Jellyfish/Regular-damage/Yellow4.png'
            ],
            dead: [
                './img/2Enemy/2Jellyfish/Dead/Yellow/y1.png',
                './img/2Enemy/2Jellyfish/Dead/Yellow/y2.png',
                './img/2Enemy/2Jellyfish/Dead/Yellow/y3.png',
                './img/2Enemy/2Jellyfish/Dead/Yellow/y4.png'
            ],
            deadWithoutBubbles: [
                './img/2Enemy/2Jellyfish/Dead/Yellow/without-bubbles/y1.png',
                './img/2Enemy/2Jellyfish/Dead/Yellow/without-bubbles/y2.png',
                './img/2Enemy/2Jellyfish/Dead/Yellow/without-bubbles/y3.png',
                './img/2Enemy/2Jellyfish/Dead/Yellow/without-bubbles/y4.png'
            ]
        },
        pink: {
            swim: [
                './img/2Enemy/2Jellyfish/Super-dangerous/Pink1.png',
                './img/2Enemy/2Jellyfish/Super-dangerous/Pink2.png',
                './img/2Enemy/2Jellyfish/Super-dangerous/Pink3.png',
                './img/2Enemy/2Jellyfish/Super-dangerous/Pink4.png'
            ],
            dead: [
                './img/2Enemy/2Jellyfish/Dead/Pink/P1.png',
                './img/2Enemy/2Jellyfish/Dead/Pink/P2.png',
                './img/2Enemy/2Jellyfish/Dead/Pink/P3.png',
                './img/2Enemy/2Jellyfish/Dead/Pink/P4.png'
            ],
            deadWithoutBubbles: [
                './img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P1-without-bubble.png',
                './img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P2-without-bubble.png',
                './img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P3-without-bubble.png',
                './img/2Enemy/2Jellyfish/Dead/Pink/without-bubble/P4-without-bubble.png'
            ]
        },
        green: {
            swim: [
                './img/2Enemy/2Jellyfish/Super-dangerous/Green1.png',
                './img/2Enemy/2Jellyfish/Super-dangerous/Green2.png',
                './img/2Enemy/2Jellyfish/Super-dangerous/Green3.png',
                './img/2Enemy/2Jellyfish/Super-dangerous/Green4.png'
            ],
            dead: [
                './img/2Enemy/2Jellyfish/Dead/green/g1.png',
                './img/2Enemy/2Jellyfish/Dead/green/g2.png',
                './img/2Enemy/2Jellyfish/Dead/green/g3.png',
                './img/2Enemy/2Jellyfish/Dead/green/g4.png'
            ],
            deadWithoutBubbles: [
                './img/2Enemy/2Jellyfish/Dead/green/without-bubbles/g1.png',
                './img/2Enemy/2Jellyfish/Dead/green/without-bubbles/g2.png',
                './img/2Enemy/2Jellyfish/Dead/green/without-bubbles/g3.png',
                './img/2Enemy/2Jellyfish/Dead/green/without-bubbles/g4.png'
            ]
        }
    };

    currentImage = 0;
    type = 'enemy';

    constructor(x, y, isElectric) {
        super();
        this.type = 'enemy';
        this.baseColor = Math.random() < 0.5 ? 'purple' : 'yellow';
        this.dangerousColor = this.baseColor === 'purple' ? 'pink' : 'green';
        this.currentColor = this.baseColor;

        this.isElectric = isElectric;
        this.deadAnimationFinished = false;
        this.currentState = 'SWIMMING';

        const cfg = this.colorConfig[this.baseColor];
        this.loadImage(cfg.swim[0]);
        this.loadImages(cfg.swim);
        this.loadImages(cfg.dead);
        this.loadImages(cfg.deadWithoutBubbles);

        const dangerCfg = this.colorConfig[this.dangerousColor];
        this.loadImages(dangerCfg.swim);
        this.loadImages(dangerCfg.dead);
        this.loadImages(dangerCfg.deadWithoutBubbles);

        this.x = x;
        this.y = y;
        this.energy = 20;
        this.height = 128;
        this.width = 64;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();

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
            images = this.colorConfig[this.currentColor].dead;
            if (!this.deadAnimationFinished) this.playDeathAnimation(images);
            return;
        }
        if (this.currentState === 'DANGEROUS') {
            images = this.colorConfig[this.dangerousColor].swim;
        } else {
            images = this.colorConfig[this.baseColor].swim;
        }
        this.playSwimAnimation(images);
    }

    checkProximity(sharkie) {
        const distance = Math.abs(this.x - sharkie.x);
        if (distance < 256 && this.currentState !== 'DEAD' && this.currentState !== 'DEAD_WITHOUT_BUBBLES') {
            this.currentState = 'DANGEROUS';
            this.currentColor = colorConfig[this.baseColorKey].dangerous;
        } else if (distance >= 256 && this.currentState !== 'DEAD' && this.currentState !== 'DEAD_WITHOUT_BUBBLES') {
            this.currentState = 'SWIMMING';
            this.currentColor = colorConfig[this.baseColorKey].base;
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
                    if (distance < 256) {
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

    takeDamage(type, sharkieX) {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.currentState = (type === 'bubble') ? 'DEAD' : 'DEAD_WITHOUT_BUBBLES';
            this.deadAnimationFinished = false;
            if (type === 'fin') {
                this.speedX = (this.x < sharkieX) ? -8 : 8;
                this.speedY = -3;
            }
        }
    }

    update(sharkie) {
        if (this.currentState === 'DEAD') {
            this.y -= 1;
        } else if (this.currentState === 'DEAD_WITHOUT_BUBBLES') {
            this.x += this.speedX;
            this.y += this.speedY;
        } else {
            this.swim();
            this.checkProximity(sharkie);
        }
    }

    becomeDangerous() {
        this.isDangerous = true;
        this.currentColor = this.dangerousColor;
        
    }
}
