// inheritance 
function explosion(game, coordX, coordY, terrain, manager, sprite, damage) {
	this.sprite = sprite;
	this.game = game;
	this.isExplosion = true;
	this.manager = manager;
	this.damage = damage;
	this.img = AM.getAsset("./img/explosion/explosion.png")
	this.animation = new Animation(this.img, 32, 32, 32, .02, 32, false, 2, false);
	this.width = this.img.width / 32;
	this.height = this.img.height;
	this.terrain = terrain;
	this.radius = this.calculateBoundingCircleRadius();
	this.offsetRadii = 0;
	this.collisionCircle = new CollisionCircle(this, game, this.radius, 1, this.terrain, -9, -10, this.offsetRadii);
    this.speed = 0;
    this.ctx = game.ctx;
	this.manager.exploded = true;
	this.collision = false;
	this.manager.explosionRadius = 22; //placeholder until animation changes size
	terrain.explosion({x: coordX+10, y: coordY+15}, this.manager.explosionRadius);
    Entity.call(this, game, coordX - this.width, coordY - this.height + 20);
}

explosion.prototype = new Entity();
explosion.prototype.constructor = explosion;

explosion.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
}

explosion.prototype.draw = function () {
	if(this.animation.isDone()) {
		this.manager.explosionX = this.collisionCircle.circleCenter.x;
		this.manager.explosionY = this.collisionCircle.circleCenter.y;
		this.manager.explosionRadius = this.collisionCircle.newRadii;
		this.manager.explosionOccured = true;
		this.removeFromWorld = true;
		this.collisionCircle.hpSubtraction = false;
	}
	else {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
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
    this.collisionCircle.debugDraw(true);
    Entity.prototype.draw.call(this);
}

explosion.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}