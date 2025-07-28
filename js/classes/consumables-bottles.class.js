class Bottle extends CollectableObject {
    constructor(x, y) {
        super(x, y, 45, 45);
        this.setAnimation([
            './img/collectables/bottle/1.png',
            './img/collectables/bottle/2.png',
            './img/collectables/bottle/3.png',
            './img/collectables/bottle/4.png',
            './img/collectables/bottle/5.png',
            './img/collectables/bottle/6.png',
            './img/collectables/bottle/7.png',
            './img/collectables/bottle/8.png'
        ]);
    }
}