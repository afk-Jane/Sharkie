class Character extends MovableObject {

  IMAGES_SWIMMING = [
    "./img/1Sharkie/3Swim/1.png",
    "./img/1Sharkie/3Swim/2.png",
    "./img/1Sharkie/3Swim/3.png",
    "./img/1Sharkie/3Swim/4.png",
    "./img/1Sharkie/3Swim/5.png",
    "./img/1Sharkie/3Swim/6.png",
  ];

  IMAGES_WAITING = [
    "./img/1Sharkie/1IDLE/1.png",
    "./img/1Sharkie/1IDLE/2.png",
    "./img/1Sharkie/1IDLE/3.png",
    "./img/1Sharkie/1IDLE/4.png",
    "./img/1Sharkie/1IDLE/5.png",
    "./img/1Sharkie/1IDLE/6.png",
    "./img/1Sharkie/1IDLE/7.png",
    "./img/1Sharkie/1IDLE/8.png",
    "./img/1Sharkie/1IDLE/9.png",
    "./img/1Sharkie/1IDLE/10.png",
    "./img/1Sharkie/1IDLE/11.png",
    "./img/1Sharkie/1IDLE/12.png",
    "./img/1Sharkie/1IDLE/13.png",
    "./img/1Sharkie/1IDLE/14.png",
    "./img/1Sharkie/1IDLE/15.png",
    "./img/1Sharkie/1IDLE/16.png",
    "./img/1Sharkie/1IDLE/17.png",
    "./img/1Sharkie/1IDLE/18.png",
  ];

  IMAGES_SLEEPING = [
    "./img/1Sharkie/2Long_IDLE/I1.png",
    "./img/1Sharkie/2Long_IDLE/I2.png",
    "./img/1Sharkie/2Long_IDLE/I3.png",
    "./img/1Sharkie/2Long_IDLE/I4.png",
    "./img/1Sharkie/2Long_IDLE/I5.png",
    "./img/1Sharkie/2Long_IDLE/I6.png",
    "./img/1Sharkie/2Long_IDLE/I7.png",
    "./img/1Sharkie/2Long_IDLE/I8.png",
    "./img/1Sharkie/2Long_IDLE/I9.png",
    "./img/1Sharkie/2Long_IDLE/I10.png",
    "./img/1Sharkie/2Long_IDLE/I11.png",
    "./img/1Sharkie/2Long_IDLE/I12.png",
    "./img/1Sharkie/2Long_IDLE/I13.png",
    "./img/1Sharkie/2Long_IDLE/I14.png",
  ];

  IMAGES_ATTACK_BUBBLES = [
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/1.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/2.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/3.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/4.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/5.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/6.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/7.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/8.png",
  ];

  IMAGES_ATTACK_BUBBLES_POISONED = [
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/1.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/2.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/3.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/4.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/5.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/6.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/7.png",
    "./img/1Sharkie/4Attack/Bubble-trap/poisoned-bubbles/8.png",
  ];

  IMAGES_ATTACK_BUBBLES_WITHOUT_BUBBLES = [
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/1.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/2.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/3.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/4.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/5.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/6.png",
    "./img/1Sharkie/4Attack/Bubble-trap/bubble/Without-Bubbles/7.png"
  ];

  IMAGES_ATTACK_FIN = [
    "./img/1Sharkie/4Attack/Fin-slap/1.png",
    "./img/1Sharkie/4Attack/Fin-slap/2.png",
    "./img/1Sharkie/4Attack/Fin-slap/3.png",
    "./img/1Sharkie/4Attack/Fin-slap/4.png",
    "./img/1Sharkie/4Attack/Fin-slap/5.png",
    "./img/1Sharkie/4Attack/Fin-slap/6.png",
    "./img/1Sharkie/4Attack/Fin-slap/7.png",
    "./img/1Sharkie/4Attack/Fin-slap/8.png",
  ];

  IMAGES_HURT = [
    "./img/1Sharkie/5Hurt/2Electric-shock/1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/o1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/o2.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/o1.png",
    "./img/1Sharkie/5Hurt/2Electric-shock/o2.png"
  ];

  currentImage = 0;
  bubbleCooldown = false;
  isAttacking = false;
  poisonCount = 0;
  poisonActive = false;
  currentAnimation = 'WAITING';

  constructor() {
    super();
    this.lastFrameTime = 0;
    this.frameInterval = 150;
    this.loadImage("./img/1Sharkie/3Swim/1.png");
    this.loadImages(this.IMAGES_WAITING);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_ATTACK_BUBBLES);
    this.loadImages(this.IMAGES_ATTACK_BUBBLES_POISONED); 
    this.loadImages(this.IMAGES_ATTACK_FIN); 
    this.loadImages(this.IMAGES_HURT);
    this.height = 128;
    this.width = 192;
    this.y = 256;
    this.speed = 10;
    this.type = 'player';
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  playAnimation() {
    if (this.isAttacking) return;
    let images;
    if (this.isHurt) {
      images = this.IMAGES_HURT;
    } else {
      switch (this.currentState) {
        case 'SWIMMING':
          images = this.IMAGES_SWIMMING;
          break;
        case 'WAITING':
          images = this.IMAGES_WAITING;
          break;
        case 'ATTACK_BUBBLES':
          images = this.IMAGES_ATTACK_BUBBLES;
          break;
        case 'ATTACK_BUBBLES_POISONED':
          images = this.IMAGES_ATTACK_BUBBLES_POISONED;
          break;
        case 'ATTACK_FIN':
          images = this.IMAGES_ATTACK_FIN;
          break;
        default:
          images = this.IMAGES_WAITING;
      }
    }
    this.playSwimAnimation(images);
  }

  updateCharacter() {
    if (this.isHurt) {
      this.currentState = 'HURT';
    } else if (this.world.keyboard.E) {
      if (this.poisonActive) {
        this.attackPoisonedBubbles();
        this.currentState = 'ATTACK_BUBBLES_POISONED';
      } else {
        this.attackBubbles();
        this.currentState = 'ATTACK_BUBBLES';
      }
    } else if (this.world.keyboard.F) {
      this.attackFin();
      this.currentState = 'ATTACK_FIN';
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.D) {
      this.moveRight();
      this.currentState = 'SWIMMING';
    } else if (this.world.keyboard.LEFT || this.world.keyboard.A) {
      this.moveLeft();
      this.currentState = 'SWIMMING';
    } else if (this.world.keyboard.UP || this.world.keyboard.W) {
      this.y -= this.speed;
      this.currentState = 'SWIMMING';
    } else if (this.world.keyboard.DOWN || this.world.keyboard.S) {
      this.y += this.speed;
      this.currentState = 'SWIMMING';
    } else {
      this.currentState = 'WAITING';
    }
    this.playAnimation();
    this.stayInBounds();
  }

  stayInBounds() {
    if (this.x < 2) {
      this.x = 2;
    }
    if (this.x + this.width > this.world.level_end_x) {
      this.x = this.world.level_end_x - this.width;
    }
    if (this.y < -4) {
      this.y = -4;
    }
    if (this.y + this.height > 690) {
      this.y = 690 - this.height;
    }
  }

  onCollision(enemyOrProjectile) {
    if (this.isInvincible) return;
    this.energy -= 10;
    this.isInvincible = true;
    this.isHurt = true;
    this.playHurtAnimation();
    setTimeout(() => this.isHurt = false, 300);
    setTimeout(() => this.isInvincible = false, 2000);
  }

  spawnBubble(poisoned) {
    let bubble = new Bubble(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.otherDirection,
      poisoned
    );
    if (this.world && this.world.bubbles) {
      this.world.bubbles.push(bubble);
    }
  }

  attackBubbles() {
    if (this.bubbleCooldown) return;
    this.bubbleCooldown = true;
    this.isAttacking = true;
    this.loadImages(this.IMAGES_ATTACK_BUBBLES);
    this.playAttackAnimation(this.IMAGES_ATTACK_BUBBLES, () => {
      this.isAttacking = false;
    });
    this.spawnBubble(false);
    setTimeout(() => (this.bubbleCooldown = false), 500);
  }

  attackPoisonedBubbles() {
    if (this.bubbleCooldown) return;
    this.bubbleCooldown = true;
    this.isAttacking = true;
    this.loadImages(this.IMAGES_ATTACK_BUBBLES_POISONED);
    this.playAttackAnimation(this.IMAGES_ATTACK_BUBBLES_POISONED, () => {
      this.isAttacking = false;
    });
    this.spawnBubble(true);
    setTimeout(() => (this.bubbleCooldown = false), 500);
  }

  tryActivatePoison() {
    if (this.poisonCount >= 5) {
      this.poisonActive = true;
      setTimeout(() => {
        this.poisonActive = false;
      }, 10000);
    } else {
      console.log("Not enough poison collected!");
    }
  }

  attackFin() {
    this.loadImages(this.IMAGES_ATTACK_FIN);
    this.playAttackAnimation(this.IMAGES_ATTACK_FIN);
    // Hier Hitbox der Gegner prüfen
  }

  playAttackAnimation(images, onComplete = () => {}) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < images.length) {
        const frame = this.imageCache[images[i]];
        if (frame) {
          this.img = frame;
        } else {
          console.warn("Missing image:", images[i]);
        }
        i++;
      } else {
        clearInterval(interval);
        this.img = this.imageCache[this.IMAGES_SWIMMING[0]];
        this.isAttacking = false;
        onComplete();
      }
    }, 50);
  }

  updateAttack() {
    if (this.isAttacking) return;
    if (this.world.keyboard.BUBBLE) {
      if (this.poisonActive) {
        this.attackPoisonedBubbles();
      } else {
        this.attackBubbles();
      }
    }
    if (this.world.keyboard.FIN) {
      this.attackFin();
    }
    if (this.world.keyboard.POISON) {
      this.tryActivatePoison();
    }
  }

  playHurtAnimation() {
    if (this.currentImage < this.IMAGES_HURT.length) {
        this.img = this.imageCache[this.IMAGES_HURT[this.currentImage]];
        this.currentImage++;
    } else {
        this.hurt = false;
        this.currentImage = 0;
    }
  }

  draw(ctx) {
    if (!this.isImageLoaded()) return;
    ctx.save();
    if (this.otherDirection) {
        ctx.translate(this.x + this.width, this.y);
        ctx.scale(-1, 1);
    } else {
        ctx.translate(this.x, this.y);
    }
    if (this.currentState === 'HURT') {
        ctx.drawImage(this.img, -this.width * 0.1, -this.height * 0.1, this.width * 1.2, this.height * 1.2);
    } else {
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
    }
    ctx.restore();
  }



}
