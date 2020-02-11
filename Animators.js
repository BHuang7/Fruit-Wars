var AM = new AssetManager();
function arrAnimation(spritesArray, frameDuration, loop, scale, holdLast){
	this.holdLast = holdLast;
	this.spritesArray = spritesArray;
	this.frameDuration = frameDuration;
	this.loop = loop;
	this.scale = scale;
	this.totalTime = frameDuration * spritesArray.length;
	this.elapsedTime = 0;
}

arrAnimation.prototype.drawFrame = function (tick, ctx, x, y) {
	this.elapsedTime += tick;
	if (this.loop) {
        if (this.isDone()) {
			if (this.holdLast) this.elapsedTime -= this.frameDuration;
            else {this.elapsedTime = 0;}
        }
    } else if (this.isDone()) {
        return;
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