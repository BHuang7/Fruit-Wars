//y = mx + b
function LineSegment(game, point1, point2) {
    Entity.call(this, game, 0, 200);
    this.p1 = point1;
    this.p2 = point2;
    this.slope = (point2.y - point1.y) / (point2.x - point1.x);
    this.intercept = point1.y - point1.x * this.slope;
    this.length = distance(point1, point2);
}

// input an x coordinate and get the corresponding y coordinate.
LineSegment.prototype.getY = function(x) {
    return (this.slope * x + this.intercept);
}