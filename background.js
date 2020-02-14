/**
 * Background initializes the background entity
 * 
 * @param {the game engine} game 
 * @param {the image we want displayed in the background} backgroundImage 
 */
function Background(game, backgroundImage) {
    this.x = 0;
    this.y = 0;
    // Randomly select a value from sprites array 
    this.spritesheet = backgroundImage;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 800, 700);
};

Background.prototype.update = function () {
};