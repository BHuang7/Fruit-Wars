function pineapple(game, terrain,  manager, playerData) {
	this.shooter = {angle: 15, power: 25};
	this.ret = new reticle(this, game.ctx);
	this.game = game;
	this.manager = manager;
	this.player = playerData;
	this.scalingFactor = .4;
	this.animationIdle = new Animation(AM.getAsset("./img/Pineapple/pineappleIdle.png"), 128, 128, 8, .1, 8, true, this.scalingFactor, false);
	this.animationRunningRight = new Animation(AM.getAsset("./img/Pineapple/pineappleRight.png"), 128, 128, 6,.1, 6,true, this.scalingFactor, true);
	this.animationRunningLeft = new Animation(AM.getAsset("./img/Pineapple/pineappleLeft.png"),128, 128, 6, .1, 6, true, this.scalingFactor, true);
    this.speed = 0;
	this.height = 128;
	this.width = 128;
	this.offsetRadii = 25;
	this.radius = this.calculateBoundingCircleRadius();
	this.CollisionCicle = new CollisionCircle(this, game, this.radius, this.scalingFactor, terrain, 11, 0, this.offsetRadii);
    this.ctx = game.ctx;
	this.velocity = {x: 0, y: 0};
	this.terrain = terrain;
	this.collision = false;	
	this.runRight = false;
	this.runLeft = false;
	this.gravity = 10;
	this.oneIntercept = false;
	this.airstrikeLoc = {x:350, y:250};
	this.sniperAmmo = Math.random() * (5 - 1) + 1;
	this.airstrikeAmmo =  Math.random() * (5 - 1) + 1;
	this.weaponName = {name: "grenadeLauncher", ammo: 99999};
	this.selectedWep = new grenadeLauncher(this);
    Entity.call(this, game, 350, 250);
}


pineapple.prototype = new Entity();
pineapple.prototype.constructor = pineapple;

pineapple.prototype.update = function () {
	this.velocity.x = 0;
	if (this.oneIntercept && this.collision) {
		if (distance(this.CollisionCicle.lineSeg.p1, this.CollisionCicle.circleCenter) <= (this.CollisionCicle.radius * this.scalingFactor - this.offsetRadii)
			|| distance(this.CollisionCicle.lineSeg.p2, this.CollisionCicle.circleCenter) <= (this.CollisionCicle.radius * this.scalingFactor - this.offsetRadii)) {
			var lineSegment2 = new LineSegment(this.game, this.CollisionCicle.lineSeg.p1, this.CollisionCicle.lineSeg.p2);
			if (lineSegment2.slope != 0) {
				var temp = findPerpLineSeg(this.CollisionCicle.circleCenter, this.CollisionCicle.radius * this.scalingFactor - this.offsetRadii, lineSegment2);
				this.x += temp.x;
				this.y += temp.y;
				this.velocity.y = 0;
			} else {
				this.velocity.y = 0;
			}
		}
	} else if (!this.oneIntercept && this.collision) {
		var lineSegment = new LineSegment(this.game, this.CollisionCicle.interceptionPoints[0], this.CollisionCicle.interceptionPoints[1]);
		if (lineSegment.slope != 0) {
			var temp = findPerpLineSeg(this.CollisionCicle.circleCenter, this.CollisionCicle.radius * this.scalingFactor - this.offsetRadii, lineSegment);
			this.x += temp.x;
			this.y += temp.y;
			this.velocity.y = 0;
		} else {
			this.velocity.y = 0; 	
		}
	}
	if (this.player.turn && this.manager.exploded) {
		if(this.game.numOne) {
			this.weaponName = {name: 'grenadeLauncher', ammo: 9999};
			this.selectedWep = new grenadeLauncher(this);
		}
		if(this.game.numTwo) {
			this.weaponName = {name :'sniper', ammo: this.sniperAmmo};
			this.selectedWep = new sniper(this);
		}
		if(this.game.numThree) {
			this.weaponName = {name: 'airstrike', ammo: this.airstrikeAmmo};
			this.selectedWep = new airstrike(this);
		}
 		if(this.game.rightArrow){
			if(this.ret.type === "airstrike") {
				this.airstrikeLoc.x += 4;
			}
			else {
				this.shooter.angle += 2;
			}
		}
		if(this.game.leftArrow){
			if(this.ret.type === "airstrike") {
				this.airstrikeLoc.x -= 4;
			}
			else {
				this.shooter.angle -= 2;
			}
			
		}
		if(this.game.upArrow){
			if(this.ret.type === "airstrike") {
				this.airstrikeLoc.y -= 4;
			}
			else {
				this.shooter.power++;
			}
			
		}
		if(this.game.downArrow){
			if(this.ret.type === "airstrike") {
				this.airstrikeLoc.y += 4;
			}
			else {
				this.shooter.power--;
			}
		}
		if (this.game.a){
			this.runLeft = true;
		}
		
		if (this.game.d){ 
			this.runRight = true;
		}
		if(this.game.a === false){
			this.runLeft = false;
		}
		if(this.game.d === false) {
			this.runRight = false;
		}
		if(this.weaponName.ammo > 0 && this.game.space) {
			if (this.weaponName.name == 'sniper') {
				this.sniperAmmo -= 1;
				this.weaponName = {name: 'sniper', ammo: this.sniperAmmo};
			} else if (this.weaponName.name == 'airstrike') {
				this.airstrikeAmmo -= 1;
				this.weaponName = {name: 'airstrike', ammo: this.airstrikeAmmo};
			}
			this.manager.shot = true;
			if(this.ret.type === "arc") {
				var shooterAngle = (this.shooter.angle / 180) * Math.PI;
				var shooterPower = {x: this.shooter.power * Math.cos(shooterAngle),y:this.shooter.power * Math.sin(shooterAngle)};
				this.selectedWep.fire(this.game, this.x, this.y, shooterPower.x * 15, shooterPower.y * 15, this.manager, this.terrain, this);
			}
			if(this.ret.type === "airstrike") {
				this.selectedWep.fire(this.game, this.airstrikeLoc.x, this.manager, this.terrain, this);
			}
			if(this.ret.type === "sniper") {
				this.selectedWep.fire(this.game,this.x, this.y, this.shooter.angle, this.manager, this.terrain, this);
			}
		}
		if (this.runLeft) {
			this.velocity.x = -70;
			if (this.animationRunningLeft.isDone()) {
				this.animationRunningLeft.elapsedTime = 0;
				this.runLeft = false;
			}
		}
		if (this.runRight) {
			this.velocity.x  = 70;
			if (this.animationRunningRight.isDone()) {
				this.animationRunningRight.elapsedTime = 0;
				this.runRight = false;
				
			}
		}
	}
	if (this.x > 1370) this.x = 1369;	
    if (this.x < 0) this.x = 1;
	if (this.airstrikeLoc.x > 1400) this.airstrikeLoc = 1400;
	if (this.airstrikeLoc.x < 0) this.airstrikeLoc = 0;
	if (this.airstrikeLoc.y > 700) this.airstrikeLoc = 700;
	if (this.airstrikeLoc.y < 0) this.airstrikeLoc = 0;
	if (this.shooter.power > 50) this.shooter.power = 50;
	if (this.shooter.power < 0) this.shooter.power = 0;
	if (this.shooter.angle > 360) this.shooter.angle -= 360;
	if (this.shooter.angle < 0) this.shooter.angle += 360;
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);

}


pineapple.prototype.draw = function () {
	this.ret.drawReticle(this);
	this.CollisionCicle.debugDraw(false);
    if (this.runLeft) {
        this.animationRunningLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
	else if (this.runRight) {
        this.animationRunningRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else {
		this.animationRunningLeft.elapsedTime = 0;
		this.animationRunningRight.elapsedTime = 0;
        this.animationIdle.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
	this.selectedWep.drawIMG((this.shooter.angle / 180) * Math.PI);

	if (this.player.hp <= 0){
		this.manager.turn2.splice(1, 1);
		this.removeFromWorld = true;
	}

    Entity.prototype.draw.call(this);
}

pineapple.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}

