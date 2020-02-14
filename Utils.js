function downloadImage(path, numberOfImages) {
	
		for (var i = 1; i <= numberOfImages; i++) {
			fileName = path + " (" + i  + ")"+ ".png";
			AM.queueDownload(fileName);
		}
}

function assetToArray(path, numberOfImages, array) {
	for (var i = 1; i <= numberOfImages; i++) {
			array.push(AM.getAsset(path + " (" + i  + ")"+ ".png"));
	}
}

function findPerpLineSeg(centerPoint, radius, lineSegment) {
	//Slope of Perpendicular Line
	var slope = -1* (1/lineSegment.slope);
	//Point where the perpendicular Line intersects y-axis (b)
	var intercept = centerPoint.y - (centerPoint.x * slope);
	//Point where the perpendicular Line meets the line segment
	var intPoint = findIntersection(slope, intercept, lineSegment.slope, lineSegment.intercept);
	//Distance that the slope travels
	var hypot = Math.sqrt((slope * slope)  + 1);
	//Divide the rise and the run by the distance you travel
	var unitVect = {x:1/hypot,y:slope/hypot};
	//Distance from the center to the interception point
	var centerToIntDist = Math.sqrt(((centerPoint.x - intPoint.x)*(centerPoint.x - intPoint.x))
	+ ((centerPoint.y - intPoint.y)*(centerPoint.y - intPoint.y)));
	//how much we are going to shift by
	if((lineSegment.slope < 0 && centerPoint.x > intPoint.x)||(lineSegment.slope > 0 && centerPoint.x < intPoint.x)){
		//In case your center is inside of the line
		var shiftDistance = radius + centerToIntDist;
	}
	else{
		var shiftDistance = radius - centerToIntDist;
	}
	//multiplying how much we are going to shift by how far we need to shift
	if(lineSegment.slope <0){
		return {x: unitVect.x*shiftDistance * -1,y: unitVect.y*shiftDistance * -1};
	}
	return {x: unitVect.x*shiftDistance,y: unitVect.y*shiftDistance};
};

function findIntersection(slope1, intercept1, slope2, intercept2) {
	var xVal = slope1 - slope2;
	var intVal = intercept1 - intercept2;
	var xFinal = (-1 * intVal) / xVal;
	var yFinal = (slope1 * xFinal) + intercept1
	return {x:xFinal, y:yFinal};
};

function inteceptCircleLineSeg(center, radius, p1, p2){
    var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = p2.x - p1.x;
    v1.y = p2.y - p1.y;
    v2.x = p1.x - center.x;
    v2.y = p1.y - center.y;
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - radius * radius));
    if(isNaN(d)){ // no intercept
        return false;
    }
    u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;    
    retP1 = {};   // return points
    retP2 = {}  
    ret = []; // return array
    if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
        retP1.x = p1.x + v1.x * u1;
        retP1.y = p1.y + v1.y * u1;
        ret[0] = retP1;
    }
    if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
        retP2.x = p1.x + v1.x * u2;
        retP2.y = p1.y + v1.y * u2;
        ret[ret.length] = retP2;
    }       
    if (ret.length >= 1) return ret;
	
	return false;
}

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// check if a circle intersects with a line segment
// it will return an array containing the points at which the collisions occur
// circle: (x - circleX)^2 + (y - circleY)^2 = radius^2
// line: y = m * x + yIntercept
function lineCircleCollision(radius, circleCenter, line) {
    //first check if segment is completely inside circle
    if(distance(line.p1, circleCenter) <= radius && distance(line.p2, circleCenter) <= radius) {
        return ["inside"];
    }

    // get a, b, c values for the quadratic formula
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
            {x: x1, y: line.getY(x1)},
            {x: x2, y: line.getY(x2)}
        ];
        
        if (d == 0) {
            // only 1 intersection
            if (distance(line.p1, circleCenter) <= radius || distance(line.p2, circleCenter) <= radius) {
                return [intersections[0], "point inside"]
            } else {
                return [intersections[0]];
            }
        }

        //next I need to check whether the points are actually on the line segment
        firstIntersection = intersections[0];
        secondIntersection = intersections[1];
        //for each intersection, add the distance from the intersection to each endpoint of the line segment
        l1 = Math.abs(distance(firstIntersection, line.p1) + distance(firstIntersection, line.p2));
        l2 = Math.abs(distance(secondIntersection, line.p1) + distance(secondIntersection, line.p2));
        console.log("length: " + line.length + ", l1: " + l1 + ", l2: " + l2);
        //check first intersection is off the line segment
        if(l1 > line.length) {
            //check if the other intersection is off the line segment as well
            if(l2 > line.length){
                return[];
            }
            return [intersections[1]];
        } 
        //check if only the second intersection is off the line segment
        else if(l2 > line.length) {
            return [intersections[0]];
        }
        //console.log("intersects");
        return intersections;
    }
    // no intersection
    //console.log("no intersection");
    return [];
}