class SoundManager {
    constructor(src, loop = true) {
        this.audio = new Audio(src);
        this.audio.loop = loop;

        const settings = new SettingsManager();
        this.audio.volume = settings.get("volume") ?? 0.5;
        this.audio.muted = settings.get("mute") ?? false;
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume) {
        this.audio.volume = volume;
    }

    mute() {
        this.audio.muted = true;
    }

    unmute() {
        this.audio.muted = false;
    }
}