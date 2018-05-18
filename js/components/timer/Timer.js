class Timer {
    constructor(timeLeft, type, xOffset, yOffset, displayFontSize) {
        // Parameters
        this.secondsTotal = timeLeft || 30;
        this.type = type || 'main';
        this.xOffset = xOffset || 150;
        this.yOffset = yOffset || 50;
        this.displayFontSize = displayFontSize || '28px';

        // Time/counters
        this.gameStartTime = (new Date()).getTime();
        this.timeLeft = this.secondsTotal;
        this.timeLeftDisplay = null;
    }

    start() {
        Crafty.bind('UpdateFrame', () => {
            if (this.timeLeft !== null && this.timeLeft <= 0) {                
                this.stop(this.type);
                return;
            }
            else if (this.timeLeft > 0 && Crafty.frame() % 50 === 1) {
                this.timeLeft = this.secondsTotal - Math.round(((new Date()).getTime() - this.gameStartTime) / 1000);
                this.display();
                Crafty.log('Num players left:', __Game.getPlayersAlive().length);
            }
        });
    }

    stop(type) {
        this.timeLeft = null;
        this.timeLeftDisplay.destroy();

        // Game Over event
        if(type === 'main' || type === null || type === undefined)
            Crafty.trigger('mainTimerFinished', {type: 'main'});
        else if(type === 'pre')
            Crafty.trigger('preTimerFinished', { type: 'pre' });
    }

    display() {
        if (this.timeLeftDisplay) {
            this.timeLeftDisplay.destroy();
        }
        this.timeLeftDisplay = Crafty.e("2D, Canvas, Text")
            .attr({ x: GAME_WIDTH - this.xOffset, y: this.yOffset })
            .text(this.timeLeft)
            .textColor('#FFFFFF')
            .textFont({ size: this.displayFontSize, weight: 'bold', family: 'Arial' });
    }
}