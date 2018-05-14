// Create PlatformBlock Component
Crafty.c("PlatformBlock", {
    required: "2D, Canvas, Color, Collision, Mouse, Solid, Block, SPRITE_PLATFORMBLOCK",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;
    },

    bindEvents: function(self) {
        self.bind('MouseMove', (e) => {
            Crafty.log("x:", e.clientX, "y:", e.clientY );
        }); 
    },

    talk: function () {
        console.log("PlatformBlock ready!");
    }
});
