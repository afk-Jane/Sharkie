class World {
    character = new Character();
    enemies = [
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
    ];

    backgroundObjects = [
        new BackgroundObject('./img/3. Background/Legacy/Layers/5. Water/d1.png', 0, 100),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/5. Water/D2.png', 719),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/5. Water/d1.png', 719 * 2),
        new BackgroundObject('./img/3. Background/Legacy/Layers/3.Fondo 1/D1.png', 0, 100),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/3.Fondo 1/D2.png', 719),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/3.Fondo 1/D1.png', 719 * 2),
        new BackgroundObject('./img/3. Background/Legacy/Layers/4.Fondo 2/D1.png', 0, 100),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/4.Fondo 2/D2.png', 719),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/4.Fondo 2/D1.png', 719 * 2),
        new BackgroundObject('./img/3. Background/Legacy/Layers/2. Floor/D1.png', 0, 100),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/2. Floor/D2.png', 719),
        //new BackgroundObject('./img/3. Background/Legacy/Layers/2. Floor/D2.png', 719 * 2),
    ];

    /*barriers = [
        new Barrier('./img/3. Background/Barrier/2.png', 360, 719),
        new Barrier('./img/3. Background/Barrier/1.png', )
    ]
    */

    light = [new Sunbeam(), new Sunbeam()]; //class noch mal anschauen und constructor fixen?
    coins = [];
    bottles = [];

    canvas;
    ctx;
    keyboard;
    //camera_x = -100;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.character = new Character();
        this.character.world = this;
        this.draw();
        //this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);
        this.character.swim();
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.barriers);
        this.addObjectToMap(this.light);
        this.addObjectToMap(this.enemies);
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.bottles);
        //this.translate(-this.camera_x, 0);
        this.addToMap(this.character);
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

    addToMap(obj) {
        if (obj.img && obj.img.complete) {
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        }
    }
}