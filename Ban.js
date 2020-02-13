function ban(game, spritesheetArray, terrain) {
	this.game = game;
	this.scalingFactor = .5;
	this.animation = new arrAnimation(spritesheetArray, .05, true, this.scalingFactor, true);
    this.speed = 0;
	this.height = spritesheetArray[0].height;
	this.width = spritesheetArray[0].width;
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
    Entity.call(this, game, 100, 250);
}


ban.prototype = new Entity();
ban.prototype.constructor = ban;

ban.prototype.update = function () {
	this.velocity.x = 0;
	if (this.oneIntercept && this.collision) {
		this.velocity.y = 0;
	} else if (!this.oneIntercept && this.collision) {
		var lineSegment = new LineSegment(this.game, this.CollisionCicle.interceptionPoints[0], this.CollisionCicle.interceptionPoints[1]);
		var temp = findPerpLineSeg(this.CollisionCicle.circleCenter, this.CollisionCicle.radius,lineSegment);
		this.x += temp.x;
		this.y += temp.y;
		this.velocity.y = 0;
		// this.CollisionCircle.circle
		//console.log(this.CollisionCicle.interceptionPoints);
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
		this.velocity.x = -100;
        if (this.animation.isDone()) {
            this.animation.elapsedTime = 0;
			this.runLeft = false;
        }
	}
	if (this.runRight) {
		this.velocity.x  = 100;
        if (this.animation.isDone()) {
            this.animation.elapsedTime = 0;
			this.runRight = false;
            
        }
	}
    if (this.x > 800) this.x = -230;
	if (this.y > 800) this.y = -230;
	this.x += this.game.clockTick * this.velocity.x;
	this.y += this.game.clockTick * this.velocity.y;
    Entity.prototype.update.call(this);
}

ban.prototype.draw = function () {
	this.CollisionCicle.debugDraw();
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

ban.prototype.calculateBoundingCircleRadius = function() {
	return Math.sqrt(((this.width/2 * this.width/2) + (this.height/2 * this.height/2)));
}