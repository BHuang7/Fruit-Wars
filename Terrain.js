function Terrain(game, sprite, manager) {
    Entity.call(this, game, 0, 200);
	this.gameManager = manager;
    this.expl = new Point(game, 0, 0);
	this.ctx = game.ctx;
    this.coordinates = [...new Set()];
    this.lines = [];
    this.sprite = sprite;
}

Terrain.prototype = new Entity();
Terrain.prototype.constructor = Terrain;

Terrain.prototype.generate = function (points, groundLevel, yVariance) {
    var width = this.game.ctx.canvas.width;
    var height = this.game.ctx.canvas.height;
    
    let x = 0;
    let y = groundLevel;
    let xVariance = width/points * 2;
    let oldx = 0;
    coordinates = [...new Set()];
    coordinates.push(new Point(this.game, 0, width));
    let oldPoint = coordinates[0];
    for(let i = 0; i < points; i++) {
        //create the next point of the terrain
        let newPoint = new Point(this.game, x, y);
        coordinates.push(newPoint);
        //create the next line segment for the terrain
      //  this.lines.push(new LineSegment(oldPoint, newPoint));

        //generate the next x value
        oldx = x;
        x += Math.random() * xVariance;
        var rand = Math.random() * 100;
        //randomly decide whether the next point should go up or down
        y = Math.floor(rand) % 2 ? y +  Math.random() * yVariance : y -  Math.random() * xVariance;

        //make sure this new point is within acceptable bouds
        if(y > height)
            y = y % height + groundLevel;
        else if(y < height/2)
            y += height/4;
        
        if(x-oldx < 50)
            x += width/points;
    }
coordinates.push(new Point(this.game, width, groundLevel));
coordinates.push(new Point(this.game, width, height));
    
return coordinates;

} 

Terrain.prototype.update = function () {
    // if(this.game.click != null) {
        // console.log("explosion! x:" + this.game.xVal + " y:" + this.game.yVal);
        // this.expl = new Point(this.game, this.game.xVal, this.game.yVal);
        // this.explosion(this.expl, 25);	
        // for(let i = 0; i < this.coordinates.length; i++){
        //     let collisions = lineCircleCollision(50, this.expl, this.lines[i]);
        //     if(collisions.length > 0){
        //         console.log("intersections:");
        //         collisions.forEach(element => console.log(element));
        //     }
        // }
        //console.log("explosion done, points: " + this.coordinates.length)
    //    this.game.click = null;
//    }
//   The explosion is now being generated at the top of the Explosion class
//   if (this.gameManager.explosionOccured) {
// 	  this.expl = new Point(this.game, this.gameManager.explosionX, this.gameManager.explosionY);
// 	  this.explosion(this.expl, this.gameManager.explosionRadius);
// 	  this.gameManager.explosionOccured = false;
//   }
}

Terrain.prototype.AddDirPoints = function() {
    for(let i = 0; i < this.lines.length; i++) {
        var cur = this.lines[i];
        cur.dirPoint = new Point(this.game, (cur.p2.x + cur.p1.x)/2, (cur.p2.y + cur.p1.y)/2 - 10);
    }
}

Terrain.prototype.draw = function (ctx) {
    let pattern = ctx.createPattern(this.sprite, "repeat");
    ctx.fillStyle = pattern;

    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height);
    for(let i = 0; i < this.coordinates.length; i++) {
        ctx.lineTo(this.coordinates[i].x, this.coordinates[i].y);
    }
    ctx.fill();

    //draw dirPoints
//     ctx.fillStyle = "green";
//     for(let i = 0; i < this.lines.length; i++) {
//         ctx.beginPath();
//         ctx.arc(this.lines[i].dirPoint.x, this.lines[i].dirPoint.y, 5, 0, Math.PI * 2, true);
//         ctx.fill();
//     }
}

Terrain.prototype.explosion = function (p, radius) {
    //console.log("explosion size: " + radius);
    let newTerrain = [...new Set()];

    // console.log("starting explosion");
    //go through all lines to see if there is a collision and keep track of the lines being cut short
    let intersectionPoints = [];
    var point = new Entity(this.game, p.x, p.y);
    for(let i = 0; i < this.lines.length; i++) {
        let intersection = lineCircleCollision(radius, point, this.lines[i]);

        //if there is no collision
        if(intersection.length === 0) {
            //add the first point in the line  segment to the new terrain
            newTerrain.push(this.coordinates[i]);
            if(i === this.lines.length - 1){
                if(i+1 < this.coordinates.length) {
                    newTerrain.push(this.coordinates[i+1])
                }
            }
        }

        //if there is an intersection
        else if (intersection.length === 2) {
            //check if the line goes all the way through the circle
            if(intersection[1] === "point inside") {
                //if we are on the first side of a "mountain", add the point before the "peak"
                if(intersectionPoints.length === 0) {
                    // console.log("delete 1 point");
                    newTerrain.push(this.coordinates[i]);
                }
                // console.log("only 1 intersection")
                intersectionPoints.push(intersection[0]);
            } else { //collided with a single line segment
                newTerrain.push(this.coordinates[i]);
                // console.log("collisions: p1: (" + intersection[1].x + ", " + intersection[1].y + "), p2: (" + intersection[0].x + ", " + intersection[0].y + ")");
                intersectionPoints.push(intersection[1]);
                intersectionPoints.push(intersection[0]);
            }
        }
        if(intersectionPoints.length > 2) console.log("too many intersections: " + intersectionPoints.length);
        if(intersectionPoints.length >= 2) {
            pointA = intersectionPoints.shift();
            pointC = intersectionPoints.shift();

            // console.log("collisions: p1: (" + pointA.x + ", " + pointA.y + "), p2: (" + pointC.x + ", " + pointC.y + ")");
       

            //draw arcs between pairs of points. If there is only one point, it means 
            //that there is a peak and we only have one side so far.
            this.drawArc(newTerrain, radius, pointA, point, pointC, 10, i);
            if(i+1 < this.coordinates.length) {
                // console.log("added point after");
                newTerrain.push(this.coordinates[i+1]);
            } else {
                // console.log("tried to add invalid index");
            }
        }
        //if the line segment is inside the explosion, don't add them the the new terrain
    }
    this.coordinates = newTerrain;
    this.lines = this.updateLines();
    if(this.lines.length === 0){
        // console.log("lines is empty")
    }
}

Terrain.prototype.updateLines = function() {
    console.log("UPDATING LINES");
    let oldPoint = this.coordinates[0];
    let lines = [];
    for(let i = 1; i < this.coordinates.length; i++) {
        let newPoint = this.coordinates[i];
        if (typeof(newPoint) === "undefined") {
            console.log("point is undefined")
        }
        let newLine = new LineSegment(this.game, oldPoint, newPoint);
        if(typeof newLine !== 'undefined') {
                if (newLine.p1.x > newLine.p2.x) {
                    if(newLine.p1.y < newLine.p2.y) {
                    newLine.dirPoint = new Point(this.game, (newLine.p2.x + newLine.p1.x)/2 + 10, (newLine.p2.y + newLine.p1.y)/2 + 10);
                    } else {
                        newLine.dirPoint = new Point(this.game, (newLine.p2.x + newLine.p1.x)/2 - 10, (newLine.p2.y + newLine.p1.y)/2 + 10);
                    }
                } else {
                    if(newLine.p1.y < newLine.p2.y) {
                        newLine.dirPoint = new Point(this.game, (newLine.p2.x + newLine.p1.x)/2 + 10, (newLine.p2.y + newLine.p1.y)/2 - 10);
                        } else {
                            newLine.dirPoint = new Point(this.game, (newLine.p2.x + newLine.p1.x)/2 - 10, (newLine.p2.y + newLine.p1.y)/2 - 10);
                        }
                }
            }
        lines.push(newLine);
        oldPoint = newPoint;
        }
        
    return lines;
}

Terrain.prototype.drawArc = function(terrain, radius, A, B, C, detail, index) {
    var totalDistance = findArcLength(radius, A, B, C);
    let oldPoint = A;
    let newPoint = new Point(this.game, 0, 0);
    var pointsAdded = 0;

    //this.coordinates.splice(index+1, 0, A); // add first intersection
    terrain.push(A); // add first intersection
    // console.log("distance: " + totalDistance);

    totalDistance -= detail;
    //create line segments in the shape of an arc
    while(totalDistance > 0) {
        newPoint = findArcEndpoint(oldPoint, B, detail, true);
        terrain.push(newPoint);
        oldPoint = newPoint;
        totalDistance -= detail;
        index++;
        pointsAdded++;
    }
    //add the final point
    terrain.push(C);
    pointsAdded++;
    return pointsAdded;
    
}

//check if a circle intersects with a line segment
function lineCircleCollision(radius, circleCenter, line) {
    //first check if segment is completely inside circle
    if(distance(line.p1, circleCenter) <= radius && distance(line.p2, circleCenter) <= radius) {
        // console.log("line is inside");
        return ["inside"];
    }

    // circle: (x - circleX)^2 + (y - circleY)^2 = radius^2
    // line: y = m * x + yIntercept

    // get a, b, c values
    var a = 1 + line.slope * line.slope;
    var b = -circleCenter.x * 2 + (line.slope * (line.intercept - circleCenter.y)) * 2;
    var c = circleCenter.x * circleCenter.x + Math.pow((line.intercept - circleCenter.y), 2) - radius * radius;

    // get discriminant
    var d = b * b - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
    var x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    var x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        var intersections = [
            new Point(this.game, x1, line.getY(x1)),
            new Point(this.game, x2, line.getY(x2))
        ];
        
        if (d == 0) {
            // only 1 intersection
            //var dist1 = distance(line.p1, circleCenter);
            //var dist2 = distance(line.p2, circleCenter);
            if (distance(line.p1, circleCenter) <= radius || distance(line.p2, circleCenter) <= radius) {
                return [intersections[0], "point inside"];
            } else {
                return [intersections[0]];
            }
        }

        //next I need to check whether the points are actually on the line segment
        var firstIntersection = intersections[0];
        var secondIntersection = intersections[1];
        //for each intersection, add the distance from the intersection to each endpoint of the line segment
        var l1 = Math.abs(distance(firstIntersection, line.p1) + distance(firstIntersection, line.p2));
        var l2 = Math.abs(distance(secondIntersection, line.p1) + distance(secondIntersection, line.p2));
        
        //check if the collisions are on the endpoints
        if (firstIntersection.x === line.p1.x && firstIntersection.y === line.p1.y){
            if(secondIntersection.x === line.p1.x && secondIntersection.y === line.p1.y) {
                return intersections;
            }
            return intersections[0];
        } else if (firstIntersection.x === line.p2.x && firstIntersection.y === line.p2.y){
            if(secondIntersection.x === line.p2.x && secondIntersection.y === line.p2.y) {
                return intersections;
            }
            return intersections[0];
        }
        
        l1 -= 0.0000001
        l2 -= 0.0000001

        //console.log("length: " + line.length + ", l1: " + l1 + ", l2: " + l2);
        //check first intersection is off the line segment
        if(l1 > line.length) {
            //check if the other intersection is off the line segment as well
            if(l2 > line.length){
                return[];
            }
            return [intersections[1], "point inside"];
        } 
        //check if only the second intersection is off the line segment
        else if(l2 > line.length) {
            return [intersections[0], "point inside"];
        }
        //console.log("intersects");
        return intersections;
    }
    // no intersection
    //console.log("no intersection");
    return [];
}