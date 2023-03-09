class AsteroidManager
{
    constructor()
    {
        this.asteroids = [];
        this.asteroidCount = 4;
    }

    // Repopulates array with asteroids
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

    // Handles behaviours for all asteroids
    handleAsteroids()
    {
        for(let i = 0; i < this.asteroids.length; i++)
            {
                // If asteroid size is larger than 10, update, display and check for collisions
                if(this.asteroids[i].size >= 10)
                {
                    this.asteroids[i].display(); 
                    this.asteroids[i].update();
            
                    // Check if ship has crashed into asteroid
                    if(ship.hits(this.asteroids[i]))
                    {
                        soundManager.explodePlay();
                        lives--;
                        trauma += addedTrauma * 1.5;
                        ship.respawn();
                    }
                
                    // Check if saucer has crashed into asteroid
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
                // If asteroid is smaller than 10, remove from array
                else
                {
                    this.asteroids.splice(i, 1);
                }
            }
    }

    // Resets to defaults
    reset()
    {
        this.asteroids = [];
        this.asteroidCount = 4;
    }
}