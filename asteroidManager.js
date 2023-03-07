class AsteroidManager
{
    constructor()
    {
        this.asteroids = [];
        this.asteroidCount = 12;
    }

    generateAsteroids()
    {
        this.asteroids = [];
        for(let i = 0; i < this.asteroidCount / 2; i++)
        {
            let size = floor(random(20, 40));
            this.asteroids.push(new Asteroid(createVector(random(width * 0.75, width - size), random(size, height - size)), size));
            this.asteroids.push(new Asteroid(createVector(random(0 , width * 0.25), random(size, height - size)), size));
        }  
    }

    handleAsteroids()
    {
        for(let i = 0; i < this.asteroids.length; i++)
            {
                if(this.asteroids[i].size >= 10)
                {
                    this.asteroids[i].display(); 
                    this.asteroids[i].update();
            
                    if(ship.hits(this.asteroids[i]))
                    {
                        soundManager.explodePlay();
                        lives--;
                        trauma += addedTrauma * 1.5;
                        ship.respawn();
                    }
                
                    for(let j = saucerManager.saucers.length - 1; j >= 0; j--)
                    {
                        if(saucerManager.saucers[j].hits(this.asteroids[i]))
                        {
                            soundManager.explodePlay();
                            saucerManager.saucers.splice(j, 1);
                            trauma += addedTrauma / 2;
                        }
                    }            
                }    
                else
                {
                    this.asteroids.splice(i, 1);
                }
            }
    }

    reset()
    {
        this.asteroids = [];
        this.asteroidCount = 5;
    }
}