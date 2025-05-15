const level1Config = {
    backgroundTheme: 'night',
    enemies: [ new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Boss_Orcinus()],
        level_end_x: 720 * 10
};

const level1 = new Level(level1Config);