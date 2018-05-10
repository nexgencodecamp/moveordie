class Game {
    constructor(level) {
        this.__nextLevel = level || LEVEL_ONE;
        this.players = [];
        this.controllers = {};
        this.numGamePads = 0;   
        this.isStarted = false;     
    }

    init(w, h) {
        Crafty.init(w || GAME_WIDTH, h || GAME_HEIGHT, document.getElementById('game'));
        //Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
        Crafty.background('#000000');
        this.buildLevel(this.__nextLevel);
        this.createPlayers();
        this.bindEvents();

        this.startGame();
    }

    createPlayers() {
        for(let i=1; i < 3; i++){
            let player = Crafty.e('Player, SPRITE_PLAYER_'+i);
            player.afterInit({ playerId: i, x: 100, y: 750 });
            this.players.push(player);
        }
    }

    bindEvents() {
        window.addEventListener("gamepadconnected", (e) => {
            let g = e.gamepad;
            Crafty.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", g.index, g.id, g.buttons.length, g.axes.length);            
            this.numGamePads++;
            this.players[this.numGamePads-1].setupGamePad(g.index);             
        });
    }

    buildLevel(levelMap) {
        for (let i = 0; i < levelMap.length; i++) {
            let levelRow = levelMap[i].split("");
            for (let j = 0; j < levelRow.length; j++) {
                let levelBlock = levelRow[j];
                if (levelBlock === SPRITE_WALLBLOCK_CODE) {                    
                    Crafty.e(SPRITE_WALLBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_CORNERBLOCK_CODE) {                    
                    Crafty.e(SPRITE_CORNERBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_PLATFORMBLOCK_CODE) {                    
                    Crafty.e(SPRITE_PLATFORMBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_FLOORBLOCK_CODE) {                    
                    Crafty.e(SPRITE_FLOORBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
            }
        }
    }

    startGame() {
        let prestart = new Promise(function(resolve, reject){
            (new Timer(3)).start();

            Crafty.bind('timerFinished', function(data){
                if(data.type === 'pretimer'){
                    resolve();
                }
            })
        });

        prestart.then( response => {
            (new Timer()).start();
            this.isStarted = true;  
            this.players.forEach(function(p){
                p.progressBar.start();
            });                      
        });
    }
}


/* Create a new Game instance */
let __Game = new Game();