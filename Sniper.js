function sniper(player) {
	this.player = player;
	this.wepImage = AM.getAsset("./img/weapon/sniper.png");
	this.backwepImage = AM.getAsset("./img/weapon/sniperB.png");
	this.ctx = player.ctx;
	this.scale = .5;
	this.player.ret.type = "sniper"
};

sniper.prototype.drawIMG = function(angle) {
	if(this.player.player.turn) {
		if(angle > Math.PI/2 && angle < (3*Math.PI)/2 ) {
			var wepImage = rotateImage(this.backwepImage, angle + Math.PI);
			var targetCenter = {x: this.player.x + (.5 * this.player.width * this.player.scalingFactor), y: this.player.y +(.5 * this.player.height * this.player.scalingFactor)};
			this.ctx.drawImage(wepImage, targetCenter.x - .5*(wepImage.width*this.scale), targetCenter.y - .5*(wepImage.height*this.scale), wepImage.width*this.scale, wepImage.height*this.scale);
			
		}
		else{
			var wepImage = rotateImage(this.wepImage, angle);
			var targetCenter = {x: this.player.x + (.5 * this.player.width * this.player.scalingFactor), y: this.player.y +(.5 * this.player.height * this.player.scalingFactor)};
			this.ctx.drawImage(wepImage, targetCenter.x - .5*(wepImage.width*this.scale), targetCenter.y - .5*(wepImage.height*this.scale), wepImage.width*this.scale, wepImage.height*this.scale);
		}
		// Set up current weapon
		if (this.player.sniperAmmo == 0) {
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
		this.ctx.fillText(this.player.sniperAmmo, 1180 + 170, 23 + 55);
		this.ctx.drawImage(rotateImage(this.wepImage, 0), 1220, 0, wepImage.width*.8, wepImage.height*.8);
		this.ctx.globalAlpha = 1;
		
	}
};

sniper.prototype.fire = function(game,startX, startY, angle, manager, terrain, sprite) {
	this.player.game.addEntity(new sniperBullet(game,startX, startY, angle, manager, terrain, sprite), false);
	
};