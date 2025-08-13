let canvas;
let world;
const keyboard = new Keyboard();
let menuStack = [];
const settings = SettingsManager.getInstance();
let backgroundMusic = new Audio('');
backgroundMusic.loop = true;
let pauseToggled = false;
let menuIndex = 0;
let currentMenuIndex = 0;


window.onload = () => {
    showOverlay('start-screen');
};

/**
 * @param {Level} level 
 */
function startGame(level) {
    hideAllOverlays();
    showCanvas();
    init(level);
    /*
    if (!settings.get('mute')) {
        backgroundMusic.play();
    }
        */
}

/**
 * @param {Level} level 
 */
function init(level) {
    canvas = document.getElementById('canvas');
    console.log(level);
    world = new World(canvas, level, keyboard);
    loadCharacterAnimation(world.character);
}

function hideAllOverlays() {
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('display-none'));
}

/**
 * @param {string} id 
 */
function showOverlay(id) {
        const current = document.querySelector('.overlay:not(.display-none)');
    if (current && current.id !== id) {
        menuStack.push(current.id);
    }
    hideAllOverlays();
    document.getElementById(id).classList.remove('display-none');
}

function backToPreviousMenu() {
    if (menuStack.length > 0) {
        const previous = menuStack.pop();
        showOverlay(previous);
    } else {
        backToStart();
    }
}

function showCanvas() {
    document.getElementById('canvas').style.display = 'block';
}

function openLevelSelect() {
    showOverlay('level-select-screen');
}

function showControls() {
    showOverlay('controls-screen');
}

function showCredits() {
    showOverlay('credits-screen');
}

function showSetting() {
    showOverlay('settings-screen');
}

function backToStart() {
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('display-none'));
    document.getElementById('start-screen').classList.remove('display-none');
}

function togglePause() {
    if (!world) return;
    if (world.paused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function saveGameState() {
    if (!world || !world.character) return;
    const state = {
        character: {
            x: world.character.x,
            y: world.character.y,
            energy: world.character.energy,
            poisonActive: world.character.poisonActive
        },
        enemies: world.enemies.map(e => ({
            x: e.x,
            y: e.y,
            type: e.type,
            energy: e.energy
        })),
        mute: settings.get('mute'),
        score: world.coinbar.coins
    };
    localStorage.setItem('gameState', JSON.stringify(state));
}

function toggleCoinCounter() {
    const newState = settings.toggle('showCoinCounter');
    if (world && world.coinbar) {
        world.coinbar.showCounter = newState;
    }
}

function toggleMute() {
    const mute = settings.toggle('mute');
    if (mute) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
}
function restartLevel() {
    if (!world || !world.canvas) return;
    let currentLevelConfig = world.levelConfig || level0Config;
    world = new World(world.canvas, new Level(currentLevelConfig), keyboard);
    loadCharacterAnimation(world.character);
    world.coinbar.showCounter = settings.get('showCoinCounter');
}

function startGame(level) {
    hideAllOverlays();
    showCanvas();
    init(level);
    world.coinbar.showCounter = settings.get('showCoinCounter');
}

function gameOver(win) {
    if (win) {
        showOverlay('win-screen');
    } else {
        showOverlay('lose-screen');
    }
    document.getElementById('canvas').style.display = 'none';
}

function togglePause() {
    if (!world) return;
    if (world.paused) {
        world.resumeGame();
    } else {
        world.pauseGame();
    }
}

function getVisibleMenuButtons() {
    const overlay = document.querySelector('.overlay:not(.display-none)');
    return overlay ? Array.from(overlay.querySelectorAll('.menu-btn')) : [];
}

function highlightMenuButton(index) {
    const buttons = getVisibleMenuButtons();
    buttons.forEach((btn, i) => btn.classList.toggle('selected', i === index));
    if (buttons[index]) buttons[index].focus();
}

function handleMenuNavigation(e) {
    const buttons = getVisibleMenuButtons();
    if (!buttons.length) return;

    if (['w', 'arrowup'].includes(e.key.toLowerCase())) {
        menuIndex = (menuIndex - 1 + buttons.length) % buttons.length;
        highlightMenuButton(menuIndex);
        e.preventDefault();
    }
    if (['s', 'arrowdown'].includes(e.key.toLowerCase())) {
        menuIndex = (menuIndex + 1) % buttons.length;
        highlightMenuButton(menuIndex);
        e.preventDefault();
    }
    if ([' ', 'enter'].includes(e.key.toLowerCase())) {
        buttons[menuIndex].click();
        e.preventDefault();
    }
}
/*
function resetMenuNavigation() {
    menuIndex = 0;
    highlightMenuButton(menuIndex);
}


const origShowOverlay = showOverlay;
window.showOverlay = function(id) {
    origShowOverlay(id);
    setTimeout(resetMenuNavigation, 10);
};

function isMenuOpen() {
    return document.querySelector('.overlay:not(.display-none)') !== null;
}

window.addEventListener('keydown', (e) => {
    if (isMenuOpen()) {
        handleMenuNavigation(e);
        if (['escape', 'p'].includes(e.key.toLowerCase())) {
            backToPreviousMenu();
            e.preventDefault();
        }
    } else {
        handleGameKeysDown(e);
    }
});

window.addEventListener('keyup', (e) => {
    if (!isMenuOpen()) {
        handleGameKeysUp(e);
    }
});
*/

window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "arrowright":
            keyboard.RIGHT = true;
            break;
        case "arrowleft":
            keyboard.LEFT = true;
            break;
        case "arrowup":
            keyboard.UP = true;
            break;
        case "arrowdown":
            keyboard.DOWN = true;
            break;
        case " ":
            keyboard.SPACE = true;
            break;
        case "b":
            keyboard.B = true;
            break;
        case "w":
            keyboard.W = true;
            break;
        case "a":
            keyboard.A = true;
            break;
        case "s":
            keyboard.S = true;
            break;
        case "d":
            keyboard.D = true;
            break;
        case "e":
            keyboard.E = true;
            break;
        case "f":
            keyboard.F = true;
            break;
        case "escape":
        case "p":
            if (!pauseToggled) {
                togglePause();
                pauseToggled = true;
            }
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
        case "arrowright":
            keyboard.RIGHT = false;
            break;
        case "arrowleft":
            keyboard.LEFT = false;
            break;
        case "arrowup":
            keyboard.UP = false;
            break;
        case "arrowdown":
            keyboard.DOWN = false;
            break;
        case " ":
            keyboard.SPACE = false;
            break;
        case "b":
            keyboard.B = false;
            break;
        case "w":
            keyboard.W = false;
            break;
        case "a":
            keyboard.A = false;
            break;
        case "s":
            keyboard.S = false;
            break;
        case "d":
            keyboard.D = false;
            break;
        case "e":
            keyboard.E = false;
            break;
        case "f":
            keyboard.F = false;
            break;
        case "escape":
        case "p":
            pauseToggled = false;
            break;
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        this.pauseGame();
    }
});