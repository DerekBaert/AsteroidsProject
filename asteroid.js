class Asteroid extends GameObject
{
    constructor(position, size)
    {
        super(position, size);    
        this.total = floor(random(5,15));
        this.offset = [];
        this.velocity = p5.Vector.random2D();
        for(let i = 0; i < this.total; i++)
        {
            this.offset[i] = random(-10,10);
        }
    }

    update()
    {
        this.position.add(this.velocity);
        super.checkEdges();
    }

    display()
    {
        push();
            translate(this.position.x, this.position.y);
            //ellipse(0, 0, this.size * 2);
            beginShape();
            for(let i = 0; i < this.total; i++)
            {
                let angle = map(i, 0, this.total, 0, TWO_PI);
                let size = this.size + this.offset[i];
                let x = size * cos(angle);
                let y = size * sin(angle);
                vertex(x, y);
            }
            endShape(CLOSE);
        pop();
    }
}