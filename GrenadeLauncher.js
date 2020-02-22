function grenadeLauncher(player) {
	this.player = player;
	this.wepImage = AM.getAsset("./img/weapon/grenadeLauncher.png");
	this.ctx = player.ctx;
	this.scale = .5;
	this.player.ret.type = "arc"
};

grenadeLauncher.prototype.drawIMG = function(angle) {
	if(this.player.player.turn) {
		var wepImage = rotateImage(this.wepImage, angle);
		var targetCenter = {x: this.player.x + (.5 * this.player.width * this.player.scalingFactor), y: this.player.y +(.5 * this.player.height * this.player.scalingFactor)};
		this.ctx.drawImage(wepImage, targetCenter.x - .5*(wepImage.width*this.scale), targetCenter.y - .5*(wepImage.height*this.scale), wepImage.width*this.scale, wepImage.height*this.scale);
		// Set up current weapon
		this.ctx.drawImage(rotateImage(this.wepImage, 0), 1220, 0, wepImage.width*.8, wepImage.height*.8);
	}
};

grenadeLauncher.prototype.fire = function(game, x, y, shooterPowerX, shooterPowerY, manager, terrain, sprite) {
	this.player.game.addEntity(new rocket(game, x, y, shooterPowerX, shooterPowerY, manager, terrain, sprite), false);
};