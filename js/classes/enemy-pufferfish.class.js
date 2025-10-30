class Pufferfish extends MovableObject {

    SWIM_IMAGES_ALL_SKINS = [
        [ 
        './img/2Enemy/1Pufferfish/1Swim/1swim1.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim2.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim3.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim4.png',
        './img/2Enemy/1Pufferfish/1Swim/1swim5.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/1Swim/2swim1.png',
        './img/2Enemy/1Pufferfish/1Swim/2swim2.png',
        './img/2Enemy/1Pufferfish/1Swim/2swim3.png',
        './img/2Enemy/1Pufferfish/1Swim/2swim4.png',
        './img/2Enemy/1Pufferfish/1Swim/2swim5.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/1Swim/3swim1.png',
        './img/2Enemy/1Pufferfish/1Swim/3swim2.png',
        './img/2Enemy/1Pufferfish/1Swim/3swim3.png',
        './img/2Enemy/1Pufferfish/1Swim/3swim4.png',
        './img/2Enemy/1Pufferfish/1Swim/3swim5.png'
        ]
    ];

    TRANSITION_IMAGES_ALL_SKINS = [
        [ 
        './img/2Enemy/1Pufferfish/2Transition/1transition1.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition2.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition3.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition4.png',
        './img/2Enemy/1Pufferfish/2Transition/1transition5.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/2Transition/2transition1.png',
        './img/2Enemy/1Pufferfish/2Transition/2transition2.png',
        './img/2Enemy/1Pufferfish/2Transition/2transition3.png',
        './img/2Enemy/1Pufferfish/2Transition/2transition4.png',
        './img/2Enemy/1Pufferfish/2Transition/2transition5.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/2Transition/3transition1.png',
        './img/2Enemy/1Pufferfish/2Transition/3transition2.png',
        './img/2Enemy/1Pufferfish/2Transition/3transition3.png',
        './img/2Enemy/1Pufferfish/2Transition/3transition4.png',
        './img/2Enemy/1Pufferfish/2Transition/3transition5.png'
        ]
    ];

    ATTACK_IMAGES_ALL_SKINS = [
        [ 
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim1.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim2.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim3.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim4.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/1bubbleswim5.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/3Bubbleeswim/2bubbleswim1.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/2bubbleswim2.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/2bubbleswim3.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/2bubbleswim4.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/2bubbleswim5.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/3Bubbleeswim/3bubbleswim1.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/3bubbleswim2.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/3bubbleswim3.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/3bubbleswim4.png',
        './img/2Enemy/1Pufferfish/3Bubbleeswim/3bubbleswim5.png'
        ]
    ];

    DEAD_IMAGES_ALL_SKINS = [
        [ 
        './img/2Enemy/1Pufferfish/4DIE/1Dead1.png',
        './img/2Enemy/1Pufferfish/4DIE/1Dead2.png',
        './img/2Enemy/1Pufferfish/4DIE/1Dead3.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/4DIE/2Dead1.png',
        './img/2Enemy/1Pufferfish/4DIE/2Dead2.png',
        './img/2Enemy/1Pufferfish/4DIE/2Dead3.png'
        ],
        [ 
        './img/2Enemy/1Pufferfish/4DIE/3Dead1.png',
        './img/2Enemy/1Pufferfish/4DIE/3Dead2.png',
        './img/2Enemy/1Pufferfish/4DIE/3Dead3.png'
        ]
    ];

    currentImage = 0;
    deadAnimationFinished = false;
    type = 'enemy';
    attackSpeed = 1.5;
    attackSpeedY = 1.2;
    maxVerticalStep = 2.2;

    constructor() {
        super();
        this.skinIndex = Math.floor(Math.random() * 3);
        this.loadImage(this.SWIM_IMAGES_ALL_SKINS[this.skinIndex][0]);
        this.loadImages(this.SWIM_IMAGES_ALL_SKINS[this.skinIndex]);
        this.loadImages(this.TRANSITION_IMAGES_ALL_SKINS[this.skinIndex]);
        this.loadImages(this.ATTACK_IMAGES_ALL_SKINS[this.skinIndex]);
        this.loadImages(this.DEAD_IMAGES_ALL_SKINS[this.skinIndex]);
        this.x = 256 + Math.random() * 500;
        this.y = 32 + Math.random() * 288;
        this.energy = 40;
        this.height = 48;
        this.width = 64;
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.currentState = 'SWIMMING';
        this.type = 'enemy';
        this.speedX = 0;
        this.attackSpeed = 1.5;
        setInterval(() => {
            this.playAnimation();
        }, 1000 / 15);
    }

    onCollision(source) {
        if (this.currentState === 'DEAD') return;
        const isAttack = source.type === 'projectile' || source.type === 'melee';
        if (isAttack && (this.currentState === 'SWIMMING' || this.currentState === 'ATTACKING' || this.currentState === 'TRANSITION')) {
            this.takeDamage(source.type, source.x, source);
        }
        if (source.type === 'player' && (this.currentState === 'TRANSITION' || this.currentState === 'ATTACKING')) {
            source.onCollision(this);
        }
    }
 
    checkProximity(sharkie) {
        if (!sharkie || typeof sharkie.x !== 'number') return;
        const distance = Math.abs(this.x - sharkie.x);
        if (distance < 256 && this.currentState === 'SWIMMING') {
            this.currentState = 'TRANSITION';
            this.currentImage = 0;
        } else if (distance > 512 && this.currentState === 'ATTACKING') {
            this.currentState = 'TRANSITION_BACKWARD';
            this.currentImage = this.TRANSITION_IMAGES_ALL_SKINS[this.skinIndex].length - 1;
        }
        if (this.currentState === 'ATTACKING') {
            this.speedX = sharkie.x < this.x ? -this.attackSpeed : this.attackSpeed;
            this.otherDirection = sharkie.x > this.x;
            const dy = sharkie.y - this.y;
            let vy = Math.sign(dy) * this.attackSpeedY;
            if (Math.abs(vy) > this.maxVerticalStep) {
                vy = Math.sign(vy) * this.maxVerticalStep;
            }
            this.speedY = vy;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }
    }

    playAnimation() {
        let images;
        switch (this.currentState) {
        case 'SWIMMING':
            this.playSwimAnimation(this.SWIM_IMAGES_ALL_SKINS[this.skinIndex]);
            break;
        case 'TRANSITION':
            const transitionImages = this.TRANSITION_IMAGES_ALL_SKINS[this.skinIndex];
            if (this.currentImage < transitionImages.length) {
                this.img = this.imageCache[transitionImages[this.currentImage]];
                this.currentImage++;
            } else {
                this.currentImage = 0;
                this.currentState = 'ATTACKING';
            }
            break;
        case 'TRANSITION_BACKWARD': {
            const frames = this.TRANSITION_IMAGES_ALL_SKINS[this.skinIndex];
            if (this.currentImage >= 0) {
                this.img = this.imageCache[frames[this.currentImage]];
                this.currentImage--;
            } else {
                this.currentImage = 0;
                this.currentState = 'SWIMMING';
            }
            break;
        }    
        case 'ATTACKING':
            this.playSwimAnimation(this.ATTACK_IMAGES_ALL_SKINS[this.skinIndex]);
            break;
        case 'DEAD':
            if (!this.deadAnimationFinished) {
                this.playDeathAnimation(this.DEAD_IMAGES_ALL_SKINS[this.skinIndex]);
            }
            break;
        case 'DEAD_WITHOUT_BUBBLES':
            if (!this.deadAnimationFinished) {
                this.playDeathAnimation(this.DEAD_IMAGES_ALL_SKINS[this.skinIndex]);
            }
            break;
        default:
            this.playSwimAnimation(this.SWIM_IMAGES_ALL_SKINS[this.skinIndex]);
        }
    }

    playDeathAnimation(images) {
        if (this.currentImage < images.length) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        } else {
            this.currentImage = 0;
        }
    }

    takeDamage(type = 'bubble', sharkieX = 0, bubble = null) {
        this.energy -= 20;
        if (this.energy <= 0 && this.currentState !== 'DEAD' && this.currentState !== 'DEAD_WITHOUT_BUBBLES') {
            if (type === 'melee') {
                this.currentState = 'DEAD_WITHOUT_BUBBLES';
                this.deadAnimationFinished = false;
                this.speedX = (this.x < sharkieX) ? -10 : 10;
                this.speedY = -4;
                this.currentImage = 0;
            } else if (type === 'bubble' || type === 'projectile') {
                this.currentState = 'DEAD';
                this.deadAnimationFinished = false;
                this.speedX = 0;
                this.speedY = -1;
                this.currentImage = 0;
                if (bubble) {
                    bubble.markForRemoval = false;
                    bubble.x = this.x;
                    bubble.y = this.y;
                    bubble.speedY = this.speedY;
                    bubble.speedX = this.speedX;
                    bubble.followDead = true;
                    this.bubbleRef = bubble;
                }
            }
        }
    }

    startDeathAnimation(interval) {
        clearInterval(this.deathAnimationInterval);
        this.deathAnimationInterval = setInterval(() => this.playAnimation(), interval);
    }

    update(sharkie) {
        this.checkProximity(sharkie);
        this.playAnimation();
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;
        if (this.currentState === 'DEAD') {
            this.y += this.speedY * deltaTime;
            if (this.bubbleRef && this.bubbleRef.followDead) {
                this.bubbleRef.x = this.x;
                this.bubbleRef.y = this.y;
                if (this.y + this.height < -10) {
                    this.bubbleRef.followDead = false;
                    this.bubbleRef.markForRemoval = true;
                    this.bubbleRef = null;
                }
            }
            if (this.y + this.height < -10) {
                this.markForRemoval = true;
            }
        } else if (this.currentState === 'DEAD_WITHOUT_BUBBLES') {
            this.x += this.speedX * deltaTime;
            this.y += this.speedY * deltaTime;
            if (this.y + this.height < -10 || this.x + this.width < -10 || this.x > 1280 + 10) {
                this.markForRemoval = true;
            }
        }
    }

    isDangerousToPlayer() {
        return this.currentState === 'TRANSITION' || this.currentState === 'ATTACKING';
    }

    applyKnockback(dir = 1) {
        if (this.currentState !== 'DEAD' && this.currentState !== 'DEAD_WITHOUT_BUBBLES') {
            this.x += dir * 14;
            this.y -= 4;
        }
    }



}