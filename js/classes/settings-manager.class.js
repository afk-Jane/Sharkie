class SettingsManager {
    static instance;

    constructor() {
        if (SettingsManager.instance) {
            return SettingsManager.instance;
        }
        this.settings = {
            mute: false,
            volume: 1.0,
            showCoinCounter: false
        };
        this.load();
        SettingsManager.instance = this;
    }

    static getInstance() {
        if (!SettingsManager.instance) {
            new SettingsManager();
        }
        return SettingsManager.instance;
    }

    set(key, value) {
        this.settings[key] = value;
        this.save();
    }

    get(key) {
        return this.settings[key];
    }

    toggle(key) {
        this.settings[key] = !this.settings[key];
        this.save();
        return this.settings[key];
    }

    save() {
        localStorage.setItem('game-settings', JSON.stringify(this.settings));
    }

    load() {
        const saved = localStorage.getItem('game-settings');
        if (saved) {
            this.settings = JSON.parse(saved);
        }
    }
}