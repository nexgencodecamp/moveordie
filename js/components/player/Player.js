// Create Player Component
Crafty.c("Player", {
    required: "2D, Canvas, Color, SpriteAnimation, Collision, Gravity, GamepadMultiway, SPRITE_PLAYER",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.STATE_STILL = 0;
        this.STATE_MOVING = 1;
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
        this.gravity("FloorBlock");
        this.progressBar = Crafty.e(SPRITE_PROGRESSBAR);
        this.progressBar.afterInit({ x: 100, y: 700 });
        this.state = this.STATE_STILL;
        this.gamepadMultiway({
            speed: 200, // Speed is in px/sec
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
        });
    },

    disconnect: function (id) {

    },

    talk: function () {
        console.log("Player ready!");
    }
});