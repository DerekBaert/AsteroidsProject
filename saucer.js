class Saucer
{
    constructor(size)
    {
        this.position = createVector(0 + size, random(0 + size, height / 2))
        this.heading = 0;
        this.velocity = createVector(random(2, 4), random(1, 3));
        this.size = size;

        if (floor(random(2))) 
        {
            this.velocity.x *= -1;
            this.position.x = width - size;
        }
        if (floor(random(2))) 
        {
            this.velocity.y *= -1; 
            this.position.y = random(height / 2, height  - size);
        }
    }

    update()
    {
        this.position.add(this.velocity);
        this.heading = atan2(ship.x - this.x, this.y - ship.y) - PI * 0.5;
    }

    display()
    {
        ellipse(this.position.x, this.position.y, this.size, this.size / 2);
    }

    checkEdges()
    {
        return (this.position.x >= width || this.position.x <= 0 || this.position.y >= height || this.position.y <= 0);
    }

}