function teleporter(player) {
	this.player = player;
	this.wepImage = AM.getAsset("./img/weapon/teleporter.png");	
	this.ctx = player.ctx;
	this.game = player.game;
	this.scale = 0.05;
	this.player.ret.type = "airstrike"
};

teleporter.prototype.drawIMG = function(angle) {
	if(this.player.player.turn) {
		var wepImage = rotateImage(this.wepImage, 0);
		var targetCenter = {x: this.player.x + (.5 * this.player.width * this.player.scalingFactor), y: this.player.y +(.5 * this.player.height * this.player.scalingFactor)};
		this.ctx.drawImage(wepImage, targetCenter.x - .25*(wepImage.width*this.scale), targetCenter.y - .5*(wepImage.height*this.scale), wepImage.width*this.scale, wepImage.height*this.scale);
		// Set up current weapon
		if (this.player.teleporterAmmo == 0) {
			this.ctx.globalAlpha = .5;
		}
		this.ctx.beginPath();
		this.ctx.rect(1180, 21, 184, 70);
		this.ctx.fillStyle = 'rgb(202, 188, 105)';
		this.ctx.fill();
		this.ctx.font = '16px Arial';
		//this.ctx.textAlign = 'center';
		//this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(this.player.teleporterAmmo, 1180 + 170, 23 + 55);
		this.ctx.drawImage(this.wepImage, 1220 + 30, 30, wepImage.width * this.scale, wepImage.height * this.scale);
		this.ctx.globalAlpha = 1;
	}
};

teleporter.prototype.fire = function(game, airstrikeLocX, manager, terrain, sprite) {
	this.player.x = airstrikeLocX;
	this.player.y = -300;
	this.player.game.addEntity(new airRocket(game, 2000, manager, terrain, sprite), false);
	//.player.game.addEntity(new airRocket(game,gravityGunLocX, manager, terrain, sprite), false);
};