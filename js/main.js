/* You can disable logging by appending ?logging=false to the URL */
Crafty.loggingEnabled = JSON.parse(new URL(window.location.href).searchParams.get("logging")) === false ? false : true;

/* If you don't pass the width and height of the game, it uses defaults */
__Game.init();