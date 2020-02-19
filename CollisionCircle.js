function CollisionCircle(sprite, radius, scale, terrain, offsetX, offsetY, offsetRadii) {
	this.sprite = sprite;
	this.radius = radius;
	this.scale = scale;
	this.terrain = terrain;
	this.interceptionPoints = [];
	this.pointsCollided = [];
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.offsetRadii = offsetRadii;
};


CollisionCircle.prototype.debugDraw = function() {
	this.sprite.collision = false;
	this.sprite.oneIntercept = false;
	let centerX = this.sprite.x + (this.radius * this.scale) - this.offsetX;
	let centerY = this.sprite.y + (this.radius * this.scale) - this.offsetY ;
	this.circleCenter = {x : centerX, y: centerY};
	for (var i = 0; i < this.terrain.coordinates.length - 1; i++) {
		var pointOne = {x : this.terrain.coordinates[i][0], y: this.terrain.coordinates[i][1]};
		var pointTwo = {x:  this.terrain.coordinates[i + 1][0], y: this.terrain.coordinates[i + 1][1]};
		if (inteceptCircleLineSeg(this.circleCenter, this.radius * this.scale - this.offsetRadii, pointOne, pointTwo).length >= 1) {
			if (inteceptCircleLineSeg(this.circleCenter, this.radius * this.scale - this.offsetRadii, pointOne, pointTwo).length == 1) {
				this.lineSeg = {p1:pointOne, p2:pointTwo};
				this.sprite.oneIntercept = true;
			}
			this.interceptionPoints = inteceptCircleLineSeg(this.circleCenter, this.radius * this.scale - this.offsetRadii, pointOne, pointTwo);
			this.sprite.collision = true;
			break;
		}
	}
	// console.log("debugDraw")
	//Transparent colliding circle
	this.sprite.ctx.fillStyle = 'rgba(0, 0, 200, 0)'
	//Visualized Colliding Circle
	//this.sprite.ctx.fillStyle = 'rgba(255, 255, 255, 255)'
	this.sprite.ctx.beginPath();
	this.sprite.ctx.arc(centerX, centerY, this.radius * this.scale - this.offsetRadii , 2 * Math.PI, false);
	this.sprite.ctx.fill();
};
	