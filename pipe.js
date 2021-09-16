class pipe {
    constructor(game) {
        this.game = game;
        this.init();
    }
    init() {
        // init image
        this.imagePipeUp = new Image();
        this.imagePipeDown = new Image();
        this.imagePipeUp.src = "./assets/images/pipe-up.png";
        this.imagePipeDown.src = "./assets/images/pipe-down.png";
        this.pipeDistance = 150;
        this.speed = 3;
        this.pipes = [
            {
                x: this.game.game_width,
                height: 200,
                scored: false
            },
            {
                x: 138 + this.game.game_width,
                height: 300,
                scored: false
            },
            {
                x: 276 + this.game.game_width,
                height: 250,
                scored: false
            },
            {
                x: 414 + this.game.game_width,
                height: 225,
                scored: false
            }, 
        ];
    }
    update() {
        // pipes move to left
        for(let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].x -= this.speed;
        }
        this.createPipe();
    }
    draw() {
        for(let i = 0; i < this.pipes.length; i++) {
            this.game.ctx.drawImage(this.imagePipeUp, this.pipes[i].x, 
                this.game.game_height - this.pipes[i].height - this.game.base.image.height);
            this.game.ctx.drawImage(this.imagePipeDown, this.pipes[i].x, 
                this.game.game_height - this.imagePipeDown.height - this.pipeDistance - this.pipes[i].height - this.game.base.image.height);
        }
    }
    createPipe() {
        if(this.pipes[0].x < -this.imagePipeUp.width) {
            let tgX = this.game.game_width;
            let tgHeight = 200 + Math.random() * 100; 
            this.pipes.shift();
            this.pipes.push(
                {
                    x: tgX,
                    height: tgHeight,
                    scored: false
                }
            );
        }
    }
}