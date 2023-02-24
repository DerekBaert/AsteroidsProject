class Asteroid extends GameObject
{
    constructor(position, size, velocity)
    {
        super(position, size);    
        this.total = floor(random(5,15));
        this.offset = [];
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(10 / this.size);
        console.log(`Size: ${this.size} Mult: ${1 / this.size} Velocity:${this.velocity}`);
        for(let i = 0; i < this.total; i++)
        {
            this.offset[i] = random(-this.size / 2, this.size / 2);
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

    break()
    {
        let newAsteroids = [];
        newAsteroids[0] = new Asteroid(createVector(this.position.x, this.position.y), this.size / 2);
        newAsteroids[1] = new Asteroid(createVector(this.position.x, this.position.y), this.size / 2);
        return newAsteroids;
    }
}