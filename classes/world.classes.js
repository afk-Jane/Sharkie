class World {
    level_end_x = 720 * 10;

    backgroundObjects = [];

    /*barriers = [
        new Barrier('./img/3Background/Barrier/2.png', 360, 719),
        new Barrier('./img/3Background/Barrier/1.png', )
    ]
    */

    coins = [];
    bottles = [];

    canvas;
    ctx;
    camera_x = -100;

    constructor(canvas) {
        this.level_end_x = 720 * 10;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.camera_x = 0;
        this.light = [];
        this.initSunbeams();
        this.createBackground();
        this.character = new Character();
        this.bubbles = [];
        this.character.world = this;
        this.draw();
        this.setWorld();
        this.initEnemyBehavior();
    }

    setWorld() {
        this.character.world = this;
    }

    updateBubbles() {
        this.bubbles.forEach(b => b.move());
        this.bubbles = this.bubbles.filter(b => b.x + b.width > 0 && b.x < this.canvas.width);
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
        this.addObjectToMap(this.backgroundObjects);
        //this.addObjectToMap(this.barriers);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.bubbles);
        this.updateSunbeams();
        this.addObjectToMap(this.light);
        this.ctx.restore();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
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
            this.flipImage(movObj);
            this.ctx.drawImage(movObj.img, 0, 0, movObj.width, movObj.height);
            this.flipImageBack();
        } else {
            this.ctx.drawImage(movObj.img, movObj.x, movObj.y, movObj.width, movObj.height);
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

    createBackground() {
        let layers = [
            '5Water',
            '3Fondo1',
            '4Fondo2',
            '2Floor'
        ];
        for (let i = 0; i < 5; i++) { 
            for (let j = 0; j < layers.length; j++) {
                let layer = layers[j];
                let x1 = i * 2 * 720;
                let x2 = x1 + 720;
                this.backgroundObjects.push(new BackgroundObject('./img/3Background/Layers/' + layer + '/D1.png', x1));
                this.backgroundObjects.push(new BackgroundObject('./img/3Background/Layers/' + layer + '/D2.png', x2));
            }
        }
    }

    initSunbeams() {
        for (let i = 0; i < 10; i++) {
            this.light.push(new Sunbeam({
                x: Math.random() * this.level_end_x,
                y: 0,
                width: 720,
                height: 460,
                opacity: 0.25,
                speed: 0.15,
                resetOffset: this.level_end_x + Math.random() * 500
            }));
        }
    
        for (let i = 0; i < 16; i++) {
            this.light.push(new Sunbeam({
                x: Math.random() * this.level_end_x,
                y: 0,
                width: 480,
                height: 320,
                opacity: 0.15,
                speed: 0.25,
                resetOffset: this.level_end_x + Math.random() * 300
            }));
        }
    }
    
    updateSunbeams() {
        this.light.forEach(beam => beam.move());
    }
}