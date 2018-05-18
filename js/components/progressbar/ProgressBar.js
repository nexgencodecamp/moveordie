// Create ProgressBar Component
Crafty.c("ProgressBar", {
    required: "2D, Canvas, Color, SPRITE_PROGRESSBAR",
    /* This function will be called when the component is added to an entity */
    init: function () {
        this.PROGRESSBAR_WIDTH = 198;
        this.PROGRESSBAR_HEIGHT = 33;
        this.PROGRESSBAR_SPEED = 20;
        this.bindEvents(this);
        this.attr({ w: this.PROGRESSBAR_WIDTH, h: this.PROGRESSBAR_HEIGHT });
        this.progressAmt = this.PROGRESSBAR_WIDTH;
        this.pbarProgress = null;
        this.interval = null;
        this.isPaused = false;
    },

    afterInit: function (props) {
        this.id = props.index;
        this.x = props.x;
        this.y = props.y;

        // Place inner image
        this.pbarProgress = Crafty.e("2D, DOM, Image").image(`js/components/progressbar/img/progress-inner-${props.index}.png`);
        this.pbarProgress.attr({ x: this.x, y: 750 });
        this.pbarProgress.attr({ w: this.progressAmt });
    },

    bindEvents: function (that) {
        // Bind to events here
        Crafty.bind('pbarStarted', (data) => {
            if (data.id !== this.id)
                return;
        });
        Crafty.bind('pbarEmpty', (data) => {
            if (data.id !== this.id)
                return;
            window.clearInterval(that.interval);
        });
        Crafty.bind('pbarFull', (data) => {
            if (data.id !== this.id)
                return;            
            window.clearInterval(that.interval);
        });
        Crafty.bind('pbarPaused', (data) => {
            if (data.id !== this.id)
                return;            
        });
        Crafty.bind('pbarUnpaused', (data) => {
            if (data.id !== this.id)
                return;            
        });
        Crafty.bind('pbarTickDown', (data) => {
            if (data.id !== this.id)
                return;            
        });
        Crafty.bind('pbarTickUp', (data) => {
            if (data.id !== this.id)
                return;            
        });
        Crafty.bind('gameOver', () => {
            // Stop progressbar
            this.pause();
        });
    },

    reset: function () {
        window.clearInterval(this.interval);
        this.pbarProgress.attr({ w: this.PROGRESSBAR_WIDTH });

        Crafty.trigger('pbarReset', { id: this.id });
    },

    pause: function () {        
        window.clearInterval(this.interval);
        this.isPaused = true;        
    },

    unpause: function (direction) {        
        this.start(direction);
        this.isPaused = false;        
    },

    start: function (direction) {
        direction = direction || -1;
        // Don't start if progress is already at MAX
        if (this.progressAmt >= this.PROGRESSBAR_WIDTH && direction === 1)
            return;

        this.interval = window.setInterval(() => {
            if (direction > 0) {
                this.progressAmt += 2;
                Crafty.trigger('pbarTickUp', Math.round((this.progressAmt / this.PROGRESSBAR_WIDTH) * 100));
            }
            else {
                this.progressAmt -= 2;
                Crafty.trigger('pbarTickDown', Math.round((this.progressAmt / this.PROGRESSBAR_WIDTH) * 100));
            }

            if (this.progressAmt <= 0) {
                Crafty.log("id =", this.id);
                Crafty.trigger('pbarEmpty', { id: this.id });
            }
            else if (this.progressAmt >= this.PROGRESSBAR_WIDTH) {
                Crafty.trigger('pbarFull', { id: this.id });
            }


            this.pbarProgress.attr({ w: this.progressAmt });
        }, this.PROGRESSBAR_SPEED);

        Crafty.trigger('pbarStarted', { id: this.id });
    },

    setProgressToNil: function(){
        this.progressAmt = 0;
        this.pbarProgress.attr({ w: this.progressAmt });
    },

    talk: function () {
        Crafty.log("ProgressBar ready!");
    }
});
