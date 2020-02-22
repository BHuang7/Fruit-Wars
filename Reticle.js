function reticle(player, ctx) {
	this.player = player;
	this.shooterAngle = (this.player.shooter.angle / 180) * Math.PI;
	this.shooterPower = {x: this.player.shooter.power * Math.cos(this.shooterAngle),y:this.player.shooter.power * Math.sin(this.shooterAngle)};
	this.ctx = ctx;
	this.image = AM.getAsset("./img/rocket/reticle.png");
	this.width = this.image.width;
	this.height = this.image.height;
	this.type = "arc";
};

reticle.prototype.drawReticle = function(player) {
	if(this.type === "arc"){
		this.shooterAngle = (player.shooter.angle / 180) * Math.PI;
		this.shooterPower = {x: player.shooter.power * Math.cos(this.shooterAngle),y:player.shooter.power * Math.sin(this.shooterAngle)};
		if(this.player.player.turn){
			this.ctx.drawImage(this.image, this.player.x + (.5 * this.player.width * this.player.scalingFactor) + this.shooterPower.x - 7.5, this.player.y +(.5 * this.player.height * this.player.scalingFactor)+this.shooterPower.y - 7.5, 15, 15);
			this.ctx.beginPath();
			this.ctx.moveTo(this.player.x + (.5 * this.player.width * this.player.scalingFactor), this.player.y + (.5 * this.player.height * this.player.scalingFactor));
			this.ctx.lineTo(this.player.x + (.5 * this.player.width * this.player.scalingFactor) + this.shooterPower.x, this.player.y +(.5 * this.player.height * this.player.scalingFactor)+this.shooterPower.y);
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}
	
	else if(this.type === "sniper"){
		this.shooterAngle = (player.shooter.angle / 180) * Math.PI;
		this.shooterPower = {x: 50 * Math.cos(this.shooterAngle),y:50 * Math.sin(this.shooterAngle)};
		if(this.player.player.turn){
			this.ctx.drawImage(this.image, this.player.x + (.5 * this.player.width * this.player.scalingFactor) + this.shooterPower.x - 7.5, this.player.y +(.5 * this.player.height * this.player.scalingFactor)+this.shooterPower.y - 7.5, 15, 15);
		}
	}
	
	else if(this.type === "airstrike"){
		if(this.player.player.turn){
			this.ctx.drawImage(this.image, this.player.airstrikeLoc.x - 7.5, this.player.airstrikeLoc.y - 7.5, 15, 15);
			this.ctx.beginPath();
			this.ctx.moveTo(this.player.airstrikeLoc.x, 0);
			this.ctx.lineTo(this.player.airstrikeLoc.x, 700)
			this.ctx.closePath();
			this.ctx.stroke();
			
			
			this.ctx.beginPath();
			this.ctx.moveTo(0, this.player.airstrikeLoc.y);
			this.ctx.lineTo(1400, this.player.airstrikeLoc.y)
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}
	
};