const level0Config = {
    backgroundTheme: 'night',

    barriers: [
        new Barrier(2, 640, 0),
        new Barrier(3, 1696, 360),
        new Barrier(4, 3000, 300),
    ],

    enemies: [ 
       /* 
       new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish(),a
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        */
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
        
    ],

    level_end_x: 1280 * 10
};

const level0 = new Level(level0Config);