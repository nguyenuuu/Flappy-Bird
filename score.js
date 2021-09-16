class score {
    constructor(game) {
        this.game = game;
        this.init();
    }
    init() {
        this.score = 0;
        this.digits = [];
        for(let i = 0; i < 10; i++) {
            let tg = new Image();
            tg.src = `./assets/images/${i}.png`;
            this.digits.push(tg);
        }
        // audio
        this.audio = new Audio("./assets/audio/point.ogg");
    }
    update() {
        for(let i = 0; i < this.game.pipe.pipes.length; i++) {
            if(!this.game.pipe.pipes[i].scored) {
                if(this.game.bird.x > this.game.pipe.pipes[i].x + this.game.pipe.imagePipeUp.width) {
                    this.score++;
                    this.game.pipe.pipes[i].scored = true;
                    this.audio.play();
                }
            }
        }
    }
    draw() {
        // score === abc
        let score = this.score;
        let a = Math.floor(score / 100);
        let b = Math.floor((score - 100 * a) / 10);
        let c = score % 10;
        this.game.ctx.drawImage(this.digits[a], this.game.game_width / 2 - this.digits[b].width / 2 - this.digits[a].width - 2, 20);
        this.game.ctx.drawImage(this.digits[b], this.game.game_width / 2 - this.digits[b].width / 2, 20);
        this.game.ctx.drawImage(this.digits[c], this.game.game_width / 2 + this.digits[b].width / 2 + 2, 20);
    }
}