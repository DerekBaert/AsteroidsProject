class Ship extends gameObject
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
        this.edges();
        if(this.isBoosting)
        {
            this.boost();
        }
    }

    boost()
    {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.5);
        this.velocity.add(force);
    }

    boosting(isBoosting)
    {
        this.isBoosting = isBoosting;
    }

    display()
    {
        translate(this.position.x, this.position.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke(255);
        triangle(-this.size, this.size, this.size, this.size, 0, -this.size)
    }

    setRotation(rotation)
    {
        this.rotation = rotation;
    }

    turn(angle)
    {
        this.heading += this.rotation;
    }

    edges()
    {
        if(this.position.x > width + this.size)
        {
            this.position.x = -this.size;
        }
        else if(this.position.x < -this.size)
        {
            this.position.x = width + this.size;
        }

        if(this.position.y > height + this.size)
        {
            this.position.y = -this.size;
        }
        else if(this.position.y < -this.size)
        {
            this.position.y = height + this.size;
        }
    }
}