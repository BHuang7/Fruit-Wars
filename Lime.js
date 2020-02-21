function lime(game, terrain, manager, playerData) {
	this.shooter = {angle: 15, power: 25};
	this.ret = new reticle(this, game.ctx);
	this.game = game;
	this.manager = manager;
	this.player = playerData;
	this.scalingFactor = .4;
	this.animationIdle = new Animation(AM.getAsset("./img/Lime/limeIdle.png"), 128, 128, 8, .1, 8, true, this.scalingFactor, false);
	this.animationRunningRight = new Animation(AM.getAsset("./img/Lime/limeRight.png"), 128, 128, 6,.1, 6,true, this.scalingFactor, true);
	this.animationRunningLeft = new Animation(AM.getAsset("./img/Lime/limeLeft.png"),128, 128, 6, .1, 6, true, this.scalingFactor, true);
    this.speed = 0;
	this.height = 128;
	this.width = 128;
	this.offsetRadii = 30;
	this.radius = this.calculateBoundingCircleRadius();
	this.CollisionCicle = new CollisionCircle(this, this.radius, this.scalingFactor, terrain, 13, -4, this.offsetRadii);
    this.ctx = game.ctx;
	this.velocity = {x: 0, y: 0};
	this.terrain = terrain;
	this.collision = false;	
	this.runRight = false;
	this.runLeft = false;
	this.gravity = 10;
	this.oneIntercept = false;
    Entity.call(this, game, 800, 250);
}


lime.prototype = new Entity();
lime.prototype.constructor = lime;

lime.prototype.update = function () {
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
	if (this.player.turn) {
		if(this.game.rightArrow){
			this.shooter.angle += 2;
		}
		if(this.game.leftArrow){
			this.shooter.angle -= 2;
		}
		if(this.game.upArrow){
			this.shooter.power++;
		}
		if(this.game.downArrow){
			this.shooter.power--;
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
		if(this.game.space) {
			var shooterAngle = (this.shooter.angle / 180) * Math.PI;
			var shooterPower = {x: this.shooter.power * Math.cos(shooterAngle),y:this.shooter.power * Math.sin(shooterAngle)};
			this.game.addEntity(new rocket(this.game, this.x, this.y, shooterPower.x * 15, shooterPower.y * 15, this.manager, this.terrain));
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
    //if (this.x > 800) this.x = -230;
	//if (this.y > 800) this.y = -230;
	if (this.shooter.power > 50) this.shooter.power = 50;
	if (this.shooter.power < 0) this.shooter.power = 0;
	if (this.shooter.angle > 360) this.shooter.angle -= 360;
	if (this.shooter.angle < 0) this.shooter.angle += 360;
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);

}


lime.prototype.draw = function () {
	this.ret.drawReticle(this);
	this.CollisionCicle.debugDraw();
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
    Entity.prototype.draw.call(this);
}

lime.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}