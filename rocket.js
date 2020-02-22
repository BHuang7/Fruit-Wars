function rocket(game,startX, startY, velocityX, velocityY, manager, terrain, sprite) {	
	this.sprite = sprite;
	this.terrain = terrain;
	this.img = AM.getAsset("./img/rocket/projectile1.png");
	this.animation = new Animation(this.img, 32, 32, 9, .05, 9, true, 1, false);
	this.width = this.img.width;
	this.height = this.img.height;
	this.radius = this.calculateBoundingCircleRadius();
	this.velocity = {x: velocityX,y: velocityY};
	this.collisionCircle = new CollisionCircle(this, game, this.radius, .05, this.terrain, -9, -10, 0);
    this.ctx = game.ctx;
	this.manager = manager;
	this.collision = false;
	this.damage = 7.5;
    Entity.call(this, game, startX, startY);
}

rocket.prototype = new Entity();
rocket.prototype.constructor = rocket;

rocket.prototype.update = function () {
	if (this.collision) {
		this.removeFromWorld = true;
		this.game.addEntity(new explosion(this.game, this.x, this.y, this.terrain, this.manager, this.sprite, this.damage), false);
	}
	if (this.x > 1400 || this.x < 0)  {
		this.manager.explosionOccured = true;
		this.manager.exploded = true;
		this.collisionCircle.hpSubtraction = false;
		this.removeFromWorld = true;	
	}
	
	if (this.y < 0) {
		this.manager.explosionOccured = true;
		this.manager.exploded = true;
		this.collisionCircle.hpSubtraction = false;
		this.removeFromWorld = true;	
	}
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);
}

rocket.prototype.draw = function () {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		this.collisionCircle.debugDraw(true);	
		Entity.prototype.draw.call(this);
}

rocket.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}