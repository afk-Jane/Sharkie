class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character;
    enemies = [];
    collisions = [];
    coins = [];
    bottles = [];
    bubbles = [];

    layerManager;
    level_end_x;

    constructor(canvas, level, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.enemies = level.enemies || [];
        this.coins = level.coins || [];
        this.bottles = level.bottles || [];
        this.level_end_x = level.level_end_x || 1280 * 10;
        this.character = new Character();
        this.character.world = this;
        this.collisions = [this.character, ...this.enemies] || [];
        this.layerManager = new LayerManager({
            backgroundTheme: level.backgroundTheme || 'day',
            levelEndX: this.level_end_x
        });
        this.collisionManager = new CollisionManager();
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
        let center = this.canvas.width / 2;
        if (this.character.x > center) {
            this.camera_x = this.character.x - center;
        }
        this.ctx.save();
        this.ctx.translate(-this.camera_x, 0);
        this.character.updateCharacter();
        this.updateBubbles();
        this.layerManager.render(this.ctx);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.bubbles);
        this.ctx.restore();
        this.collisionManager.checkCollisions();
        requestAnimationFrame(() => this.draw());
    }

    updateBubbles() {
        this.bubbles.forEach(b => b.move());
        this.bubbles = this.bubbles.filter(b => b.x + b.width > 0 && b.x < this.level_end_x);
    }

    addObjectToMap(objects){
        if (!objects) return;
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(movObj) {
        if (!movObj.isImageLoaded()) {
            return;
        }
        if (movObj instanceof Sunbeam) {
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