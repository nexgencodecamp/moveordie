/**
 * Constants, 
 * Functions, 
 * Objects,
 * Crafty object
 * Arrays
 */



/* Wall Block */
const SPRITE_WALLBLOCK_CODE = 'W';
Crafty.sprite(32, 32, "js/components/wallblock/img/stoneBlock.png", {
    sprite_wallblock: [0, 0]
});

/* Corner Block */
const SPRITE_CORNERBLOCK_CODE = 'C';
Crafty.sprite(32, 32, "js/components/cornerblock/img/darkStoneBlock.png", {
    sprite_cornerblock: [0, 0]
});

/*  Platfom Block */
const SPRITE_PLATFORMBLOCK_CODE = 'P';
Crafty.sprite(32, 32, "js/components/platformblock/img/platformBlock.png", {
    sprite_platformblock: [0, 0]
});

/*  Floor Block */
const SPRITE_FLOORBLOCK_CODE = 'F';
Crafty.sprite(32, 32, "js/components/floorblock/img/floorBlock.png", {
    sprite_floorblock: [0, 0]
});

/*  Falling Block */
const SPRITE_FALLINGBLOCK_CODE = 'L';

Crafty.sprite(32, 32, "js/components/fallingblock/img/fallingBlock.png", {
    sprite_fallingblock: [0, 0]
});

/*  Progress Bar */
Crafty.sprite(198, 33, "js/components/progressbar/img/progress.png", {
    sprite_progressbar: [0, 0]
});

/*  Players */
Crafty.sprite(32, 32, "js/components/player/img/player-1-sprite.png", {
    sprite_player_1: [0, 0],
    sprite_player_1_dead: [1, 0],
});

Crafty.sprite(32, 32, "js/components/player/img/player-2-sprite.png", {
    sprite_player_2: [0, 0],
    sprite_player_2_dead: [1, 0],
});

Crafty.sprite(32, 32, "js/components/player/img/player-3-sprite.png", {
    sprite_player_3: [0, 0],
    sprite_player_3_dead: [1, 0],
});

Crafty.sprite(32, 32, "js/components/player/img/player-4-sprite.png", {
    sprite_player_4: [0, 0],
    sprite_player_4_dead: [1, 0],
});

Crafty.sprite(60, 60, "js/components/explosion/img/block-explosion-T60x60.png", {
    block_explosion: [0, 0]
});

//let numbers = [0, 1, 2, 3];

//let myLetters = ["A", "B", "C", "D"];