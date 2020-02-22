function sniperBullet(game,startX, startY, angle, manager, terrain, sprite) {	
	this.sprite = sprite;
	this.manager = manager;
	this.terrain = terrain;
	this.img = rotateImage(AM.getAsset("./img/rocket/sniperBullet.png"),(angle / 180) * Math.PI);
	this.animation = new Animation(this.img, 900, 900, 1, .05, 1, true, 1/30, false);
	this.width = this.img.width;
	this.height = this.img.height;
	this.radius = this.calculateBoundingCircleRadius();
	this.collisionCircle = new CollisionCircle(this, game, this.radius, 1/100, this.terrain, -9, -10, 0);
    this.ctx = game.ctx;
	this.collision = false;
	this.speed = 500;
	this.damage = 20;
	this.shooterAngle = (angle / 180) * Math.PI;
	this.velo = {x: this.speed * Math.cos(this.shooterAngle),y:this.speed * Math.sin(this.shooterAngle)};
	
    Entity.call(this, game, startX, startY);
}

sniperBullet.prototype = new Entity();
sniperBullet.prototype.constructor = sniperBullet;

sniperBullet.prototype.update = function () {
	if (this.collision) {
		this.manager.explosionOccured = true;
		this.manager.exploded = true;
		this.collisionCircle.hpSubtraction = false;
		this.removeFromWorld = true;
		
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
	this.x += this.game.clockTick * this.velo.x;
	this.y += this.game.clockTick * this.velo.y;
	console.log(this.x + " " + this.y);
    Entity.prototype.update.call(this);
}

sniperBullet.prototype.draw = function () {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		this.collisionCircle.debugDraw(true);	
		Entity.prototype.draw.call(this);
}

sniperBullet.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}