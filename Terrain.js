

function Terrain(game, foregroundImage) {
    Entity.call(this, game, 0, 200);
    this.spritesheet = foregroundImage;
	this.ctx = game.ctx;
    this.coordinates = [];
    this.lines = [];
}

Terrain.prototype = new Entity();
Terrain.prototype.constructor = Terrain;

Terrain.prototype.generate = function (points, groundLevel, yVariance) {
	let height = 700;
	let width = 800;
    let x = 0;
    let y = groundLevel;
    let xVariance = height/points * 2;
    let oldx = 0;
    this.coordinates.push({x: 0, y: height});
    for(let i = 0; i < points; i++) {
        this.coordinates.push({x: x, y: y});
        //console.log("x: " + this.coordinates[i].x + ", y: " + this.coordinates[i].y);
        oldx = x;
        x += Math.random() * xVariance;
        var rand = Math.random() * 100;
        //console.log("random: " + rand);
        y = Math.floor(rand) % 2 ? y +  Math.random() * yVariance : y -  Math.random() * xVariance;
        if(y > height)
            y = y % height + groundLevel;
        else if(y < height/2)
            y += 200; // pick a good number for the canvas size
        
        if(x-oldx < 50)
            x += width/points;
    }
this.coordinates.push({x: width, y: groundLevel});
this.coordinates.push({x: width, y: height});
this.lines = this.updateLines();
console.log("lines length: " + this.lines.length)
return this.coordinates;

} 

//makes sure the lines match up with the points
Terrain.prototype.updateLines = function() {
    //console.log("printing the lines");
    let oldPoint = this.coordinates[0];
    let lines = [];
    for(let i = 0; i < this.coordinates.length; i++) {
        let newPoint = this.coordinates[i];
        lines.push(new LineSegment(this.game, oldPoint, newPoint));
        newPoint = oldPoint;
    }
    return lines;
}

Terrain.prototype.update = function () {

}

Terrain.prototype.draw = function (ctx) {
    let texture = new Image();
    texture.src = this.spritesheet;
    let pattern = ctx.createPattern(this.spritesheet, "repeat");
    ctx.fillStyle = pattern;

    ctx.beginPath();
    ctx.moveTo(0, 700);
    for(let i = 0; i < this.coordinates.length; i++) {
        ctx.lineTo(this.coordinates[i].x, this.coordinates[i].y);
    }
    ctx.fill();
}