// Create Explosion Component
Crafty.c("Explosion", {
    required: "2D, Canvas, Color, SpriteAnimation, Collision",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.attr({ w: 60, h: 60 })
        this.bindEvents(this);

        // Animate the explosion
        this.reel('BlockExplosion', 300, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    },

    bindEvents: function (that) {
        that.bind('AnimationEnd', function (n) {
            that.destroy();
        })
    },

    play: function (pos) {
        this.addComponent('block_explosion');
        this.x = pos.x;
        this.y = pos.y;
        this.attr({ w: 60, h: 64 })
        this.animate('BlockExplosion', 0);
    },

    talk: function () {
        console.log("Explosion ready!")
    }
})
