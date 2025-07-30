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
        if (this.currentState === 'DEAD') return;
        const isPlayer = source.type === 'player';
        const isAttack = source.type === 'projectile' || source.type === 'melee';
        if ((isPlayer || isAttack) && this.currentState === 'SWIMMING') {
            this.currentState = 'TRANSITION';
            this.currentImage = 0;
            return;
        }
        if ((isPlayer || isAttack) && this.currentState === 'ATTACKING') {
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
        case 'ATTACKING':
            this.playSwimAnimation(this.ATTACK_IMAGES_ALL_SKINS[this.skinIndex]);
            break;
        case 'DEAD':
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
            this.deadAnimationFinished = true;
        }
    }
}