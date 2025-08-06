class Level {
    constructor(config) {
        this.enemies = config.enemies;
        this.coins = config.coins || [];
        this.bottles = config.bottles || [];
        this.barriers = config.barriers || [];
        this.backgroundTheme = config.backgroundTheme || 'night';
        this.level_end_x = config.level_end_x || 1280 * 10;
    }
}