// Create Player Component
Crafty.c("Player", {
    required: "2D, Canvas, Color, SpriteAnimation, Collision, Gravity, SPRITE_PLAYER",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
        this.gravity("FloorBlock");
        this.progressBar = Crafty.e(SPRITE_PROGRESSBAR);
        this.progressBar.afterInit({ x: 100, y: 700 });
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;
    },

    bindEvents: function (that) {
        // No events
    },

    talk: function () {
        console.log("Player ready!");
    }
});