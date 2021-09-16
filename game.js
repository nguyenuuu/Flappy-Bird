// COPYRIGHT: @@@ NGUYEN-HUU-HIEU
class game {
    init() {
        this.canvas = document.createElement("canvas");
        this.game_width = 500;
        this.game_height = 700;
        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        // run game
        this.FPS = 30;
        this.run = true;
        // creat element game
        this.bg = new bg(this);
        this.base = new base(this);
        this.bird = new bird(this);
        this.pipe = new pipe(this);
        this.score = new score(this);
    }
    loop() {
        this.update();
        this.draw();
    }
    update() {
        this.bg.update();
        this.pipe.update();
        this.base.update();
        this.bird.update();
        this.score.update();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.game_width, this.game_height);
        this.bg.draw();
        this.pipe.draw();
        this.base.draw();
        this.bird.draw();
        this.score.draw();
    }
}

const btn = document.getElementById("restart");
const audioRestart = new Audio("./assets/audio/wing.ogg");
let g = new game();
g.init();
let loopGame = setInterval(runGame , 1000 / g.FPS);

btn.addEventListener("click", () => {
    audioRestart.play();
    btn.style.opacity = 0;
    btn.style.pointerEvents = "none";
    document.querySelector("canvas").remove();
    g.init();
    loopGame = setInterval(runGame , 1000 / g.FPS);
});
function runGame() {
    g.loop();
    if(!g.run) {
        btn.style.opacity = 1;
        btn.style.pointerEvents = "all";
        document.querySelector("canvas").style.pointerEvents = "none";
        clearInterval(loopGame);
    }
}