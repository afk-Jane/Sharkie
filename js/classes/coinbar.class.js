class Coinbar extends Statusbar {

    COIN_IMAGE = './img/4Marcadores/collectables/Coins/1.png"';

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
        this.y = 56;
        this.width = 200;
        this.height = 60;
        this.loadImage(this.COIN_IMAGE);
    }

    setCoins(count) {
        this.coins = count;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, 48, 48);
        ctx.font = 'bold 32px LuckiestGuy, Arial, sans-serif'
        ctx.fillStyle = 'gold';
        ctx.textAlign = 'left';
        ctx.fillText(`x ${this.coins}`, this.x + 60, this.y + 36);
    }
}