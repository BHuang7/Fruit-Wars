function turnManager(gameEngine) {
	this.playerOne = {player: 1, hp :100, turn: false};
	this.playerTwo = {player: 2, hp :100, turn: false};
	this.playerThree = {player: 3, hp :100, turn: false};
	this.playerFour = {player: 4, hp :100, turn: false};
	this.timer = 30;
	this.starting = true;
	this.shot = false;
	var ground = new Terrain(gameEngine);
	ground.coordinates = ground.generate(50, 500, 50);	
	gameEngine.addEntity(new Background(gameEngine));
	gameEngine.addEntity(ground);
	gameEngine.addEntity(new ninja(gameEngine));
	gameEngine.addEntity(new ban(gameEngine, ground, this, this.playerOne));
	gameEngine.addEntity(new lime(gameEngine, ground, this, this.playerTwo));
	gameEngine.addEntity(new pineapple(gameEngine, ground, this, this.playerThree));
	this.turns = [this.playerOne, this.playerTwo, this.playerThree, this.playerFour];
}


turnManager.prototype = new Entity();
turnManager.prototype.constructor = turnManager;


turnManager.prototype.update = function () {
	if (this.starting) {
		this.playerOne.turn = true;
		this.starting = false;
	}
	if (this.shot) {
		if (this.playerOne.turn) {
			this.playerOne.turn = false;
			this.playerThree.turn = true;
			this.shot = false;
		}
		else if (this.playerThree.turn) {
			this.playerThree.turn = false;
			this.playerTwo.turn = true;
			this.shot = false;
		}
		else if (this.playerTwo.turn) {
			this.playerTwo.turn = false;
			this.playerFour.turn = true;
			this.shot = false;
		}
		else {
			this.playerFour.turn = false;
			this.playerOne.turn = true;
			this.shot = false;
		}
	}
	Entity.prototype.update.call(this);
}
turnManager.prototype.draw = function () { 

}
