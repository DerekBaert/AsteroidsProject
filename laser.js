class Laser extends GameObject
{
    constructor(shipPosition, shipHeading, laserType)
    {
        super(shipPosition, 1);
        this.position = createVector(shipPosition.x, shipPosition.y);
        this.velocity = p5.Vector.fromAngle(shipHeading);
        this.laserType = laserType;
        this.velocity.mult(5);
        this.timeToLive = 90;
    }

    // Adds velocity, and ticks down the player's time to live
    update()
    {
        this.position.add(this.velocity);
        this.timeToLive = max(this.timeToLive - 1, 0); 
    }

    // Displays laser on screen
    display()
    {
        push();
            stroke(255);
            strokeWeight(4);
            point(this.position.x, this.position.y)
        pop();
    }

    // Checks if the laser has hit an object
    hits(object)
    {
        let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y);
        return distance < object.size;        
    }

    // Checks if the laser's time to live has run out
    alive()
    {
        return this.timeToLive != 0;
    }
}