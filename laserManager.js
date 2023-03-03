class LaserManager
{
    constructor()
    {
        this.lasers = [];   
    }

    handleLasers()
    {
        for(let i = this.lasers.length - 1; i >= 0; i--)
        {
            if(!this.lasers[i].alive())
            {
                this.lasers.splice(i,1);
            }
            else
            {
                this.lasers[i].display(); 
                this.lasers[i].update();
                this.lasers[i].checkEdges();
                for(let j = asteroidManager.asteroids.length - 1; j >=0; j--)
                {
                    if(this.lasers[i].hits(asteroidManager.asteroids[j]))
                    {
                        soundManager.asteroidPlay();
                        if(asteroidManager.asteroids[j].size == 40)
                        {
                            score += 20;
                        }
                        else if(asteroidManager.asteroids[j].size >= 20)
                        {
                            score += 50;
                        }
                        else
                        {
                            score += 100;
                        }
                        let newAsteroids = asteroidManager.asteroids[j].break();
                        asteroidManager.asteroids = asteroidManager.asteroids.concat(newAsteroids);
                        asteroidManager.asteroids.splice(j, 1);
                        this.lasers.splice(i,1);
                        break;
                    }
                }            
            }    
        }

        for(let i = this.lasers.length - 1; i >= 0; i--)
        {
            for(let j = saucerManager.saucers.length - 1; j >=0; j--)
            {
                if(this.lasers[i].hits(saucerManager.saucers[j]) && this.lasers[i].laserType != LaserType.Enemy)
                {
                    console.log(`Saucer Hit ${saucerManager.saucers.length}`);
                    soundManager.explodePlay();
                    if(saucerManager.saucers[j].size == 60)
                    {
                        score += 200;
                    }
                    else if(saucerManager.saucers[j].size == 30)
                    {
                        score += 1000;
                    }
                    saucerManager.saucers.splice(j, 1);
                    console.log(`${saucerManager.saucers.length}`);
                }
            }
            if(this.lasers[i].hits(ship) && this.lasers[i].laserType != LaserType.Player)
            {
                soundManager.explodePlay();
                this.lasers.splice(i, 1);
                lives--;
                ship.respawn();
            }
        }
    }

    add(position, heading, type)
    {
        this.lasers.push(new Laser(position, heading, type));
    }

    reset()
    {
        this.lasers = [];
    }
}