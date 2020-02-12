function ban(game, spritesheetArray, terrain) {
	this.scalingFactor = .5;
	this.animation = new arrAnimation(spritesheetArray, .05, true, this.scalingFactor, true);
    this.speed = 250;
	this.height = spritesheetArray[0].height;
	this.width = spritesheetArray[0].width;
	this.radius = this.calculateBoundingCircleRadius();
	this.CollisionCicle = new CollisionCircle(this, this.radius, this.scalingFactor, terrain);
    this.ctx = game.ctx;
	this.terrain = terrain;
	this.veloctiy = 0;
	this.gravity = 10;
	this.collision = false;
    Entity.call(this, game, 100, 50);
}

ban.prototype = new Entity();
ban.prototype.constructor = ban;

ban.prototype.update = function () {
	if (!this.collision) {
		this.y += this.game.clockTick * this.speed;
	}
    if (this.y > 800) this.y = -230;
    Entity.prototype.update.call(this);
}

ban.prototype.draw = function () {
	this.CollisionCicle.debugDraw();
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

ban.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}