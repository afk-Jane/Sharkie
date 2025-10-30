class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    camera_x = 0;
    cameraTargetX = 0;
    cameraSmoothSpeed = 0.05;
    paused = false;
    lastFrameTime = 0;
    enemyCheckTimer = 0;
    enemyCheckInterval = 0.2;


    character;
    enemies = [];
    collisions = [];
    healthbar = new Healthbar();
    coinbar = new Coinbar();
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
        this.levelConfig = level.config || level;
        const theme = level.backgroundTheme || 'night';
        this.barriers = level.barriers || [];
        this.enemies = level.enemies || [];
        this.coins = level.coins || [];
        this.coinbar.totalCoins = this.coins.length;
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
        this.bubbles = [];
        this.setWorld();
        this.initEnemyBehavior();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    draw(timestamp) {
       if (!timestamp) timestamp = performance.now();
        if (!this.lastFrameTime) this.lastFrameTime = timestamp;
        const deltaTime = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        this.enemyCheckTimer += deltaTime;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCamera();
        if (!this.paused) {
            this.updateCharacterLogic(deltaTime);
            this.runIntervalJobs();
            this.collisionManager.checkCollisions();
            this.removeCollectedObjects();
        }
        this.drawWorld(deltaTime);
        this.drawUI();
        requestAnimationFrame((t) => this.draw(t));
    }

    runIntervalJobs() {
        if (this.enemyCheckTimer >= this.enemyCheckInterval) {
            this.enemyCheckTimer = 0;
            this.enemies.forEach(e => {
                if (e && typeof e.checkProximity === 'function') {
                    try { e.checkProximity(this.character); } catch (err) {}
                }
            });
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateCamera() {
        const center = this.canvas.width / 2;
        if (this.introActive) {
            const desiredX = this.cameraTargetX - center;
            this.camera_x += (desiredX - this.camera_x) * this.cameraSmoothSpeed;
        } else {
            if (this.character.x > center) {
                this.camera_x += ((this.character.x - center) - this.camera_x) * this.cameraSmoothSpeed;
            } else {
                this.camera_x += (0 - this.camera_x) * this.cameraSmoothSpeed;
            }
        }
        this.cameraZoom = 1;
    }

    zoomToBoss(boss, sharkie) {
        this.introActive = true;
        const centerX = (sharkie.x + boss.x) / 2;
        this.cameraTargetX = centerX;
        setTimeout(() => {
            this.cameraTargetX = sharkie.x;
            setTimeout(() => {
                this.introActive = false;
            }, 1000);
        }, 3000);
    }

   /* resetCamera() {
        this.introActive = false;
        this.cameraZoom = 1;
        this.updateCamera();
    }
        */

    updateCharacterLogic() {
        if (this.introActive) return;
        try { this.character.updateCharacter(deltaTime); } catch (err) {}
        if (this.keyboard.FIN && !this.finCooldown) {
            this.createFinAttackHitbox();
        }
        this.updateBubbles(deltaTime);
    }

    drawWorld() {
        this.layerManager.render(this.ctx, deltaTime);
        this.updateObjects(this.barriers);
        this.addObjectToMap(this.barriers);
        this.barriers.forEach(barrier => barrier.drawHitboxes(this.ctx));
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

    updateObjects(objects, deltaTime = 0) {
        if (!Array.isArray(objects)) return;
        objects.forEach(obj => {
            if (typeof obj.update === 'function') {
                try {
                    if (obj instanceof Jellyfish || obj instanceof Pufferfish) {
                        obj.update(this.character, deltaTime);
                    } else if (obj instanceof Boss_Orcinus) {
                        obj.update(this.character, this, deltaTime);
                    } else {
                        obj.update(deltaTime);
                    }
                } catch (err) {
                    try { obj.update(); } catch (err2) {}
                }
            }
        });
        for (let i = objects.length - 1; i >= 0; i--) {
            if (objects[i] && objects[i].markForRemoval) {
                if (this.collisionManager) this.collisionManager.unregister(objects[i]);
                objects.splice(i, 1);
            }
        }
    }

    drawCharacter() {
        this.character.draw(this.ctx);
    }

    drawUI() {
        this.addObjectToMap(this.healthbar);
        this.addObjectToMap(this.poisonbar);
        this.addObjectToMap(this.coinbar);
    }

    updateBubbles() {
        this.bubbles.forEach(b => b.move(deltaTime));
        this.bubbles = this.bubbles.filter(b => b.x + b.width > 0 && b.x < this.level_end_x);
        const survivors = [];
        for (const b of this.bubbles) {
            if (b.markForRemoval && !b.followDead) {
                if (this.collisionManager) this.collisionManager.unregister(b);
            } else {
                survivors.push(b);
            }
        }
        this.bubbles = survivors;
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
                    enemy.takeDamage('melee', this.character.x, null);
                    if (enemy.energy > 0) {
                        const dir = (enemy.x < this.character.x) ? -1 : 1;
                        enemy.x += dir * 20;
                        if (typeof enemy.applyKnockback === 'function') enemy.applyKnockback(dir);
                    }
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

    initEnemyBehavior(world) {
        setInterval(() => {
            this.enemies.forEach(e => {
            if (e && typeof e.checkProximity === 'function') {
                e.checkProximity(this.character);
            }
            });
        }, 200);
    }

    removeCollectedObjects() {
        this.coins = this.coins.filter(coin => !coin.collected);
        this.bottles = this.bottles.filter(bottle => !bottle.collected);
    }

    pauseGame() {
        this.paused = true;
        document.getElementById('pause-screen').classList.remove('display-none');
    }

    resumeGame() {
        this.paused = false;
        document.getElementById('pause-screen').classList.add('display-none');
    }
}