// Create Player Component
Crafty.c("Player", {
    required: "2D, Canvas, Color, SpriteAnimation, Collision, Gravity, GamepadMultiway, SPRITE_PLAYER",
    //required: "2D, Canvas, Color, SpriteAnimation, Collision, Gravity, Twoway, SPRITE_PLAYER",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.STATE_STILL = 0;
        this.STATE_MOVING = 1;
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
        this.gravity("Block");
        this.gravityConst(700);
        this.progressBar = Crafty.e(SPRITE_PROGRESSBAR);
        this.progressBar.afterInit({ x: 100, y: 700 });
        this.state = this.STATE_STILL;
        this.direction = 0;
        this.isColliding = false;
        this.isJumping = false;
        this.canDoubleJump = true;
        this.currentJumps = 0;
        //this.twoway(400, 300);
        this.collision();
        this.onHit(SPRITE_PLATFORMBLOCK, function (hitDatas) { // on collision with bullets            
            this.isColliding = true;            
        });
        this.gamepadMultiway({
            speed: 400, // Speed is in px/sec
            gamepadIndex: 0
        });    
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;
    },

    bindEvents: function (that) {
        that.bind('NewDirection', function (data) {
            Crafty.log('NewDirection:', data.x, data.y);
            that.direction = data;
        });

        that.bind("UpdateFrame", function () {
            if (that.x < 32)
                that.x = 33;
            if (that.x > 1343)
                that.x = 1343;
            if (that.y > 640)
                that.y = 640;
            if (that.y < 33){
                that.y = 33;
                that.velocity().y = 0;
            }
                
            if(this.isColliding){
                // If the platform is above the player do the following                
                this.velocity().y = 100;
                this.y = this.y < 630 ? this.y + 10 : 640;                   
            }
        });

        that.bind('LandedOnGround', function (ground) {
            that.isColliding = false;
            that.isJumping = false;
            this.currentJumps = 0;
            
        });
        that.bind('GamepadKeyChange', function(e){
            //Crafty.log('GamepadKeyChange', e);
            if(e.pressed === false){
                e.button = null;
            }
            else{
                this.currentJumps++;
                if(this.currentJumps > 2){
                    e.button = null;                    
                }
                    
            }            
        });
        that.bind('GamepadAxisChange', function (e) {
            if(e.axis === 1)
                e.axis = null;
        });
    },

    talk: function () {
        Crafty.log("Player ready!");
    }
});