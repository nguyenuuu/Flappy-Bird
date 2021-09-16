class bg {
    constructor(game) {
        this.game = game;
        this.init();
    }
    init() {
        // init imagae
        this.image = new Image();
        this.image.src = "./assets/images/background.png";
        // image coordinate
        this.x = 0;
    }
    update() {
        this.x -= 0.3;
        if(this.x <= -this.image.width)
            this.x = 0;
    }
    draw() {
       this.game.ctx.drawImage(this.image, this.x, 0);
       this.game.ctx.drawImage(this.image, this.game.game_width + this.x, 0);
    }
}