// Create FallingBlock Component
Crafty.c("FallingBlock", {
    required: "2D, Canvas, Color, Collision, Gravity, sprite_fallingblock",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.bindEvents(this);
        this.attr({ w: 32, h: 32 });
        this.gravity();
        this.gravityConst(300);
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;

        this.onHit('FloorBlock', function (hitDatas, isFirst) {
            Crafty.e('Explosion').play({ x: this.x - 20, y: this.y - 20 });
            Crafty.audio.play("block-explode");
            this.destroy();
        });

        this.onHit('Player', function (hitDatas, isFirst) {
            // Set player progress to 0 and destroy the block
            let pl = hitDatas[0].obj;

            if (pl.state !== pl.STATE_DEAD && isFirst)
                hitDatas[0].obj.progressBar.setProgressToNil();

            // Destroy the block
            this.destroy();
        });
    },

    bindEvents: function (that) {
        // No events
    },

    talk: function () {
        console.log("Falling Block ready!");
    }
});