function loadCharacterAnimation(character) {
    character.loadImages([
        './img/1.Sharkie/3.Swim/1.png',
        './img/1.Sharkie/3.Swim/2.png',
        './img/1.Sharkie/3.Swim/3.png',
        './img/1.Sharkie/3.Swim/4.png'
    ]);

    setInterval(() => {
        if (keyboard.RIGHT || keyboard.LEFT) {
            character.playSwimAnimation();
        }
    }, 100);
}