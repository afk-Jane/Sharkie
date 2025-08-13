const level1Config = {
    backgroundTheme: 'night',
    barriers: [
        /*
        new Barrier(1, 800, 400),
        new Barrier(2, 1200, 500),
        new Barrier(3, 1600, 300)
        */
    ],
    enemies: [ 
        new Pufferfish(400, 200),
        new Jellyfish(600, 300, false),
        new Jellyfish(680, 280, false),
        new Pufferfish(700, 250),
        new Pufferfish(840, 250),
        new Pufferfish(900, 300),
        new Jellyfish(1024, 360, false),
        new Jellyfish(1280, 440, true),
        new Boss_Orcinus(21000, 200)
    ],
    coins: [
        new Coin(400, 300),
        new Coin(440, 350),
        new Coin(480, 400),
        new Coin(520, 450),
        new Coin(560, 500),
  
    ],
    bottles: [
        new PoisonBottle(490, 580, 'right'),
        new PoisonBottle(1018, 624, 'left'),
        
    ],
    level_end_x: 1280 * 10
};

const level1 = new Level(level1Config);