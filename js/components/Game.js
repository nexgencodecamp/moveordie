class Game {
    constructor(level) {
        this.__nextLevel = level || LEVEL_ONE;
        this.players = [];
        this.controllers = {};
        this.numGamePads = 0;
        this.isStarted = false;
        this.isGameOver = false;
        this.gameOverDisplay = null;
        this.winnerDisplay = null;
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
        for (let i = 1; i < MAX_PLAYERS + 1; i++) {
            let player = Crafty.e('Player, SPRITE_PLAYER_' + i);
            // Setup animation reel for a dead player.
            player.reel('PlayerDead', 1000, [[1, 0]]);
            player.afterInit({ playerId: i, x: 100, y: 750, keys: KEYS[i - 1], jumpKeys: JUMP_KEYS[i - 1] });
            this.players.push(player);
        }
    }

    spawnBlocks(interval) {
        Crafty.e("Delay").delay(function () {
            var enemy = Crafty.e("FallingBlock");
            enemy.afterInit({ x: Crafty.math.randomNumber(40, 1350), y: -34, speed: 100 });
        }, 250, -1)
    }

    bindEvents() {
        Crafty.bind('UpdateFrame', () => {
            if (this.isGameOver) {
                this.displayGameOver();
                return;
            }
        });

        Crafty.bind('mainTimerFinished', data => {
            this.isGameOver = true;
            Crafty.trigger('gameOver');

            // Display the winner
            let winningPlayer = { player: null, score: -1 };
            this.players.map((p, idx) => {
                if (p.progressBar.progressAmt > winningPlayer.score) {
                    winningPlayer.player = idx + 1;
                    winningPlayer.score = p.progressBar.progressAmt;
                }
                Crafty.log('Progress for Player:', idx, p.progressBar.progressAmt);
            });
            this.displayWinner(winningPlayer);
        });

        Crafty.bind('GameStarted', () => {
            this.spawnBlocks();  // Wrap this inside of a Level object
        });
    }

    buildLevel(levelMap) {
        for (let i = 0; i < levelMap.length; i++) {
            let levelRow = levelMap[i].split("");
            for (let j = 0; j < levelRow.length; j++) {
                let levelBlock = levelRow[j];
                if (levelBlock === SPRITE_WALLBLOCK_CODE) {
                    Crafty.e('WallBlock').afterInit({ x: j * SPRITE_W, y: i * SPRITE_H });
                }
                else if (levelBlock === SPRITE_CORNERBLOCK_CODE) {
                    Crafty.e('CornerBlock').afterInit({ x: j * SPRITE_W, y: i * SPRITE_H });
                }
                else if (levelBlock === SPRITE_PLATFORMBLOCK_CODE) {
                    Crafty.e('PlatformBlock').afterInit({ x: j * SPRITE_W, y: i * SPRITE_H });
                }
                else if (levelBlock === SPRITE_FLOORBLOCK_CODE) {
                    Crafty.e('FloorBlock').afterInit({ x: j * SPRITE_W, y: i * SPRITE_H });
                }
            }
        }
    }

    startGame() {
        let prestart = new Promise(function (resolve, reject) {
            (new Timer(COUNTDOWN_SECS, 'pre', 700, 300, '96px')).start();

            Crafty.bind('preTimerFinished', function (data) {
                if (data.type === 'pre') {
                    resolve();
                }
            });
        });

        prestart.then(response => {
            (new Timer()).start();
            this.isStarted = true;
            Crafty.trigger('GameStarted');
            this.players.forEach(function (p) {
                p.progressBar.start();
            });
        });
    }

    displayGameOver() {
        if (this.gameOverDisplay) {
            this.gameOverDisplay.destroy();
        }
        this.gameOverDisplay = Crafty.e("2D, Canvas, Text")
            .attr({ x: GAME_WIDTH - 900, y: 300 })
            .text("GAME OVER")
            .textColor('#FFFFFF')
            .textFont({ size: '60px', weight: 'bold', family: 'Arial' });
    }
    displayWinner(pl) {
        if (this.winnerDisplay) {
            this.winnerDisplay.destroy();
        }
        this.winnerDisplay = Crafty.e("2D, Canvas, Text")
            .attr({ x: GAME_WIDTH - 925, y: 400 })
            .text(`PLAYER ${pl.player} WINS !!!`)
            .textColor('#FFFF00')
            .textFont({ size: '48px', weight: 'bold', family: 'Arial' });
    }
}


/* Create a new Game instance */
let __Game = new Game();