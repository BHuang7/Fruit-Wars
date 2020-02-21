// turnmanager.js 
// Manages turns and Hud

function turnManager(gameEngine) {
	this.playerOne = { player: 1, hp: 100, turn: false, icon: new Animation(AM.getAsset("./img/explosion/banIdle.png"), 128, 128, 8, .1, 8, true, 0.5, false) };
	this.playerTwo = { player: 2, hp: 80, turn: false, icon: new Animation(AM.getAsset("./img/Lime/limeIdle.png"), 128, 128, 8, .1, 8, true, .5, false) };
	this.playerThree = { player: 3, hp: 10, turn: false, icon: new Animation(AM.getAsset("./img/Pineapple/pineappleIdle.png"), 128, 128, 8, .1, 8, true, .5, false) };
	this.playerFour = { player: 4, hp: 100, turn: false, icon: new Animation(AM.getAsset("./img/Coconut/coconutIdle.png"), 128, 128, 1, .1, 1, true, 0.5, true) };
	this.starting = true;
	this.shot = false;
	this.exploded = false;
	this.gameEngine = gameEngine;
	this.ctx = gameEngine.ctx;
	this.fromCountDown = false;
	//Array of all foregrounds
	var foregroundArray = [AM.getAsset("./img/terrain/red_dirt.jpg"), AM.getAsset("./img/terrain/dirt.jpg"), AM.getAsset("./img/terrain/purple_dirt.jpg")];
	var levelSelect = Math.floor(Math.random() * foregroundArray.length);
	var ground = new Terrain(gameEngine, foregroundArray[levelSelect]);
	ground.coordinates = ground.generate(50, 500, 50);
	ground.lines = ground.updateLines();

	// Array of all backgroundss
	var backgroundArray = [AM.getAsset("./img/background/background_1.png"), AM.getAsset("./img/background/background_2.png"), AM.getAsset("./img/background/background_3.png")];
	gameEngine.addEntity(new Background(gameEngine, backgroundArray[levelSelect]), false);

	//var ground = new Terrain(gameEngine);
	//gameEngine.addEntity(new Background(gameEngine));
	gameEngine.addEntity(ground, false);
	gameEngine.addEntity(new ban(gameEngine, ground, this, this.playerOne), true);
	gameEngine.addEntity(new lime(gameEngine, ground, this, this.playerTwo), true);
	gameEngine.addEntity(new pineapple(gameEngine, ground, this, this.playerThree), true);
	gameEngine.addEntity(new coconut(gameEngine, ground, this, this.playerFour), true);
	this.turn1 = [this.playerThree, this.playerOne];
	this.counterOne = 0;
	this.turn2 = [this.playerFour, this.playerTwo];
	this.counterTwo = 0;
	this.team1 = false;
	this.team2 = false;

	// Set up Hud
	this.hudBackground = AM.getAsset("./img/hud/hud.png");

	// Current character: 
	this.currentPlayer = this.playerOne;

	// Current weapon: 
	this.currentWeapon = AM.getAsset("./img/weapon/grenadeLauncher.png");

	// Default time per turn in ms
	this.DEFAULT_TIME_LIMIT = 15000;
	this.currentCountDown = createCountDown(this.DEFAULT_TIME_LIMIT);

	Entity.call(this, gameEngine, 0, 0);
}


turnManager.prototype = new Entity();
turnManager.prototype.constructor = turnManager;


turnManager.prototype.update = function () {
	if (this.starting) {
		this.counterOne++;
		this.turn1[this.counterOne % this.turn1.length].turn = true;
		this.team1 = true;
		this.starting = false;
		this.exploded = true;
	}
	if (this.shot || this.currentCountDown() == "Time Up") {
		if (this.currentCountDown() == "Time Up") this.fromCountDown = true;
		this.currentCountDown = createCountDown(this.DEFAULT_TIME_LIMIT);
		if (this.team1) {
			this.exploded = false;
			this.team1 = false;
			this.team2 = true;
			this.turn1[this.counterOne % this.turn1.length].turn = false;
			this.counterTwo++;
			this.turn2[this.counterTwo % this.turn2.length].turn = true;
			this.currentPlayer = (this.turn2[this.counterTwo % this.turn2.length]); 
			this.shot = false;
			
		} else if (this.team2) {
			this.exploded = false;
			this.team2 = false;
			this.team1 = true;
			this.counterOne++;
			this.turn2[this.counterTwo % this.turn2.length].turn = false;
			this.turn1[this.counterOne % this.turn1.length].turn = true;
			this.currentPlayer = (this.turn1[this.counterOne % this.turn1.length]);
			this.shot = false;
		}
		if (this.fromCountDown) {
			this.exploded = true;
			this.fromCountDown = false;
		}
	}

	Entity.prototype.update.call(this);
}

turnManager.prototype.draw = function (ctx) {
	// Set background for hud
	ctx.drawImage(this.hudBackground, this.x, this.y);
	ctx.font = "40px Calibri Light";
	ctx.textAlign = 'center';
	ctx.textBaseline = "top";
	ctx.fillStyle = "black";

	ctx.fillText(this.currentCountDown(), 700, 67);
	ctx.fillText("Time", 700, 25);

	// Set Up current character
	this.currentPlayer.icon.drawFrame(this.gameEngine.clockTick, this.ctx, 22, 20);
	
	// Set up current weapon
	ctx.drawImage(this.currentWeapon, 1210, -8);

	drawHealthbar(ctx, 110, 42, 286, 32, this.currentPlayer.hp, 100);
}

// createCountDown retrieves current countdown
function createCountDown(timeRemaining) {
	var startTime = Date.now();
	return function () {
		remaining = timeRemaining - (Date.now() - startTime);
		remainig = parseInt((remaining / 1000) % 60);

		if (remaining < 0) {
			return "Time Up";
		} else {
			return remainig;
		}
	}
}


// drawHealthbar handles the health bar engine
function drawHealthbar(canvas, x, y, width, height, health, max_health) {
	if (health >= max_health) {
		health = max_health;
	}
	if (health <= 0) {
		health = 0;
	}
	canvas.fillStyle = '#000000';
	canvas.fillRect(x, y, width, height);
	var colorNumber = Math.round((1 - (health / max_health)) * 0xff) * 0x10000 + Math.round((health / max_health) * 0xff) * 0x100;
	var colorString = colorNumber.toString(16);
	if (colorNumber >= 0x100000) {
		canvas.fillStyle = '#' + colorString;
	} else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
		canvas.fillStyle = '#0' + colorString;
	} else if (colorNumber << 0x10000) {
		canvas.fillStyle = '#00' + colorString;
	}
	canvas.fillRect(x + 1, y + 1, (health / max_health) * (width - 2), height - 2);
}