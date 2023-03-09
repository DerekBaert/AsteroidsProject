class LaserManager
{
    constructor()
    {
        this.lasers = [];   
    }

    // Handles behvaiour of lasers in array
    handleLasers()
    {
        for(let i = this.lasers.length - 1; i >= 0; i--)
        {
            // If laser's time to live has run out, remove from array.
            if(!this.lasers[i].alive())
            {
                this.lasers.splice(i,1);
            }
            else
            {
                this.lasers[i].display(); 
                this.lasers[i].update();
                this.lasers[i].checkEdges();

                // Checks if the laser has hit any asteroids in the array. 
                // Counting backwards so new asteroids created when breaking a larger asteroid are not checked by the same laser
                for(let j = asteroidManager.asteroids.length - 1; j >=0; j--)
                {
                    if(this.lasers[i].hits(asteroidManager.asteroids[j]))
                    {
                        soundManager.asteroidPlay();

                        // Update score and trauma based on size
                        if(asteroidManager.asteroids[j].size == 40)
                        {
                            score += 20;
                            trauma += addedTrauma / 4;
                        }
                        else if(asteroidManager.asteroids[j].size >= 20)
                        {
                            score += 50;
                            trauma += addedTrauma / 2;
                        }
                        else
                        {
                            score += 100;
                            trauma += addedTrauma / 2;
                        }

                        // Break apart asteroid by creating two new asteroids and add them to array
                        let newAsteroids = asteroidManager.asteroids[j].break();
                        asteroidManager.asteroids = asteroidManager.asteroids.concat(newAsteroids);

                        // Remove hit asteroid from array
                        asteroidManager.asteroids.splice(j, 1);

                        // Remove laser from array
                        this.lasers.splice(i,1);
                        break;
                    }
                }            
            }    
        }

        for(let i = this.lasers.length - 1; i >= 0; i--)
        {
            // Checks if the laser has hit any saucers in the array. 
            for(let j = saucerManager.saucers.length - 1; j >=0; j--)
            {
                if(this.lasers[i].hits(saucerManager.saucers[j]) && this.lasers[i].laserType != LaserType.Enemy)
                {
                    soundManager.explodePlay();

                    // Update score and trauma based on size
                    if(saucerManager.saucers[j].size == bigSaucerSize)
                    {
                        score += 200;
                        trauma += addedTrauma;
                    }
                    else if(saucerManager.saucers[j].size == smallSaucerSize)
                    {
                        score += 1000;
                        trauma += addedTrauma / 2;
                    }
                    // Remove saucer from array
                    saucerManager.saucers.splice(j, 1);

                    // Remove laser from array
                    this.lasers.splice(i,1);                    
                }
            }
        }

        for(let i = this.lasers.length - 1; i >= 0; i--)
        {
            // Checks if laser has hit ship, and if it is not a laser fired by the player
            if(this.lasers[i].hits(ship) && this.lasers[i].laserType != LaserType.Player)
            {
                soundManager.explodePlay();

                // Remove Laser from array, decrement lives, respawn ship, add trauma.
                this.lasers.splice(i, 1);
                lives--;
                ship.respawn();
                trauma += addedTrauma * 1.5;
            }
        }
    }

    // Add a new laser to the array
    add(position, heading, type)
    {
        this.lasers.push(new Laser(position, heading, type));
    }

    // Replace array with empty array when resetting game
    reset()
    {
        this.lasers = [];
    }
}