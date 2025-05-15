let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadCharacterAnimation(world.character);
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