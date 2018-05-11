/* Wall Block */
const SPRITE_WALLBLOCK = "WallBlock";
const SPRITE_WALLBLOCK_CODE = 'W';
Crafty.sprite(32, 32, "js/components/wallblock/img/stoneBlock.png", {
    SPRITE_WALLBLOCK: [0, 0]
});

/* Corner Block */
const SPRITE_CORNERBLOCK = "CornerBlock";
const SPRITE_CORNERBLOCK_CODE = 'C';
Crafty.sprite(32, 32, "js/components/cornerblock/img/darkStoneBlock.png", {
    SPRITE_CORNERBLOCK: [0, 0]
});

/*  Platfom Block */
const SPRITE_PLATFORMBLOCK = "PlatformBlock";
const SPRITE_PLATFORMBLOCK_CODE = 'P';
Crafty.sprite(32, 32, "js/components/platformblock/img/platformBlock.png", {
    SPRITE_PLATFORMBLOCK: [0, 0]
});

/*  Floor Block */
const SPRITE_FLOORBLOCK = "FloorBlock";
const SPRITE_FLOORBLOCK_CODE = 'F';
Crafty.sprite(32, 32, "js/components/floorblock/img/floorBlock.png", {
    SPRITE_FLOORBLOCK: [0, 0]
});

/*  Progress Bar */
const SPRITE_PROGRESSBAR = "ProgressBar";
Crafty.sprite(198, 33, "js/components/progressbar/img/progress.png", {
    SPRITE_PROGRESSBAR: [0, 0]
});

/*  Players */
const SPRITE_PLAYER_1 = "Player1";
Crafty.sprite(32, 32, "js/components/player/img/player-1-sprite.png", {
    SPRITE_PLAYER_1: [0, 0],
    SPRITE_PLAYER_1_DEAD: [1, 0],
});

const SPRITE_PLAYER_2 = "Player2";
Crafty.sprite(32, 32, "js/components/player/img/player-2-sprite.png", {
    SPRITE_PLAYER_2: [0, 0],
    SPRITE_PLAYER_2_DEAD: [1, 0],
});

const SPRITE_PLAYER_3 = "Player3";
Crafty.sprite(32, 32, "js/components/player/img/player-3.png", {
    SPRITE_PLAYER_3: [0, 0]
});

const SPRITE_PLAYER_4 = "Player4";
Crafty.sprite(32, 32, "js/components/player/img/player-4.png", {
    SPRITE_PLAYER_4: [0, 0]
});