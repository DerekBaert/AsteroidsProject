class Ship extends GameObject
{
    constructor(position, size)
    {
        super(position, size);
        this.heading = 0;
        this.rotation = 0;
        this.velocity = createVector(0,0);
        this.isBoosting = false;
    }

    // Add current velocity to position, then multiply velocity by an arbitrary damper
    // Check if we have hit the edges
    // If the player is pressing the boost button, call the boost function.
    update()
    {
        this.position.add(this.velocity);
        this.velocity.mult(0.97);
        super.checkEdges();
        this.turn();
        if(this.isBoosting)
        {
            this.boost();
        }
    }

    // Increases the velocity based on the direction the ship is facing
    boost()
    {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.35);
        this.velocity.add(force);
    }

    // Sets isBoosting to the boolean given as a parameter
    boosting(isBoosting)
    {
        this.isBoosting = isBoosting;
    }

    // Applies kickback to the ship when called, based on the direction the ship is facing
    fire()
    {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(-0.35);
        this.velocity.add(force); 
    }

    // Displays the ship
    display()
    {
        push();
            fill(0);
            translate(this.position.x, this.position.y);
            rotate(this.heading + PI / 2);
            triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
        pop();
    }

    // Updates the ships rotation
    setRotation(rotation)
    {
        this.rotation = rotation;
    }

    // Turns the heading of the ship
    turn()
    {
        this.heading += this.rotation;
    }


    // Checks if the ship has hit the given object
    hits(object)
    {
        let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y);
        return distance < (object.size + this.size);
    }

    // Respawns the ship at the centre of the screen with no velocity
    respawn()
    {
        this.position = createVector(width/2, height/2);
        this.velocity = createVector(0,0);
        
    }

    // Warps the ship to a random location on the screen
    warp()
    {
        this.position = createVector(random(0, width - this.size), random(0, height - this.size));
        this.velocity = createVector(0,0);
    }
}