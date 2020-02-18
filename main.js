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
	gameEngine.addEntity(new turnManager(gameEngine));

});