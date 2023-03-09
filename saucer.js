class Saucer extends GameObject
{
    constructor(size)
    {
        super(createVector(0 + size, random(0 + size, height / 2)), size);
        this.heading = 0;
        this.velocity = createVector(random(1, 1.5), random(1, 2));
        this.size = size;
        
        // Determine direction on X and Y axis randomly
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

        // Set initial aim offset based on size
        if(this.size == bigSaucerSize)
        {
            this.aimOffset = 1;
        }
        else
        {
            this.aimOffset = 0.75;             
        }
    }

    // Update position and aim
    update()
    {
        this.position.add(this.velocity);

        // Set heading to the direction the ship is in, then offset this by the current aim offset
        this.heading = atan2(ship.position.x - this.position.x, this.position.y - ship.position.y) - PI / 2;
        if(this.size != bigSaucerSize)
        {
            this.adjustAim();
        }        
        if(this.aimOffset > 0)
        {
            this.heading += random(-this.aimOffset, this.aimOffset);
        }        
    }

    // Checks if saucer has hit another object
    hits(object)
    {
        let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y);
        return distance < (object.size + this.size);
    }

    // Displays saucer to screen
    display()
    {
        ellipse(this.position.x, this.position.y, this.size * 1.5, this.size);
    }

    // Updates aim offset based on player's score
    adjustAim()
    {
        if(score <= 1000)
        {
            this.aimOffset = 0.75;
        }
    
        if(score > 1000)
        {
            this.aimOffset = 0.5;
        }
    
        if(score > 1500)
        {
            this.aimOffset = 0.25;
        }
    
        if(score > 2000)
        {
            this.aimOffset = 0;
        }            
    }

}