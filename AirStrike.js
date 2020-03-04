function airstrike(player) {
	this.player = player;
	this.wepImage = AM.getAsset("./img/weapon/airStrike.png");
	this.ctx = player.ctx;
	this.scale = 0.075;
	this.player.ret.type = "airstrike"
};

airstrike.prototype.drawIMG = function(angle) {
	if(this.player.player.turn) {
		var wepImage = rotateImage(this.wepImage, 0);
		var targetCenter = {x: this.player.x + (.5 * this.player.width * this.player.scalingFactor), y: this.player.y +(.5 * this.player.height * this.player.scalingFactor)};
		this.ctx.drawImage(wepImage, targetCenter.x - .25*(wepImage.width*this.scale), targetCenter.y - .5*(wepImage.height*this.scale), wepImage.width*this.scale, wepImage.height*this.scale);
		
		// Set up current weapon
		if (this.player.airstrikeAmmo == 0) {
			this.ctx.globalAlpha = .5;
		}
		this.ctx.beginPath();
		this.ctx.rect(1180, 21, 184, 70);
		this.ctx.fillStyle = 'rgb(202, 188, 105)';
		this.ctx.fill();
		this.ctx.font = '16px Arial';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(this.player.airstrikeAmmo, 1180 + 170, 23 + 55);
		this.ctx.drawImage(rotateImage(this.wepImage, 0), 1250, 30, wepImage.width*.08, wepImage.height*.08);
		this.ctx.globalAlpha = 1;
	}
};

airstrike.prototype.fire = function(game, airstrikeLocX, manager, terrain, sprite) {
	this.player.game.addEntity(new airRocket(game,airstrikeLocX, manager, terrain, sprite), false);
};