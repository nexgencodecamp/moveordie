/*
    Variables
    Constants
    Arrays
    Objects
    Functions
*/

/* You can disable logging by appending ?logging=false to the URL */
//Crafty.loggingEnabled = JSON.parse(new URL(window.location.href).searchParams.get("logging")) === false ? false : true;

/* Set any global constants here */
const GAME_WIDTH = 1408;
const GAME_HEIGHT = 800;
const MAX_PLAYERS = 2;
const KEYS = [{ RIGHT_ARROW: 0, LEFT_ARROW: 180 }, { D: 0, A: 180 }];
const JUMP_KEYS = [['UP_ARROW'], ['W']];
const COUNTDOWN_SECS = 6;
const SPRITE_H = 32;
const SPRITE_W = 32;

/* If you don't pass the width, height & level of the game, it uses defaults */
__Game.init();

