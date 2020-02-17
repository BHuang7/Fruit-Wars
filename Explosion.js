// inheritance 
function explosion(game, coordX, coordY) {
	this.animation = new Animation(AM.getAsset("./img/explosion/explosion.png"), 32, 32, 32, .02, 32, false, 2, false);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, coordX, coordY);
}

explosion.prototype = new Entity();
explosion.prototype.constructor = explosion;

explosion.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
}

explosion.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}