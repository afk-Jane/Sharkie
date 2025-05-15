class Level {
    constructor(config) {
        this.enemies = config.enemies;
        this.backgroundTheme = config.backgroundMode || 'day';
        this.level_end_x = config.level_end_x || 720 * 10;
    }
}