// inheritance 
function explosion(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .02, true, 2);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 720, 458);
}

explosion.prototype = new Entity();
explosion.prototype.constructor = explosion;

explosion.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

explosion.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
