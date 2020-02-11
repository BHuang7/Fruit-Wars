// inheritance 
function explosion(game, coordX, coordY) {
	var explosionArr = [];
	assetToArray("./img/explosion/explosion", 32, explosionArr);
	this.animation = new arrAnimation(explosionArr, .02, false, 2, false);
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