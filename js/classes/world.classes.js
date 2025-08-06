class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character;
    enemies = [];
    collisions = [];
    healthbar = new Healthbar();
    //coinbar = new Coinbar();
    poisonbar = new Poisonbar(); //this.poisonbar.setPoison(this.poisonbar.currentPoison + 1);
    coins = [];
    bottles = [];
    bubbles = [];

    layerManager;
    level_end_x;

    constructor(canvas, level, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        const theme = level.backgroundTheme || 'night';
        this.barriers = level.barriers || [];
        this.enemies = level.enemies || [];
        this.coins = level.coins || [];
        this.bottles = level.bottles || [];
        this.bottles = (level.bottles || []);
        this.bottles.forEach(bottle => {
            if (typeof bottle.setTheme === 'function') {
                bottle.setTheme(level.backgroundTheme || 'night');
            }
        });
        this.level_end_x = level.level_end_x || 1280 * 10;
        this.character = new Character();
        this.character.world = this;
        this.collisions = [this.character, ...this.enemies] || [];
        this.layerManager = new LayerManager({
            backgroundTheme: level.backgroundTheme || 'day',
            levelEndX: this.level_end_x
        });
        this.collisionManager = new CollisionManager();
        this.collisionManager.register(this.character);
        this.enemies.forEach(enemy => this.collisionManager.register(enemy));
        this.coins.forEach(coin => this.collisionManager.register(coin));
        this.bottles.forEach(bottle => this.collisionManager.register(bottle));
        this.barriers.forEach(barrier => this.collisionManager.register(barrier));
        this.bubble = [];
        this.setWorld();
        this.draw();
        //this.initEnemyBehavior();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCamera();
        this.ctx.save();
        this.ctx.translate(-this.camera_x, 0);
        if (!this.paused) {
            this.updateCharacterLogic();
            this.collisionManager.checkCollisions();
        }
        this.updateCharacterLogic();
        this.drawWorld();
        this.ctx.restore();
        this.drawUI();
        this.collisionManager.checkCollisions();
        requestAnimationFrame(() => this.draw());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateCamera() {
        const center = this.canvas.width / 2;
        if (this.character.x > center) {
            this.camera_x = this.character.x - center;
        } else {
            this.camera_x = 0;
        }
    }

    updateCharacterLogic() {
        this.character.updateCharacter();
        if (this.keyboard.FIN && !this.finCooldown) {
            this.createFinAttackHitbox();
        }
        this.updateBubbles();
    }

    drawWorld() {
        this.layerManager.render(this.ctx);
        this.updateObjects(this.barriers);
        this.addObjectToMap(this.barriers);
        this.updateObjects(this.coins);
        this.updateObjects(this.bottles);
        this.updateObjects(this.enemies);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
        this.addObjectToMap(this.enemies);
        this.drawCharacter();
        this.updateObjects(this.bubbles);
        this.addObjectToMap(this.bubbles);
    }

    updateObjects(objects) {
        if (!Array.isArray(objects)) return;
        objects.forEach(obj => {
            if (typeof obj.update === 'function') {
                obj.update();
            }
        });
    }

    drawCharacter() {
        this.character.draw(this.ctx);
    }

    drawUI() {
        this.addObjectToMap(this.healthbar);
        this.addObjectToMap(this.poisonbar);
        //this.addObjectToMap(this.coinbar);
    }

    updateBubbles() {
        this.bubbles.forEach(b => b.move());
        this.bubbles = this.bubbles.filter(b => b.x + b.width > 0 && b.x < this.level_end_x);
    }

    createFinAttackHitbox() {
        const direction = this.character.otherDirection ? -1 : 1;
        const hitbox = {
            x: this.character.x + direction * this.character.width * 0.8,
            y: this.character.y + this.character.height / 2 - 20,
            width: 40,
            height: 40,
            type: 'melee',
            onCollision: (enemy) => {
                if (typeof enemy.takeDamage === 'function') {
                    enemy.takeDamage();
                }
            }
        };
        hitbox.draw = (ctx) => {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        };
        this.collisionManager.register(hitbox);
        setTimeout(() => {
            this.collisionManager.unregister(hitbox);
        }, 100);
        this.finCooldown = true;
        setTimeout(() => this.finCooldown = false, 400);
    }

    addObjectToMap(objects){
        if (!objects) return;
        if (!Array.isArray(objects)) {
            objects = [objects];
        }
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(movObj) {
        if (!movObj || (typeof movObj.isImageLoaded === 'function' && !movObj.isImageLoaded())) {
                return;
            }

            if (movObj instanceof Sunbeam) {
                movObj.draw(this.ctx);
                return;
            }

            if (typeof movObj.draw === 'function' && !(movObj instanceof Character)) {
                movObj.draw(this.ctx);
                return;
            }

            if (movObj.otherDirection) {
                this.ctx.save();
                this.ctx.translate(movObj.x + movObj.width, movObj.y);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(movObj.img, 0, 0, movObj.width, movObj.height);
                this.ctx.restore();
            } else {
                this.ctx.drawImage(movObj.img, movObj.x, movObj.y, movObj.width, movObj.height);
            }

            if (movObj instanceof MovableObject && typeof movObj.drawFrame === 'function') {
                movObj.drawFrame(this.ctx);
            }
    }    
    

    flipImage(movObj) {
        this.ctx.save();
        this.ctx.translate(movObj.x + movObj.width, movObj.y); 
        this.ctx.scale(-1, 1);
    }
    
    flipImageBack() {
        this.ctx.restore();
    }

    //initEnemyBehavior() {}

}