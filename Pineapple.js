function pineapple(game, terrain) {
	this.game = game;
	this.scalingFactor = .25;
	this.animationIdle = new Animation(AM.getAsset("./img/Pineapple/pineappleIdle.png"), 128, 128, 8, .1, 8, true, this.scalingFactor, false);
	this.animationRunningRight = new Animation(AM.getAsset("./img/Pineapple/pineappleRight.png"), 128, 128, 5,.1, 5,true, this.scalingFactor, true);
	this.animationRunningLeft = new Animation(AM.getAsset("./img/Pineapple/pineappleLeft.png"),128, 128, 5, .1, 5, true, this.scalingFactor, true);
    this.speed = 0;
	this.height = 128;
	this.width = 128;
	this.radius = this.calculateBoundingCircleRadius();
	this.CollisionCicle = new CollisionCircle(this, this.radius, this.scalingFactor, terrain);
    this.ctx = game.ctx;
	this.velocity = {x: 0, y: 0};
	this.terrain = terrain;
	this.collision = false;	
	this.runRight = false;
	this.runLeft = false;
	this.gravity = 10;
	this.oneIntercept = false;
    Entity.call(this, game, 500, 250);
}


pineapple.prototype = new Entity();
pineapple.prototype.constructor = pineapple;

pineapple.prototype.update = function () {
	this.velocity.x = 0;
	if (this.oneIntercept && this.collision) {
		if (distance(this.CollisionCicle.lineSeg.p1, this.CollisionCicle.circleCenter) <= (this.CollisionCicle.radius * this.scalingFactor - 20)
			|| distance(this.CollisionCicle.lineSeg.p2, this.CollisionCicle.circleCenter) <= (this.CollisionCicle.radius * this.scalingFactor - 20)) {
			var lineSegment2 = new LineSegment(this.game, this.CollisionCicle.lineSeg.p1, this.CollisionCicle.lineSeg.p2);
			if (lineSegment2.slope != 0) {
				var temp = findPerpLineSeg(this.CollisionCicle.circleCenter, this.CollisionCicle.radius * this.scalingFactor - 20, lineSegment2);
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
			var temp = findPerpLineSeg(this.CollisionCicle.circleCenter, this.CollisionCicle.radius * this.scalingFactor - 20, lineSegment);
			this.x += temp.x;
			this.y += temp.y;
			this.velocity.y = 0;
		} else {
			this.velocity.y = 0; 	
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
    if (this.x > 800) this.x = -230;
	if (this.y > 800) this.y = -230;
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);

}


pineapple.prototype.draw = function () {
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

pineapple.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}