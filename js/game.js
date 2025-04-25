let canvas;
let char = new MovableObject();
let ctx;

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d')
   console.log('My Character is', char)
}