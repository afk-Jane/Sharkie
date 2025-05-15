class LayerManager {
    constructor(config) {
        this.backgroundTheme = config.backgroundTheme || 'day';
        console.log('[Config] Hintergrundmodus:', config.backgroundTheme);
        this.levelEndX = config.levelEndX || 720 * 10;
        this.backgroundLayers = [];
        this.sunbeams = [];

        this.initBackgroundLayers();
        this.initSunbeams();
    }

    initBackgroundLayers() {
        const layerTypes = ['5Water', '3Fondo1', '4Fondo2', '2Floor'];
        const themeLetter = this.backgroundTheme === 'night' ? 'D' : 'L';
        console.log('[LayerManager] Hintergrundmodus:', this.backgroundTheme);
        for (let i = 0; i < 5; i++) {
            for (let layer of layerTypes) {
                let x1 = i * 2 * 720;
                let x2 = x1 + 720;

                this.backgroundLayers.push(new BackgroundObject(`./img/3Background/Layers/${layer}/${themeLetter}1.png`, x1));
                this.backgroundLayers.push(new BackgroundObject(`./img/3Background/Layers/${layer}/${themeLetter}2.png`, x2));
            }
        }
    }

    initSunbeams() {
        let spacing = this.levelEndX / 10;
        for (let i = 0; i < 10; i++) {
            this.sunbeams.push(new Sunbeam({
                x: i * spacing,
                y: 0,
                width: 720,
                height: 460,
                opacity: 0.25,
                speed: 0.15,
                resetOffset: this.levelEndX + 500
            }));
        }
    
        spacing = this.levelEndX / 16;
        for (let i = 0; i < 16; i++) {
            this.sunbeams.push(new Sunbeam({
                x: i * spacing,
                y: 0,
                width: 480,
                height: 320,
                opacity: 0.15,
                speed: 0.25,
                resetOffset: this.levelEndX + 300
            }));
        }
    }

    render(ctx) {
        this.backgroundLayers.forEach(layer => layer.draw(ctx));
        this.sunbeams.forEach(sb => {
            sb.move();
            sb.draw(ctx);
        });
    }
}