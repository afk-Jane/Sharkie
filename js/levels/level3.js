const level3Config = {
    backgroundTheme: 'night',
    barriers: [
        new Barrier(1, 800, 400),
        new Barrier(2, 1200, 500),
        new Barrier(3, 1600, 300)
    ],
    enemies: [ 
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
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
        new PoisonBottle(490, 580, 'right'),
        new PoisonBottle(1018, 624, 'left'),
        
    ],
    level_end_x: 1280 * 10
};

window.level3 = new Level(level3Config);