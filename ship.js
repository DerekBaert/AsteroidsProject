class Ship
{
    constructor(position, size)
    {
        this.position = position;
        this.size = size;
        this.heading = 0;
        this.rotation = 0;
    }

    display()
    {
        translate(this.position.x, this.position.y);
        rotate(this.heading);
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
}