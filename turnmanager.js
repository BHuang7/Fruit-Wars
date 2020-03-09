// turnmanager.js 
// Manages turns and Hud

function turnManager(gameEngine) {
	this.playerOne = { player: 1, hp: 100, turn: false, icon: new Animation(AM.getAsset("./img/explosion/banIdle.png"), 128, 128, 8, .1, 8, true, 0.51, false) };
	this.playerTwo = { player: 2, hp: 100, turn: false, icon: new Animation(AM.getAsset("./img/Lime/limeIdle.png"), 128, 128, 8, .1, 8, true, .58, false) };
	this.playerThree = { player: 3, hp: 100, turn: false, icon: new Animation(AM.getAsset("./img/Pineapple/pineappleIdle.png"), 128, 128, 8, .1, 8, true, .52, false) };
	this.playerFour = { player: 4, hp: 100, turn: false, icon: new Animation(AM.getAsset("./img/Coconut/coconutIdle.png"), 128, 128, 8, .1, 8, true, 0.58, false) };
	this.starting = true;
	this.shot = false;
	this.exploded = false;
	this.gameEngine = gameEngine;
	this.ctx = gameEngine.ctx;
	this.fromCountDown = false;
	this.explosionX = 0;
	this.explosionY = 0;
	this.explosionRadius = 0;
	this.explosionOccured = false;
	//Array of all foregrounds
	var foregroundArray = [AM.getAsset("./img/terrain/red_dirt.jpg"), AM.getAsset("./img/terrain/dirt.jpg"), AM.getAsset("./img/terrain/purple_dirt.jpg")];
	var levelSelect = Math.floor(Math.random() * foregroundArray.length);
	var ground = new Terrain(gameEngine, foregroundArray[levelSelect], this);
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

	drawHealthbar(ctx, 110, 42, 286, 32, this.currentPlayer.hp, 100);

	checkGameStatus(ctx, this.turn1, this.turn2);
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
function drawHealthbar(canvas, x, y, width, height, health, max_health, numberVisible, teamColor) {
	if (health >= max_health) {
		health = max_health;
	}
	if (health <= 0) {
		health = 0;
	}
	if (teamColor) {
		canvas.fillStyle = '#000000';
		canvas.fillRect(x, y, width, height);
		canvas.fillStyle = teamColor;
		canvas.fillRect(x + 1, y + 1, (health / max_health) * (width - 2), height - 2);
		canvas.font = "10px Calibri";
		canvas.fillStyle = 'white';
		canvas.fillText(health, x + width / 2 - 5, y + height / 2 + 3);
	} else {
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
	canvas.font = "28px Calibri";
	canvas.fillStyle = ("white");
	if (!numberVisible) canvas.fillText(health + "/" + max_health, 257, 47);
	
}

/**
 * checkGameStatus checks to see if all valid players are in the game 
 * Also, if the game is over
 */
function checkGameStatus(theCanvas, theTeam1, theTeam2) {
	// If an array is empty that means the other team won
	// Check first team to see if anyone is at 0 health 
	if (theTeam1.length > 0) {
		var i;
		for (i = 0; i < theTeam1.length; i++) {
			if (theTeam1[i].hp <= 0) {
				theTeam1.splice(i, 1);
			}
		}
	} else { // Team lost no members left
		theCanvas.fillStyle = "black";
		theCanvas.font = "100px Calibri Light";
		theCanvas.fillText("Game Over", 700, 200);
		theCanvas.fillText("Congratulations Team 2!", 700, 300);
	}

	// Check second team to see if anyone is at 0 health
	if (theTeam2.length > 0) {
		var i;
		for (i = 0; i < theTeam2.length; i++) {
			if (theTeam2[i].hp <= 0) {
				theTeam2.splice(i, 1);
			}
		}
	} else { // Team lost no members left
		theCanvas.fillStyle = "black";
		theCanvas.font = "100px Calibri Light";
		theCanvas.fillText("Game Over", 700, 200);
		theCanvas.fillText("Congratulations Team 1!", 700, 300);
	}

}