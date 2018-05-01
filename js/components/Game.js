function Game() {
    this.__nextLevel = LEVEL_ONE;
}

Game.prototype.init = function (w, h) {
    Crafty.init(w || GAME_WIDTH, h || GAME_HEIGHT, document.getElementById('game'));
    //Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
    Crafty.background('#000000');

    this.buildLevel(this.__nextLevel);

    // Add a progress bar per player. As we don't have a player yet, let's just see if we can get a progressbar working
    this.addProgressBar();
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
            else if (levelBlock === SPRITE_CORNERBLOCK_CODE) {
                console.log("Build Wall Corner", j, i);
                Crafty.e(SPRITE_CORNERBLOCK).afterInit({ x: j * 32, y: i * 32 });
            }
            else if (levelBlock === SPRITE_PLATFORMBLOCK_CODE) {
                console.log("Build Platform");
                Crafty.e(SPRITE_PLATFORMBLOCK).afterInit({ x: j * 32, y: i * 32 });
            }
            else if (levelBlock === SPRITE_FLOORBLOCK_CODE) {
                console.log("Build Floor");
                Crafty.e(SPRITE_FLOORBLOCK).afterInit({ x: j * 32, y: i * 32 });
            }
        }
    }
};

Game.prototype.addProgressBar = function () {
    Crafty.e(SPRITE_PROGRESSBAR).afterInit({ x: 100, y: 700 });
}

let __Game = new Game();