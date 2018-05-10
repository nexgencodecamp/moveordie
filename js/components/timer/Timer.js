class Timer {
    constructor(timeLeft) {
        this.gameStartTime = (new Date()).getTime();
        this.secondsTotal = timeLeft || 120;
        this.timeLeft = this.secondsTotal;
        this.timeLeftDisplay = null;
    }

    start() {
        Crafty.bind('UpdateFrame', () => {
            if (this.timeLeft !== null && this.timeLeft <= 0) {
                Crafty.trigger('timerFinished', {type: 'pretimer'});
                this.stop();
                return;
            }                
            else if (this.timeLeft > 0 && Crafty.frame() % 50 === 1) {
                this.timeLeft = this.secondsTotal - Math.round(((new Date()).getTime() - this.gameStartTime) / 1000);
                this.display();
            }
        })
    }

    stop() {
        this.timeLeft = null;
        this.timeLeftDisplay.destroy();        
    }

    display() {
        if (this.timeLeftDisplay) {
            this.timeLeftDisplay.destroy();
        }
        this.timeLeftDisplay = Crafty.e("2D, Canvas, Text")
            .attr({ x: GAME_WIDTH - 150, y: 50 })
            .text(this.timeLeft)
            .textColor('#FFFFFF')
            .textFont({ size: '28px', weight: 'bold', family: 'Arial' });
    }
}