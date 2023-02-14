class GameObject
{
    constructor(position, size)
    {
        this.position = position;
        this.size = size;
        
    }

    checkEdges()
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