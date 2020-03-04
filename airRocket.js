function airRocket(game,startX, manager, terrain, sprite) {	
	this.sprite = sprite;
	this.manager = manager;
	this.terrain = terrain;
	this.isBulletExp = true;
	this.img = AM.getAsset("./img/rocket/airRocket.png");
	this.animation = new Animation(this.img, 12, 48, 15, .05, 15, true, 1, false);
	this.width = this.img.width;
	this.height = this.img.height;
	this.radius = this.calculateBoundingCircleRadius();
	this.velocity = {x: 0,y: 0};
	this.collisionCircle = new CollisionCircle(this, game, this.radius, .1, this.terrain, 3, -30, 0);
    this.ctx = game.ctx;
	this.collision = false;
	this.damage = 10;
    Entity.call(this, game, startX, 0);
}

airRocket.prototype = new Entity();
airRocket.prototype.constructor = airRocket;

airRocket.prototype.update = function () {
	if (this.collision) {
		this.removeFromWorld = true;
		this.game.addEntity(new explosion(this.game, this.x, this.y + 10, this.terrain, this.manager, this.sprite, this.damage), false);
	}
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);
}

airRocket.prototype.draw = function () {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		this.collisionCircle.debugDraw(true);	
		Entity.prototype.draw.call(this);
}

airRocket.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}