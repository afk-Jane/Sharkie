class Coinbar extends Statusbar {

    COIN_IMAGE = './img/4Marcadores/collectables/Coins/1.png';

    IMAGES = [
        './img/4Marcadores/statusbar/coins/0_coins.png',
        './img/4Marcadores/statusbar/coins/20_coins.png',
        './img/4Marcadores/statusbar/coins/40_coins.png',
        './img/4Marcadores/statusbar/coins/60_coins.png',
        './img/4Marcadores/statusbar/coins/80_coins.png',
        './img/4Marcadores/statusbar/coins/100_coins.png'
    ];
    

    coins = 0;

    constructor() {
        super();
        this.x = 8;
        this.y = 84;
        this.width = 200;
        this.height = 60;
        this.loadImage(this.COIN_IMAGE);
        this.loadImages(this.IMAGES)
    }

    setCoins(count) {
        this.coins = count;
    }

    draw(ctx) {
        if (this.showCounter) {
            ctx.drawImage(this.img, this.x, this.y, 48, 48);
            ctx.fillStyle = 'gold';
            ctx.font = 'bold 32px LuckiestGuy, Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`x ${this.coins}`, this.x + 60, this.y + 36);
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}