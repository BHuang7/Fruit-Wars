function rocket(game,startX, startY, velocityX, velocityY) {	
	this.animation = new Animation(AM.getAsset("./img/rocket/projectile1.png"), 32, 32, 9, .05, 9, true, 1, false);
	this.velocity = {x: velocityX,y: velocityY};
    this.ctx = game.ctx;
    Entity.call(this, game, startX, startY);
}

rocket.prototype = new Entity();
rocket.prototype.constructor = rocket;

rocket.prototype.update = function () {
    if (this.x > 750){
		this.removeFromWorld = true;
		this.game.addEntity(new explosion(this.game,this.x, this.y));
	}
	if (this.x < 0){
		this.removeFromWorld = true;
		this.game.addEntity(new explosion(this.game,this.x, this.y));
	}
	if (this.y < 0){
		this.removeFromWorld = true;
		this.game.addEntity(new explosion(this.game,this.x, this.y));
	}
	if (this.y > 660){
		this.removeFromWorld = true;
		this.game.addEntity(new explosion(this.game,this.x, this.y));
	}
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);
}

rocket.prototype.draw = function () {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		Entity.prototype.draw.call(this);
}