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
    this.height = 256;
    this.width = 256;
    this.y = 256;
    this.speed = 10;    
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
    let images;
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
    this.playSwimAnimation(images);
  }

  updateCharacter() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.D) {
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
    if (this.world.keyboard.E) {
      if (this.poisonActive) {
        this.attackPoisonedBubbles();
        this.currentState = 'ATTACK_BUBBLES_POISONED';
      } else {
        this.attackBubbles();
        this.currentState = 'ATTACK_BUBBLES';
      }
    }
    if (this.world.keyboard.F) {
      this.attackFin();
      this.currentState = 'ATTACK_FIN';
    }
    this.playAnimation();
    this.stayInBounds();
  }

  stayInBounds() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.world.level_end_x) {
      this.x = this.world.level_end_x - this.width;
    }
    if (this.y < -100) {
      this.y = -100;
    }
    if (this.y + this.height > 500) {
      this.y = 500 - this.height;
    }
  }

  spawnBubble(poisoned) {
    let bubble = new Bubble(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.otherDirection,
      poisoned
    );
    this.world.bubbles.push(bubble);
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

  playAttackAnimation(images) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < images.length) {
        this.img = this.imageCache[images[i]];
        i++;
      } else {
        clearInterval(interval);
        this.loadImages(this.IMAGES_SWIMMING);
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
}
