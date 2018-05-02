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
            Crafty.log('ProgressBar started');
        })
        Crafty.bind('pbarEmpty', function () {
            Crafty.log('ProgressBar empty');
            window.clearInterval(that.interval);
        });
        Crafty.bind('pbarFull', function () {
            Crafty.log('ProgressBar full');
            window.clearInterval(that.interval);
        })
        Crafty.bind('pbarPaused', function () {
            Crafty.log('ProgressBar paused');
        })
        Crafty.bind('pbarUnpaused', function () {
            Crafty.log('ProgressBar unpaused');
        });
        Crafty.bind('pbarTickDown', function (data) {
            Crafty.log('ProgressBar tickdown', data);
        });
        Crafty.bind('pbarTickUp', function (data) {
            Crafty.log('ProgressBar tickup', data);
        });
    },

    reset: function () {
        window.clearInterval(this.interval);
        this.pbarProgress.attr({ w: this.PROGRESSBAR_WIDTH });

        Crafty.trigger('pbarReset');
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

    start: function (progressAmt, direction) {        
        var that = this;
        this.progressAmt = progressAmt || this.PROGRESSBAR_WIDTH;
        direction = direction || -1;        
        this.interval = window.setInterval(function () {
            if (direction > 0){
                that.progressAmt += 2;
                Crafty.trigger('pbarTickUp', Math.round((that.progressAmt/that.PROGRESSBAR_WIDTH) * 100));
            }
            else{
                that.progressAmt -= 2;
                Crafty.trigger('pbarTickDown', Math.round((that.progressAmt / that.PROGRESSBAR_WIDTH) * 100));
            }
            
            if (that.progressAmt <= 0){                
                Crafty.trigger('pbarEmpty');
            }
            else if(that.progressAmt >= 400){
                Crafty.trigger('pbarFull');
            }
            that.pbarProgress.attr({ w: that.progressAmt });
        }, this.PROGRESSBAR_SPEED);

        Crafty.trigger('pbarStarted');

    },

    talk: function () {
        Crafty.log("ProgressBar ready!");
    }
});
