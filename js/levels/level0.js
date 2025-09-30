const level0Config = {
    backgroundTheme: 'night',

    barriers: [
        
        new Barrier(2, 640, 0),
        new Barrier(3, 1696, 454),
        new Barrier(4, 3000, 300),
        //new Barrier(5, 4500, 0),
        //new Barrier(1, 6040, 0)
    ],

    enemies: [ 
       /* 
       new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        */
       new Boss_Orcinus()
    ],

    coins: [
        new Coin(400, 300),
        new Coin(440, 350),
        new Coin(480, 400),
        new Coin(520, 450),
        new Coin(560, 500),
    ],

    bottles: [
        new PoisonBottle(880, 572, 'left'),
        new PoisonBottle(1024, 580, 'right'),
        new PoisonBottle(1280, 624, 'left'),
        new PoisonBottle(2750, 570, 'right'),
        new PoisonBottle(4032, 512, 'left'),
    ],

    level_end_x: 1280 * 10,

    tutorialHints: [
        { text: 'Use arrow keys to move Sharkie', posX: 50, posY: 100 },
        { text: 'Collect coins to earn points', posX: 200, posY: 400 },
        { text: 'Avoid enemies or lose health', posX: 400, posY: 700 }
    ]
};

window.level0 = new Level(level0Config);