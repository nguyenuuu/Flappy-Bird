class bird {
    constructor(game) {
        this.game = game;
        this.init();
    }
    init() {
        // init image
        this.imageBirdDownFlap = new Image();
        this.imageBirdMidFlap = new Image();
        this.imageBirdUpFlap = new Image();
        this.imageBirdDownFlap.src = "./assets/images/redbird-downflap.png";
        this.imageBirdMidFlap.src = "./assets/images/redbird-midflap.png";
        this.imageBirdUpFlap.src = "./assets/images/redbird-upflap.png";
        // frame status bird
        this.currFrame = 0;
        // location bird
        this.x = this.game.game_width / 4 - this.imageBirdDownFlap.width;
        this.y = 10;
        // speed and acceleration
        this.speed = 0;
        this.acceleration = 0.6;
        // audio
        this.audioFlap = new Audio("./assets/audio/swoosh.ogg");
        this.audioDie = new Audio("./assets/audio/hit.ogg");
    }
    update() {
        // update status bird
        this.currFrame++;
        if(this.currFrame >= this.game.FPS / 15 * 3)
            this.currFrame = 0;
        // action
        this.action();
        // bird auto down
        this.speed += this.acceleration;
        this.y += this.speed;
        // die
        this.die();
    }
    action() {
        this.game.canvas.addEventListener("click", () => {
            this.speed = -10;
            this.audioFlap.currentTime = 0;
            this.audioFlap.play();
        });
        window.addEventListener("keypress", (e) => {
            if(e.key === " ") {
                this.speed = -10;
                this.audioFlap.currentTime = 0;
                this.audioFlap.play();
            }
        });
    }
    draw() {
        if(this.currFrame < this.game.FPS / 15)
            this.game.ctx.drawImage(this.imageBirdDownFlap, this.x, this.y);
        else if(this.currFrame < this.game.FPS / 15 * 2) 
            this.game.ctx.drawImage(this.imageBirdMidFlap, this.x, this.y);
        else if(this.currFrame < this.game.FPS / 15 * 3)
            this.game.ctx.drawImage(this.imageBirdUpFlap, this.x, this.y);
    }   
    die() {
        if(this.y <= 0){
            this.game.run = false;
            this.audioDie.play();
            return;
        }
        if(this.y >= this.game.game_height - this.game.base.image.height - this.imageBirdMidFlap.height) {
            this.game.run = false;
            this.audioDie.play();
            return;
        }
        for(let i = 0; i < this.game.pipe.pipes.length; i++) {
            if(this.game.pipe.pipes[i].x - this.imageBirdMidFlap.width < this.x && 
            this.x < this.game.pipe.pipes[i].x + this.game.pipe.imagePipeUp.width) {
                if(this.y > this.game.game_height - this.game.base.image.height - this.game.pipe.pipes[i].height - this.imageBirdMidFlap.height){
                    this.game.run = false;
                    this.audioDie.play();
                    return;
                }
                if(this.y < this.game.game_height - this.game.base.image.height - this.game.pipe.pipes[i].height - this.game.pipe.pipeDistance) {
                    this.game.run = false;
                    this.audioDie.play();
                    return;
                }
            }
        }
    }
}