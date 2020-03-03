function CollisionCircle(sprite, game ,radius, scale, terrain, offsetX, offsetY, offsetRadii) {
	this.sprite = sprite;
	this.game = game;
	this.radius = radius;
	this.scale = scale;
	this.terrain = terrain;
	this.interceptionPoints = [];
	this.pointsCollided = [];
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.offsetRadii = offsetRadii;
	this.prevSprite;
	this.hpSubraction = false;
};


CollisionCircle.prototype.debugDraw = function(isProjectile) {
	this.sprite.collision = false;
	this.sprite.oneIntercept = false;
	this.newRadii = this.radius * this.scale - this.offsetRadii;
	let centerX = this.sprite.x + (this.radius * this.scale) - this.offsetX;
	let centerY = this.sprite.y + (this.radius * this.scale) - this.offsetY;
	this.circleCenter = {x : centerX, y: centerY};
	if (isProjectile) {
		for (var i = 0; i < this.game.spriteEntities.length; i++) {
			if (this.sprite.sprite != this.game.spriteEntities[i]) {
				if(circleToCircleCollision(this.circleCenter, this.game.spriteEntities[i].CollisionCicle.circleCenter, this.newRadii, this.game.spriteEntities[i].CollisionCicle.newRadii) && !this.hpSubraction) {
					this.sprite.collision = true;
					this.game.removeHp(this.sprite.damage, i, centerX, centerY);
					this.hpSubraction = true;
					break;
				}
			}
		}
	}
	for (var i = 0; i < this.terrain.coordinates.length - 1; i++) {
		var pointOne = {x : this.terrain.coordinates[i].x, y: this.terrain.coordinates[i].y};
		var pointTwo = {x:  this.terrain.coordinates[i + 1].x, y: this.terrain.coordinates[i + 1].y};
		if (inteceptCircleLineSeg(this.circleCenter, this.newRadii, pointOne, pointTwo).length >= 1) {
			if (inteceptCircleLineSeg(this.circleCenter, this.newRadii, pointOne, pointTwo).length == 1) {
				this.lineSeg = {p1:pointOne, p2:pointTwo};
				this.sprite.oneIntercept = true;
			}
			this.interceptionPoints = inteceptCircleLineSeg(this.circleCenter, this.newRadii, pointOne, pointTwo);
			this.sprite.collision = true;
			break;
		}
	}
	
	// console.log("debugDraw")
	//Transparent colliding circle
	this.sprite.ctx.fillStyle = 'rgba(0, 0, 200, 0)'
	//Visualized Colliding Circle
	//this.sprite.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
	this.sprite.ctx.beginPath();
	this.sprite.ctx.arc(centerX, centerY, this.newRadii , 2 * Math.PI, false);
	this.sprite.ctx.fill();
};