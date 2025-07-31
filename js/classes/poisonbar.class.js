class Poisonbar extends Statusbar {

    IMAGES = [
        './img/4Marcadores/statusbar/poison/0_.png',
        './img/4Marcadores/statusbar/poison/20_.png',
        './img/4Marcadores/statusbar/poison/40_.png',
        './img/4Marcadores/statusbar/poison/60_.png',
        './img/4Marcadores/statusbar/poison/80_.png',
        './img/4Marcadores/statusbar/poison/100_.png'
    ];

    
    maxPoison = 5;
    currentPoison = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 8;
        this.y = 40;
        this.setPoison(0);
    }

    setPoison(amount) {
        this.currentPoison = Math.max(0, Math.min(this.maxPoison, amount));
        const percentage = (this.currentPoison / this.maxPoison) * 100;
        const path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage === 100) return 5;
        if (percentage > 80) return 4;
        if (percentage > 60) return 3;
        if (percentage > 40) return 2;
        if (percentage > 20) return 1;
        return 0;
    }
}