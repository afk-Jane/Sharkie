class Healthbar extends Statusbar {

    IMAGES = [
        './img/4Marcadores/statusbar/Life/0_hp.png',
        './img/4Marcadores/statusbar/Life/20_hp.png',
        './img/4Marcadores/statusbar/Life/40_hp.png',
        './img/4Marcadores/statusbar/Life/60_hp.png',
        './img/4Marcadores/statusbar/Life/80_hp.png',
        './img/4Marcadores/statusbar/Life/100_hp.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 8;
        this.y = -12;
        this.setPercentage(100);

    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else if (this.percentage > 0) {
            return 0;
        }
    }
}