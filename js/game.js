let canvas;
let world;
let keyboard = new Keyboard();

/**
 * @param {Level} level 
 */
function startGame(level) {
    hideAllOverlays();
    showCanvas();
    init(level);
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
    hideAllOverlays();
    document.getElementById(id).classList.remove('display-none');
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

function backToStart() {
    showOverlay('start-screen');
    document.getElementById('canvas').style.display = 'none';
}

window.onload = () => {
    showOverlay('start-screen');
};

function gameOver(win) {
    if (win) {
        showOverlay('win-screen');
    } else {
        showOverlay('lose-screen');
    }
    document.getElementById('canvas').style.display = 'none';
}

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
    }
});