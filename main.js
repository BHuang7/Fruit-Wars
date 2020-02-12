downloadImage("./img/ninja/Ninja_Idle", 10);
downloadImage("./img/ninja/Ninja_Left", 10);
downloadImage("./img/explosion/bananaRunning", 5);
downloadImage("./img/explosion/explosion", 32);
downloadImage("./img/ninja/Ninja_Throw", 10);
downloadImage("./img/rocket/rocket", 15);
downloadImage("./img/ninja/Ninja_Run", 10);
AM.queueDownload("./img/background/background_1.png");
AM.queueDownload("./img/background/background_2.png");
AM.queueDownload("./img/background/background_3.png");

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
	var ground = new Terrain(gameEngine);
	ground.coordinates = ground.generate(50, 500, 50);

	// Array of all backgrounds
	var backgroundArray = [AM.getAsset("./img/background/background_1.png"), AM.getAsset("./img/background/background_2.png"), AM.getAsset("./img/background/background_3.png")]
	gameEngine.addEntity(new Background(gameEngine, backgroundArray));
	
	gameEngine.addEntity(ground);
	gameEngine.addEntity(new ninja(gameEngine,ninjaIdle, ninjaRun, ninjaRunLeft, tninjaArr));
	gameEngine.addEntity(new ban(gameEngine, banArr, ground));
    console.log("All Done!");
});