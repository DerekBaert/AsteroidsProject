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

    update()
    {
        this.position.add(this.velocity);
        this.velocity.mult(0.97);
        super.checkEdges();
        if(this.isBoosting)
        {
            this.boost();
        }
    }

    boost()
    {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.35);
        this.velocity.add(force);
    }

    boosting(isBoosting)
    {
        this.isBoosting = isBoosting;
    }

    fire()
    {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(-0.35);
        this.velocity.add(force); 
    }

    display()
    {
        push();
            fill(0);
            translate(this.position.x, this.position.y);
            rotate(this.heading + PI / 2);
            triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
        pop();
    }

    setRotation(rotation)
    {
        this.rotation = rotation;
    }

    turn(angle)
    {
        this.heading += this.rotation;
    }

    hits(object)
    {
        let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y);
        return distance < (object.size + this.size);
    }

    respawn()
    {
        this.position = createVector(width/2, height/2);
        this.velocity = createVector(0,0);
    }

    warp()
    {
        this.position = createVector(random(0, width - this.size), random(0, height - this.size));
        this.velocity = createVector(0,0);
    }
}