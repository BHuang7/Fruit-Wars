// inheritance 
function explosion(game, coordX, coordY, terrain, manager) {
	this.manager = manager;
	this.img = AM.getAsset("./img/explosion/explosion.png")
	this.animation = new Animation(this.img, 32, 32, 32, .02, 32, false, 2, false);
	this.width = this.img.width;
	this.height = this.img.height;
	this.terrain = terrain;
	this.radius = this.calculateBoundingCircleRadius();
	this.offsetRadii = 0;
	this.collisionCircle = new CollisionCircle(this, this.radius, .05, this.terrain, -9, -10, this.offsetRadii);
    this.speed = 0;
    this.ctx = game.ctx;
	this.manager.exploded = true;
	this.collision = false;
    Entity.call(this, game, coordX, coordY);
}

explosion.prototype = new Entity();
explosion.prototype.constructor = explosion;

explosion.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
	if (this.collision) {
		console.log("collision");
	}
    Entity.prototype.update.call(this);
}

explosion.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

explosion.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}