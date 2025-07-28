class Level {
    constructor(config) {
        this.enemies = config.enemies;
        this.backgroundTheme = config.backgroundTheme || 'day';
        this.level_end_x = config.level_end_x || 1280 * 10;
    }
}