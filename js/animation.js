function loadCharacterAnimation(character) {
  character.loadImages([
    "./img/1Sharkie/1IDLE/1.png",
    "./img/1Sharkie/1IDLE/2.png",
    "./img/1Sharkie/1IDLE/3.png",
    "./img/1Sharkie/1IDLE/4.png",
    "./img/1Sharkie/1IDLE/5.png",
    "./img/1Sharkie/1IDLE/6.png",
    "./img/1Sharkie/1IDLE/7.png",
    "./img/1Sharkie/1IDLE/8.png",
    "./img/1Sharkie/1IDLE/9.png",
    "./img/1Sharkie/1IDLE/10.png",
    "./img/1Sharkie/1IDLE/11.png",
    "./img/1Sharkie/1IDLE/12.png",
    "./img/1Sharkie/1IDLE/13.png",
    "./img/1Sharkie/1IDLE/14.png",
    "./img/1Sharkie/1IDLE/15.png",
    "./img/1Sharkie/1IDLE/16.png",
    "./img/1Sharkie/1IDLE/17.png",
    "./img/1Sharkie/1IDLE/18.png",
  ]);

  setInterval(() => {
    if (keyboard.RIGHT || keyboard.LEFT) {
      character.playSwimAnimation();
    }
  }, 100);
}
