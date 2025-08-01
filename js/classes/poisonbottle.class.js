class PoisonBottle extends CollectableObject {

    IMAGES = [
        './img/4Marcadores/collectables7poision/Animada/1.png',
        './img/4Marcadores/collectables7poision/Animada/2.png',
        './img/4Marcadores/collectables7poision/Animada/3.png',
        './img/4Marcadores/collectables7poision/Animada/4.png',
        './img/4Marcadores/collectables7poision/Animada/5.png',
        './img/4Marcadores/collectables7poision/Animada/6.png',
        './img/4Marcadores/collectables7poision/Animada/7.png',
        './img/4Marcadores/collectables7poision/Animada/8.png',
    ];

    IMAGE_DAY_LEFT = './img/4Marcadores/collectables/poision/LightLeft.png';
    IMAGE_DAY_LEFT = './img/4Marcadores/collectables/poision/LightRight.png';

    IMAGE_NIGHT_LEFT = './img/4Marcadores/collectables/poision/DarkLeft.png';
    IMAGE_NIGHT_RIGHT = './img/4Marcadores/collectables/poision/DarkRight.png';

    constructor(x, y) {
        super(x, y, 48, 48);
        this.type = 'collectable';
        this.collectType = 'poison';
        this.loadImage('./img/4Marcadores/statusbar/Poison/poison.png');
    }

    onCollision(player) {
        if (player instanceof Character) {
            player.poisonCount = (player.poisonCount || 0) + 1;
            this.collected = true;
        }
    }
}