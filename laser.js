class Laser 
{
    constructor(shipPosition, shipHeading)
    {
        this.position = createVector(shipPosition.x, shipPosition.y);
        this.velocity = p5.Vector.fromAngle(shipHeading);
        this.velocity.mult(5);
    }

    update()
    {
        this.position.add(this.velocity);
    }

    display()
    {
        push();
            stroke(255);
            strokeWeight(4);
            point(this.position.x, this.position.y)
        pop();
    }

    hits(object)
    {
        let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y);
        return distance < object.size;
    }

    checkEdges()
    {
        return (this.position.x >= width || this.position.x <= 0 || this.position.y >= height || this.position.y <= 0)
    }
}