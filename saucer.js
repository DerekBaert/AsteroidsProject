class Saucer extends GameObject
{
    constructor(size)
    {
        super(createVector(0 + size, random(0 + size, height / 2)), size);
        this.heading = 0;
        this.velocity = createVector(random(1, 1.5), random(1, 2));
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

        if(this.size == bigSaucerSize)
        {
            this.aimOffset = 0.5;
        }
        else
        {
            if(score < 1000)
            {
                this.aimOffset = 0.3;
            }

            if(score > 1000)
            {
                this.aimOffset = 0.2;
            }

            if(score > 1500)
            {
                this.aimOffset = 0.1;
            }

            if(score > 2000)
            {
                this.aimOffset = 0;
            }            
        }
    }

    update()
    {
        this.position.add(this.velocity);
        this.heading = atan2(ship.position.x - this.position.x, this.position.y - ship.position.y) - PI / 2;
        if(this.aimOffset > 0)
        {
            this.heading += random(-this.aimOffset, this.aimOffset);
        }        
    }

    hits(object)
    {
        let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y);
        return distance < (object.size + this.size);
    }

    display()
    {
        ellipse(this.position.x, this.position.y, this.size * 1.5, this.size);
    }

}