// inheritance 
function ninja(game, spritesheetArrayIdle, spritesheetArrayRunRight, spritesheetArrayRunLeft) {
	this.animationIdle = new arrAnimation(spritesheetArrayIdle, .1, true, .25, "Idle");
	this.animationRunningRight = new arrAnimation(spritesheetArrayRunRight, .01, true, .25, "Running Right");
	this.animationRunningLeft = new arrAnimation(spritesheetArrayRunLeft, .01, true, .25, "Running Left");
	this.runRight = false;
	this.runLeft = false;
	this.throwing = false;
	this.speed = 0;
    this.ctx = game.ctx;
	this.game = game;
    Entity.call(this, game, 400, 585);
}

ninja.prototype = new Entity();
ninja.prototype.constructor = ninja;

ninja.prototype.update = function () {
	this.speed = 0;
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
		this.speed = -250;
        if (this.animationRunningLeft.isDone()) {
            this.animationRunningLeft.elapsedTime = 0;
			this.runLeft = false;
        }
	}
	if (this.runRight) {
		this.speed = 250;
        if (this.animationRunningRight.isDone()) {
            this.animationRunningRight.elapsedTime = 0;
			this.runRight = false;
            
        }
	}
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = 0;
	if (this.x < 0) this.x = 800;
    Entity.prototype.update.call(this);
}

ninja.prototype.draw = function () {
	if (this.runLeft) {
		console.log("run left");
        this.animationRunningLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
	else if (this.runRight) {
		console.log("run right");
        this.animationRunningRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else {
		console.log("idle");
        this.animationIdle.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}