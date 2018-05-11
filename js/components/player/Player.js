// Create Player Component
Crafty.c("Player", {
    required: "2D, Canvas, Color, SpriteAnimation, Collision, Gravity, GamepadMultiway",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.STATE_STILL = 0;
        this.STATE_MOVING = 1;
        this.STATE_DEAD = 2;
        this.STATE_FALLING = 3;
        this.STATE_JUMPING = 4;
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
        this.gravity("Block");
        this.gravityConst(700);
        this.state = this.STATE_STILL;
        this.direction = 0;
        this.isColliding = false;
        this.currentJumps = 0;
        this.isAlive = true;
        this.collision();        
        this.onHit(SPRITE_PLATFORMBLOCK, function (hitDatas) { // on collision with bullets            
            this.isColliding = true;
        });
    },

    afterInit: function (props) {
        this.id = props.playerId;
        this.x = props.x + (this.id * 150);
        this.y = props.y;
        this.progressBar = Crafty.e(SPRITE_PROGRESSBAR);
        this.progressBar.afterInit({ index: this.id, x: 100 + ((this.id - 1) * 350), y: 740 });
    },

    bindEvents: function (that) {
        that.bind('NewDirection', function (data) {
            if (__Game.isStarted === false)
                return;

            that.direction = data;
            if (!that.progressBar.isPaused) {
                that.progressBar.pause();
            }
            if (data.x !== 0 && (data.y === 0 || data.y === -1)) {
                that.progressBar.unpause(1);
                this.state = this.STATE_MOVING;
            }
            else if (data.x === 0 && data.y === -1) {
                that.progressBar.unpause(1);
                this.state = this.STATE_JUMPING;
            }
            else if (data.x === 0 && data.y === 0) {
                that.progressBar.unpause(-1);
                this.state = this.STATE_STILL;
            }
            else if (data.x === 0 && data.y === 1) {
                that.progressBar.unpause(-1);
                this.state = this.STATE_FALLING;
            }
        });

        that.bind("UpdateFrame", function () {
            if (that.x < 32)
                that.x = 33;
            if (that.x > 1343)
                that.x = 1343;
            if (that.y > 640)
                that.y = 640;
            if (that.y < 33) {
                that.y = 33;
                that.velocity().y = 0;
            }

            if (this.isColliding) {
                // If the platform is above the player do the following                
                this.velocity().y = 100;
                this.y = this.y < 630 ? this.y + 10 : 640;
            }
        });

        that.bind('LandedOnGround', function (ground) {
            that.isColliding = false;
            this.currentJumps = 0;
        });

        that.bind('GamepadKeyChange', function (e) {
            if (e.pressed === false) {
                e.button = null;
            }
            else {
                this.currentJumps++;
                if (this.currentJumps > 2) {
                    e.button = null;
                }
            }
        });

        that.bind('GamepadAxisChange', function (e) {
            if (e.axis === 1)
                e.axis = null;
        });

        that.bind('pbarEmpty', function () {
            Crafty.log('You died...');
            this.state = this.STATE_DEAD;
            this.animate('PlayerDead', -1);
            this.disableControls = true;
        });
    },

    setupGamePad: function (index) {
        this.gamepadMultiway({
            speed: 400, // Speed is in px/sec
            gamepadIndex: index
        });
    },

    talk: function () {
        Crafty.log("Player ready!");
    }
});