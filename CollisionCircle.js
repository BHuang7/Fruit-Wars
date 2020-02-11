function CollisionCircle(sprite, OffsetX, OffsetY, radius) {
	this.sprite = sprite;
	this.OffsetX = OffsetX;
	this.OffsetY = OffsetY;
	this.radius = radius;
};

CollisionCircle.prototype.debugDraw = function() {
	console.log("debugDraw")
	this.sprite.ctx.fillStyle = 'rgba(255, 255, 255, 255)'
	this.sprite.ctx.beginPath();
	this.sprite.ctx.arc(this.sprite.x + this.OffsetX, this.sprite.y + this.OffsetY, this.radius, 0, 2 * Math.PI, false);
	this.sprite.ctx.fill();
};