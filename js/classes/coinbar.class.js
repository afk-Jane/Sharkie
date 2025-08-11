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
        this.coinImg = new Image();
        this.coinImg.src = this.COIN_IMAGE;
        this.coinImg.onload = () => {
            this.imageCache[this.COIN_IMAGE] = this.coinImg;
        };
        this.loadImages(this.IMAGES);
        this.setCoins(0);
    }

    setCoins(count) {
        this.coins = count;
        let index = 0;
        if (this.totalCoins) {
            const percent = this.coins / this.totalCoins;
            if (percent >= 1) index = 5;
            else if (percent >= 0.8) index = 4;
            else if (percent >= 0.6) index = 3;
            else if (percent >= 0.4) index = 2;
            else if (percent >= 0.2) index = 1;
        } else {
            if (this.coins >= 100) index = 5;
            else if (this.coins >= 80) index = 4;
            else if (this.coins >= 60) index = 3;
            else if (this.coins >= 40) index = 2;
            else if (this.coins >= 20) index = 1;
        }
        this.img = this.imageCache[this.IMAGES[index]];
    }

    draw(ctx) {
        const coinImg = this.imageCache[this.COIN_IMAGE];
        if (this.showCounter) {
            const coinOffsetX = 10;
            const coinOffsetY = 18;
            const textOffsetX = 38;
            const textOffsetY = 24; 
            if (coinImg) {
                ctx.drawImage(coinImg, this.x + coinOffsetX, this.y + coinOffsetY, 28, 28);
            }
            ctx.fillStyle = 'gold';
            ctx.font = 'bold 24px LuckiestGuy, Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(
                `x ${this.coins}`,
                this.x + coinOffsetX + textOffsetX,
                this.y + coinOffsetY + textOffsetY
            );
        } else {
            if (this.img) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
        }
    }

}