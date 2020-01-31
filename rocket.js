function rocket(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .005, true, 3);
    this.speed = 600;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 475);
}

rocket.prototype = new Entity();
rocket.prototype.constructor = rocket;

rocket.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 650) this.x = 50;
    Entity.prototype.update.call(this);
}

rocket.prototype.draw = function () {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		Entity.prototype.draw.call(this);
}