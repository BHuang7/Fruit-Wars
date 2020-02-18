downloadImage("./img/ninja/Ninja_Idle", 10);
downloadImage("./img/ninja/Ninja_Left", 10);
downloadImage("./img/explosion/bananaRunning", 5);
downloadImage("./img/explosion/explosion", 32);
downloadImage("./img/ninja/Ninja_Throw", 10);
downloadImage("./img/rocket/rocket", 15);
downloadImage("./img/ninja/Ninja_Run", 10);
AM.queueDownload("./img/terrain/dirt.jpg");
AM.queueDownload("./img/terrain/red_dirt.jpg")
AM.queueDownload("./img/terrain/purple_dirt.jpg")
AM.queueDownload("./img/background/background_1.png");
AM.queueDownload("./img/background/background_2.png");
AM.queueDownload("./img/background/background_3.png");
AM.queueDownload("./img/ninja/ninjaRight.png");
AM.queueDownload("./img/ninja/ninjaIdle.png");
AM.queueDownload("./img/ninja/ninjaLeft.png");
AM.queueDownload("./img/explosion/banLeft.png");
AM.queueDownload("./img/explosion/banRight.png");
AM.queueDownload("./img/explosion/banIdle.png");
AM.queueDownload("./img/rocket/projectile1.png");
AM.queueDownload("./img/explosion/explosion.png");
AM.queueDownload("./img/Lime/limeIdle.png");
AM.queueDownload("./img/Lime/limeLeft.png");
AM.queueDownload("./img/Lime/limeRight.png");
AM.queueDownload("./img/Pineapple/pineappleIdle.png");
AM.queueDownload("./img/Pineapple/pineappleLeft.png");
AM.queueDownload("./img/Pineapple/pineappleRight.png");
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
	var banArr = [];
	assetToArray("./img/explosion/bananaRunning", 5, banArr);	
	var explosionArr = [];
	assetToArray("./img/explosion/explosion", 32, explosionArr);
	var tninjaArr = [];
	assetToArray("./img/ninja/Ninja_Throw", 10, tninjaArr);
	var rocketArr = [];
	assetToArray("./img/rocket/rocket", 15, rocketArr);
	var ninjaRun = [];
	assetToArray("./img/ninja/Ninja_Run", 10, ninjaRun);
	var ninjaIdle = [];
	assetToArray("./img/ninja/Ninja_Idle", 10, ninjaIdle);
	var ninjaRunLeft = [];
	assetToArray("./img/ninja/Ninja_Left", 10, ninjaRunLeft);

	//Array of all foregrounds
	var foregroundArray = [AM.getAsset("./img/terrain/red_dirt.jpg"), AM.getAsset("./img/terrain/dirt.jpg"), AM.getAsset("./img/terrain/purple_dirt.jpg")];
	var levelSelect = Math.floor(Math.random() * foregroundArray.length);
	var ground = new Terrain(gameEngine, foregroundArray[levelSelect]);
	ground.coordinates = ground.generate(50, 500, 50);

	// Array of all backgrounds
	var backgroundArray = [AM.getAsset("./img/background/background_1.png"), AM.getAsset("./img/background/background_2.png"), AM.getAsset("./img/background/background_3.png")];
	gameEngine.addEntity(new Background(gameEngine, backgroundArray[levelSelect]));
	
	gameEngine.addEntity(ground);
	gameEngine.addEntity(new ninja(gameEngine,ninjaIdle, ninjaRun, ninjaRunLeft, tninjaArr));
	gameEngine.addEntity(new ban(gameEngine, banArr, ground));
    gameEngine.start();	
	gameEngine.addEntity(new turnManager(gameEngine));

});