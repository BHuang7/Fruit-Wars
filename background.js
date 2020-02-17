/**
 * Background initializes the background entity
 * 
 * @param {the game engine} game 
 * @param {the sprites image array} spritesheetArray 
 */
function Background(game) {
    this.x = 0;
    this.y = 0;
	var spritesheetArray = [AM.getAsset("./img/background/background_1.png"), AM.getAsset("./img/background/background_2.png"), AM.getAsset("./img/background/background_3.png")]
    // Randomly select a value from sprites array 
    var randomValue = Math.floor(Math.random() * spritesheetArray.length);
    this.spritesheet = spritesheetArray[randomValue];
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 800, 700);
};

Background.prototype.update = function () {
};