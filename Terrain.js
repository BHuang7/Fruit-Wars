function Terrain(game) {
    Entity.call(this, game, 0, 200);
    this.radius = 100;
	this.ctx = game.ctx;
    let coordinates = [];
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