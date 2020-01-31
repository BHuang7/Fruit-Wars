// inheritance 
function ninja(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .01, true, .25);
    this.speed = 250;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

ninja.prototype = new Entity();
ninja.prototype.constructor = ninja;

ninja.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

ninja.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


// inheritance 
function tninja(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .1, true, .25);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 425);
}

tninja.prototype = new Entity();
tninja.prototype.constructor = tninja;

tninja.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

tninja.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}