// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
	this.time = new Timer();
    this.entities = [];
	this.spriteEntities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.gravity = 9.81;
	this.damageTaken = false;
	this.second = false;
	this.wBullet = false;
	this.opacity = 1;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
	this.ctx.canvas.addEventListener("click", function (e) {
		var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
		that.click = true;
		that.xVal = x;
		that.yVal = y;
    }, false);
    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which) === ' ') that.space = true;
		else if (String.fromCharCode(e.which) === 'A') that.a = true;
		else if (String.fromCharCode(e.which) === 'D') that.d = true;
		else if	(e.which === 39) that.rightArrow = true;
		else if	(e.which === 37) that.leftArrow = true;
		else if	(e.which === 38) that.upArrow = true;
		else if	(e.which === 40) that.downArrow = true;
		else if (e.which === 49) that.numOne = true;
		else if (e.which === 50) that.numTwo = true;
		else if (e.which === 51) that.numThree = true;
		else if (e.which === 52) that.numFour = true;
		else if (e.which === 53) that.numFive = true;
		else if (e.which === 54) that.numSix = true;
		else if (e.which === 55) that.numSeven = true;
		else if (e.which === 56) that.numEight = true;
		else if (e.which === 57) that.numNine = true;
        e.preventDefault();
    }, false);
	this.ctx.canvas.addEventListener("keyup", function (e) {
		if (String.fromCharCode(e.which) === 'A') that.a = false;
		else if (String.fromCharCode(e.which) === 'D') that.d = false;
		else if	(e.which === 39) that.rightArrow = false;
		else if	(e.which === 37) that.leftArrow = false;
		else if	(e.which === 38) that.upArrow = false;
		else if	(e.which === 40) that.downArrow = false;
		else if (e.which === 49) that.numOne = false;
		else if (e.which === 50) that.numTwo = false;
		else if (e.which === 51) that.numThree = false;
		else if (e.which === 52) that.numFour = false;
		else if (e.which === 53) that.numFive = false;
		else if (e.which === 54) that.numSix = false;
		else if (e.which === 55) that.numSeven = false;
		else if (e.which === 56) that.numEight = false;
		else if (e.which === 57) that.numNine = false;
        e.preventDefault();
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity, isSprite) {
    console.log('added entity');
    this.entities.push(entity);
	if (isSprite) this.spriteEntities.push(entity); 
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
	if (this.damageTaken) {
		this.time.tick();
		this.yPos -= .5;
		this.ctx.font = '16px Arial';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'rgba(207, 0, 15, ' + this.opacity + ')';  // a color name or by using rgb/rgba/hex values
		this.ctx.fillText("-" + this.damage, this.xPos, this.yPos); // text and position
		if (this.time.gameTime > 1) {
			this.damageTaken = false;
			this.time.gameTime = 0;
		}
	}
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
	for (var i = 0; i < entitiesCount; i++) {
		if (entitiesCount != 0) {
			var entity = this.entities[i];
			if (entity.velocity != undefined) {
				entity.velocity.y += this.gravity;
			}
			if (entity.collision != undefined) {
				if (entity.collision) {
					//entity.velocity.y = 0;
					
				}
			
			}
		}
	}
	
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
	this.click = null;
	//this.a = null;
	//this.d = null;
}

GameEngine.prototype.removeHp = function (damage, index, xPos, yPos, isExplosion, isBullet) {
	this.spriteEntities[index].player.hp -= damage;
	if (isExplosion) this.damage = damage * 2;
	else this.damage = damage;
	this.xPos = xPos;
	this.yPos = yPos;
	if (!isBullet) this.damageTaken = true;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
	
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.beginPath();
        this.strokeStyle = "green";
        this.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.stroke();
        this.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}