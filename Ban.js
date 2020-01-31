function ban(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .05, true, 1.5);
    this.speed = 250;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 50);
}

ban.prototype = new Entity();
ban.prototype.constructor = ban;

ban.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

ban.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}