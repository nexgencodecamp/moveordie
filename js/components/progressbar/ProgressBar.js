// Create CornerBlock Component
Crafty.c("ProgressBar", {
    required: "2D, Canvas, Color, SPRITE_PROGRESSBAR",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.bindEvents(this);
        this.attr({ w: 400, h: 100 });
        this.progressAmt = 400;
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;

        // Place inner image
        var ent = Crafty.e("2D, DOM, Image").image("js/components/progressbar/img/progress-inner.png");
        ent.attr({x: 111, y:720 });

        var that=this;
        let interval = window.setInterval(function(){
            that.progressAmt -= 2;
            if(that.progressAmt <= 0)
                window.clearInterval(interval);
            ent.attr({ w: that.progressAmt });
        }, 20);
        
    },

    bindEvents: function (that) {
        // No events
    },

    talk: function () {
        console.log("ProgressBar ready!");
    }
});
