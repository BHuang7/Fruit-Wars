var AM = new AssetManager();
function arrAnimation(spritesArray, frameDuration, loop, scale){
	this.spritesArray = spritesArray;
	this.frameDuration = frameDuration;
	this.loop = loop;
	this.scale = scale;
	this.totalTime = frameDuration * spritesArray.length;
	this.elapsedTime = 0;
}

arrAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
	this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
	var image = this.spritesArray[frame];
    ctx.drawImage(image, x, y, image.width*this.scale, image.height*this.scale);
}

arrAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

arrAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y, 800, 700);
};

Background.prototype.update = function () {
};



// inheritance 
function explosion(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .02, true, 2);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 720, 458);
}

explosion.prototype = new Entity();
explosion.prototype.constructor = explosion;

explosion.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

explosion.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



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

// inheritance 
function rocket(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .005, true, 3);
    this.speed = 600;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 475);
}

rocket.prototype = new Entity();
rocket.prototype.constructor = rocket;

rocket.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 650) this.x = 50;
    Entity.prototype.update.call(this);
}

rocket.prototype.draw = function () {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		Entity.prototype.draw.call(this);
}

// inheritance 
function ban(game, spritesheetArray) {
	this.animation = new arrAnimation(spritesheetArray, .05, true, 1.5);
    this.speed = 250;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 50);
}

ban.prototype = new Entity();
ban.prototype.constructor = ban;

ban.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

ban.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



function Terrain(game) {
    Entity.call(this, game, 0, 200);
    this.radius = 100;
    let coordinates = [];
}

Terrain.prototype = new Entity();
Terrain.prototype.constructor = Terrain;

Terrain.generate = function (points, groundLevel, yVariance) {
	let height = 700;
	let width = 800;
    let x = 0;
    let y = groundLevel;
    let xVariance = height/points * 2;
    let oldx = 0;
    coordinates = [];
    coordinates.push([0, height]);
    for(let i = 0; i < points; i++) {
        coordinates.push([x, y]);
        console.log("x: " + coordinates[i][0] + ", y: " + coordinates[i][1]);
        oldx = x;
        x += Math.random() * xVariance;
        var rand = Math.random() * 100;
        console.log("random: " + rand);
        y = Math.floor(rand) % 2 ? y +  Math.random() * yVariance : y -  Math.random() * xVariance;
        if(y > height)
            y = y % height + groundLevel;
        else if(y < height/2)
            y += 200; // pick a good number for the canvas size
        
        if(x-oldx < 50)
            x += width/points;
    }
    coordinates.push([width, groundLevel]);
    coordinates.push([width, height]);
    
return coordinates;

} 

Terrain.prototype.update = function () {

}

Terrain.prototype.draw = function (ctx) {
    ctx.fillStyle = "Peru";

    ctx.beginPath();
    ctx.moveTo(0, 700);
    for(let i = 0; i < this.coordinates.length; i++) {
        ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1]);
    }
    ctx.fill();
}

function downloadImage(path, numberOfImages) {

		var fileName = path + ".png";
		AM.queueDownload(fileName);
		for (var i = 2; i <= numberOfImages; i++) {
			fileName = path + i + ".png";
			AM.queueDownload(fileName);
		}
}

function assetToArray(path, numberOfImages, array) {
	array.push(AM.getAsset(path + ".png"));
	for (var i = 2; i <= numberOfImages; i++) {
			array.push(AM.getAsset(path + i + ".png"));
	}
}
downloadImage("./img/explosion/bananaRunning", 5);
downloadImage("./img/explosion/expl_07_", 32);
downloadImage("./img/ninja/Throw__", 10);
downloadImage("./img/rocket/rocket_1_", 15);
downloadImage("./img/ninja/Run__", 10);


AM.queueDownload("./img/background0.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
	
	var banArr = [];
	assetToArray("./img/explosion/bananaRunning", 5, banArr);	
	
	var explosionArr = [];
	assetToArray("./img/explosion/expl_07_", 32, explosionArr);
	
	var tninjaArr = [];
	assetToArray("./img/ninja/Throw__", 10, tninjaArr);
	
	var rocketArr = [];
	assetToArray("./img/rocket/rocket_1_", 15, rocketArr);


	var ninjaRun = [];
	assetToArray("./img/ninja/Run__", 10, ninjaRun);
	
	
	var ground = new Terrain(gameEngine);
	ground.coordinates = Terrain.generate(50, 500, 50);
	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background0.png")));
	gameEngine.addEntity(ground);
	gameEngine.addEntity(new ninja(gameEngine, ninjaRun));
	gameEngine.addEntity(new rocket(gameEngine, rocketArr));
	gameEngine.addEntity(new tninja(gameEngine, tninjaArr));
	gameEngine.addEntity(new ban(gameEngine, banArr));
	gameEngine.addEntity(new explosion(gameEngine, explosionArr));

    console.log("All Done!");
});