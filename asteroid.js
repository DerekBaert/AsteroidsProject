class Asteroid extends GameObject
{
    constructor(position, size)
    {
        super(position, size);        
    }

    display()
    {
        push();
            translate(this.position.x, this.position.y);
            ellipse(0, 0, this.size * 2);
        pop();
    }
}