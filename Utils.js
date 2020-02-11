function downloadImage(path, numberOfImages) {
	
		for (var i = 1; i <= numberOfImages; i++) {
			fileName = path + " (" + i  + ")"+ ".png";
			AM.queueDownload(fileName);
		}
}

function assetToArray(path, numberOfImages, array) {
	for (var i = 1; i <= numberOfImages; i++) {
			array.push(AM.getAsset(path + " (" + i  + ")"+ ".png"));
	}
}

function CollisionCircle(sprite, OffsetX, OffsetY, radius, debugMode) {
	this.sprite = sprite;
	this.OffsetX = OffsetX;
	this.OffsetY = OffsetY;
	this.radius = radius;
	if(debugMode) this.debugDraw;
};

CollisionCircle.prototype.debugDraw = function() {
	this.ctx.fillStyle = 'rgba(255, 255, 255, 255)'
	this.ctx.beginPath();
	this.sprite.ctx.arc(this.sprite.x + this.OffsetX, this.sprite.y + this.OffsetY, this.radius, 0, 2 * Math.PI, false);
	this.ctx.fill();
};