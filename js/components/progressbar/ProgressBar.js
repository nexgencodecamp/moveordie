// Create ProgressBar Component
Crafty.c("ProgressBar", {
    required: "2D, Canvas, Color, SPRITE_PROGRESSBAR",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.PROGRESSBAR_WIDTH = 400;
        this.PROGRESSBAR_SPEED = 20;
        this.bindEvents(this);
        this.attr({ w: 400, h: 100 });
        this.progressAmt = this.PROGRESSBAR_WIDTH;
        this.pbarProgress = null;
        this.interval = null;
        this.isPaused = false;
    },

    afterInit: function (props) {
        this.x = props.x;
        this.y = props.y;

        // Place inner image
        this.pbarProgress = Crafty.e("2D, DOM, Image").image("js/components/progressbar/img/progress-inner.png");
        this.pbarProgress.attr({x: 111, y:720 });  
        this.pbarProgress.attr({ w: this.progressAmt });      
    },

    bindEvents: function (that) {
        // Bind to events here
        Crafty.bind('pbarStarted', function(){
            console.log('ProgressBar started');
        })
        Crafty.bind('pbarStopped', function () {
            console.log('ProgressBar stopped');
            window.clearInterval(that.interval);
        })
        Crafty.bind('pbarPaused', function () {
            console.log('ProgressBar paused');
        })
        Crafty.bind('pbarUnpaused', function () {
            console.log('ProgressBar unpaused');
        });
    },

    stop: function () {
        window.clearInterval(this.interval);
        this.progressAmt = this.PROGRESSBAR_WIDTH;        
        this.pbarProgress.attr({ w: this.progressAmt });

        Crafty.trigger('pbarStopped');
    },

    pause: function () {
        if(this.isPaused){
            this.start(this.progressAmt);
            this.isPaused = false;
            Crafty.trigger('pbarUnpaused');
        }
        else{
            window.clearInterval(this.interval);
            this.isPaused = true;
            Crafty.trigger('pbarPaused');
        }
    },

    start: function (progressAmt) {
        this.progressAmt = progressAmt || this.PROGRESSBAR_WIDTH;
        var that = this;
        this.interval = window.setInterval(function () {
            that.progressAmt -= 2;
            if (that.progressAmt <= 0){                
                Crafty.trigger('pbarStopped');
            }
            that.pbarProgress.attr({ w: that.progressAmt });
        }, this.PROGRESSBAR_SPEED);

        Crafty.trigger('pbarStarted');

    },

    talk: function () {
        console.log("ProgressBar ready!");
    }
});
