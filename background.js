/**
 * Background initializes the background entity
 * 
 * @param {the game engine} game 
 * @param {the sprites image array} spritesheetArray 
 */
function Background(game, sprite) {
    this.x = 0;
    this.y = 0;
	
    this.spritesheet = sprite;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, this.game.ctx.canvas.width, this.game.ctx.canvas.height);
};

Background.prototype.update = function () {
};