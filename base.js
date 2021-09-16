class base {
    constructor(game) {
        this.game = game;
        this.init();
    }
    init() {
        // init image
        this.image = new Image();
        this.image.src = "./assets/images/base.png";
        // image coordinate 
        this.x = 0;
    }
    update() {
        this.x -= 2;
        if(this.x <= -this.image.width)
            this.x = 0;
    }
    draw() {
        this.game.ctx.drawImage(this.image, this.x, this.game.game_height - this.image.height);
        this.game.ctx.drawImage(this.image, this.game.game_width + this.x, this.game.game_height - this.image.height);
    }
}