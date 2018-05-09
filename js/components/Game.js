class Game {
    constructor(level) {
        this.__nextLevel = level || LEVEL_ONE;
        this.players = [];
        this.controllers = {};
        this.numGamePads = 0;
    }

    init(w, h) {
        Crafty.init(w || GAME_WIDTH, h || GAME_HEIGHT, document.getElementById('game'));
        //Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
        Crafty.background('#000000');
        this.buildLevel(this.__nextLevel);
        this.createPlayers();
        this.bindEvents();
    }

    createPlayers() {
        for(let i=0; i < 2; i++){
            let player = Crafty.e('Player');
            player.afterInit({ playerId: i, x: 100, y: 750 });
            this.players.push(player);
        }
    }

    bindEvents() {
        window.addEventListener("gamepadconnected", (e) => {
            let g = e.gamepad;
            Crafty.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", g.index, g.id, g.buttons.length, g.axes.length);
            this.addgamepad(g);
            this.numGamePads++;
            this.players[this.numGamePads-1].setupGamePad(g.index);             
        });

        Crafty.bind('UpdateFrame', () => {
            this.scangamepads();
            for (let j in this.controllers) {
                var controller = this.controllers[j];
                for (var i = 0; i < controller.buttons.length; i++) {
                    var val = controller.buttons[i];
                    var pressed = val == 1.0;
                    if (typeof (val) == "object") {
                        pressed = val.pressed;
                        val = val.value;
                        if(pressed){
                            Crafty.log('Controller:',controller.index, 'button:', i, 'pressed');
                        }
                    }
                }

                for (var i = 0; i < controller.axes.length; i++) {
                    if (parseInt(controller.axes[0], 10) === -1){
                        Crafty.log('Axes: -1');
                    }
                    if (parseInt(controller.axes[0], 10) === 1) {
                        Crafty.log('Axes: 1');
                    }
                }
            }

        });
    }

    addgamepad(gamepad) {
        this.controllers[gamepad.index] = gamepad;        
    }

    scangamepads() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                if (!(gamepads[i].index in this.controllers)) {
                    this.addgamepad(gamepads[i]);
                } else {
                    this.controllers[gamepads[i].index] = gamepads[i];
                }
            }
        }
    }

    buildLevel(levelMap) {
        for (let i = 0; i < levelMap.length; i++) {
            let levelRow = levelMap[i].split("");
            for (let j = 0; j < levelRow.length; j++) {
                let levelBlock = levelRow[j];
                if (levelBlock === SPRITE_WALLBLOCK_CODE) {
                    //Crafty.log("Build Wall", j, i);
                    Crafty.e(SPRITE_WALLBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_CORNERBLOCK_CODE) {
                    //Crafty.log("Build Wall Corner", j, i);
                    Crafty.e(SPRITE_CORNERBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_PLATFORMBLOCK_CODE) {
                    //Crafty.log("Build Platform");
                    Crafty.e(SPRITE_PLATFORMBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
                else if (levelBlock === SPRITE_FLOORBLOCK_CODE) {
                    //Crafty.log("Build Floor");
                    Crafty.e(SPRITE_FLOORBLOCK).afterInit({ x: j * 32, y: i * 32 });
                }
            }
        }
    }
}


/* Create a new Game instance */
let __Game = new Game();