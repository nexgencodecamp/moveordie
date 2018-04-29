function Game() {
    this.__nextLevel = LEVEL_ONE;
}

Game.prototype.init = function (w, h) {
    Crafty.init(w || GAME_WIDTH, h || GAME_HEIGHT, document.getElementById('game'));
    //Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
    Crafty.background('#000000');

    this.buildLevel(this.__nextLevel);
};

Game.prototype.buildLevel = function (levelMap) {
    for (let i = 0; i < levelMap.length; i++) {
        let levelRow = levelMap[i].split("");
        for (let j = 0; j < levelRow.length; j++) {
            let levelBlock = levelRow[j];
            if (levelBlock === SPRITE_WALLBLOCK_CODE) {
                console.log("Build Wall", j, i);
                Crafty.e(SPRITE_WALLBLOCK).afterInit({ x: j*32, y: i*32 });
            }
            if (levelBlock === SPRITE_CORNERBLOCK_CODE) {
                console.log("Build Wall Corner", j, i);
                Crafty.e(SPRITE_CORNERBLOCK).afterInit({ x: j * 32, y: i * 32 });
            }
            else if (levelBlock === SPRITE_PLATFORMBLOCK_CODE) {
                console.log("Build Platform");
                Crafty.e(SPRITE_PLATFORMBLOCK).afterInit({ x: j * 32, y: i * 32 });
            }
        }
    }
};

let __Game = new Game();