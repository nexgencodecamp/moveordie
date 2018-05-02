class Game {
    constructor() {
        this.__nextLevel = LEVEL_ONE;
    }
    init(w, h) {
        Crafty.init(w || GAME_WIDTH, h || GAME_HEIGHT, document.getElementById('game'));
        //Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
        Crafty.background('#000000');
        this.buildLevel(this.__nextLevel);
        
        // Add a Player
        let player = Crafty.e("Player");
        player.afterInit({x: 100, y: 600});
        
        // Add a progress bar per player. As we don't have a player yet, let's just see if we can get a progressbar working
        let progressBar = this.addProgressBar();
    }
    buildLevel(levelMap) {
        for (let i = 0; i < levelMap.length; i++) {
            let levelRow = levelMap[i].split("");
            for (let j = 0; j < levelRow.length; j++) {
                let levelBlock = levelRow[j];
                if (levelBlock === SPRITE_WALLBLOCK_CODE) {
                    Crafty.log("Build Wall", j, i);
                    Crafty.e(SPRITE_WALLBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_CORNERBLOCK_CODE) {
                    Crafty.log("Build Wall Corner", j, i);
                    Crafty.e(SPRITE_CORNERBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_PLATFORMBLOCK_CODE) {
                    Crafty.log("Build Platform");
                    Crafty.e(SPRITE_PLATFORMBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_FLOORBLOCK_CODE) {
                    Crafty.log("Build Floor");
                    Crafty.e(SPRITE_FLOORBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
            }
        }
    }
    addProgressBar() {
        let pbar = Crafty.e(SPRITE_PROGRESSBAR);
        pbar.afterInit({ x: 100, y: 700 });
        return pbar;
    }
}


/* Create a new Game instance */
let __Game = new Game();