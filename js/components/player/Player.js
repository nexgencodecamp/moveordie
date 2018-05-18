// Create Player Component
Crafty.c("Player", {
    required: "2D, Canvas, Color, SpriteAnimation, Collision, Gravity, Multiway, Jumper",
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
        this.collision();

        // Load sounds
        Crafty.audio.add("powerup", SND_POWERUP);
        Crafty.audio.add("die", SND_DIE);
    },

    afterInit: function (props) {
        this.id = props.playerId;
        this.x = props.x + (this.id * 150);
        this.y = props.y;
        this.progressBar = Crafty.e('ProgressBar');
        this.progressBar.afterInit({ index: this.id, x: 100 + ((this.id - 1) * 350), y: 740 });
        this.multiway({ x: 400 }, props.keys);
        this.jumper(400, props.jumpKeys);
        this.onHit('PlatformBlock', function (hitDatas, isFirst) { // on collision with bullets            
            this.isColliding = true;
            Crafty.log('isColliding = TRUE', isFirst, hitDatas);
            if (isFirst) {
                // First collision with some entity
                this.speed({ x: 0, y: 0 });
                let hitData = hitDatas[0];
                if (hitData.nx === 0) {
                    this.y += 2;
                }
                else if (hitData.nx !== 0) {
                    this.x += 20 * hitData.nx;
                }
            }
        });

        Crafty.audio.play('powerup', 1, 0.1);
    },

    bindEvents: function (that) {

        that.bind('GameStarted', () => {
            that.disableControls = false;
        });

        that.bind('NewDirection', function (data) {
            if (!__Game.isStarted) {
                that.disableControls = true;
                return;
            }

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
            // Check for the screen boundaries so our player doesn't go offscreen
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
            if (this.vx === 0) {
                Crafty.log('Landed on Ground at zero speed');
                this.speed({ x: 400 });
            }

        });

        that.bind('pbarEmpty', function (data) {
            // Check the player who died is this player
            if (this.id === data.id) {
                Crafty.log(`Player ${data.id} died...!`);
                that.kill();
            }
        });
    },

    kill: function () {
        this.state = this.STATE_DEAD;
        this.animate('PlayerDead', -1);
        this.disableControls = true;
        this.vx = 0;
        this.vy = 0;
        Crafty.audio.play('die');
    },

    talk: function () {
        Crafty.log("Player ready!");
    }
});

