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
        this.energy = 100;
        this.height = 256;
        this.width = 320;
        this.x = 5900; //11600
        this.y = 100;
        this.visible = false;
        this.introScale = 2.0; 
        this.frameInterval = 100;
        this.lastFrameTime = Date.now();
        this.currentState = 'SWIMMING';
        this.type = 'enemy';
    }

    draw(ctx) {
        if (!this.visible && this.currentState !== 'INTRODUCE') return;
        if (this.currentState === 'INTRODUCE') {
            const img = this.imageCache[this.ORCINUS_IMAGES_INTRODUCE[this.currentImage]];
            if (img) {
                const targetW = this.width * this.introScale;
                const targetH = this.height * this.introScale;
                const ratio = Math.min(targetW / img.width, targetH / img.height);
                const drawW = Math.round(img.width * ratio);
                const drawH = Math.round(img.height * ratio);
                const drawX = ctx.canvas.width - drawW - 20;
                const drawY = 20;
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
                ctx.restore();
            }
        } else {
            if (!this.visible) return;
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
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

    introAnimationFinished() {
        return this.currentImage >= this.ORCINUS_IMAGES_INTRODUCE.length - 1;
    }

    playSwimAnimation(images) {
        let now = new Date().getTime();
        let interval = (this.currentState === 'INTRODUCE') ? 300 : this.frameInterval;
        if (now - this.lastFrameTime > interval) {
            this.lastFrameTime = now;
            if (this.currentState === 'INTRODUCE') {
                if (this.currentImage < images.length - 1) {
                    this.currentImage++;
                }
            } else {
                this.currentImage = (this.currentImage + 1) % images.length;
            }
        }
        const imgPath = images[this.currentImage];
        if (this.imageCache[imgPath]) {
            this.img = this.imageCache[imgPath];
        }
    }

    update(sharkie, world) {
        const distance = Math.abs(this.x - sharkie.x);
        if (this.currentState === 'SWIMMING' && distance < 530 && !this.introStarted) {
            this.currentState = 'INTRODUCE';
            this.currentImage = 0;
            this.introStarted = true;
            this.x += 200;
            this.y = 0;
            if (world) {
                world.introActive = true;
            }
        }
        if (this.currentState === 'INTRODUCE' && this.introAnimationFinished()) {
            this.currentState = 'SWIMMING';
            this.currentImage = 0;
                const worldX = world.camera_x + (ctx.canvas.width - this.width - 40); 
    const worldY = world.camera_y + 50; // Offset anpassen

    this.x = worldX;
    this.y = worldY;
            if (world) world.introActive = false;
            if (world && typeof world.resetCamera === 'function') {
                world.resetCamera();
            }
        }
        if (this.currentState === 'ATTACKING') {
            // Hier Boss-Angriffslogik
        }
        if (this.currentState === 'HURT') {
            
        }
        if (this.currentState === 'DEAD') {
            // Hier win blabla
        }
        this.playAnimation();
    }

    onCollision(source) {
        if (source.type === 'melee' || source.type === 'projectile') {
            this.takeDamage(source.type, source.x, source);
        }
        if (source.type === 'player') {
            if (typeof source.takeDamage === 'function') {
                source.takeDamage(20);
            }
        }
    }
}