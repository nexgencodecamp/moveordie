// Create CornerBlock Component
Crafty.c("CornerBlock", {
    required: "2D, Canvas, Color, Collision, sprite_cornerblock",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;
    },

    bindEvents: function (that) {
        // No events
    },

    talk: function () {
        console.log("CornerBlock ready!");
    }
});
