class SaucerManager
{
    constructor()
    {
        this.saucers = [];
    }

    update(soundManager)
    {
        if(this.saucers.length > 0)
        {
            soundManager.saucerPlay();
        }
        else
        {
            soundManager.saucerStop();
        }
    }

    handleSaucers()
    {
        for (let i = 0; i < this.saucers.length; i++) 
        {
          if (this.saucers[i].checkEdges()) 
          {
            this.saucers.splice(i, 1);
          }
          else {
            this.saucers[i].display();
            this.saucers[i].update();
      
            if (ship.hits(this.saucers[i])) 
            {
              soundManager.explodePlay();
              lives--;
              ship.respawn();
            }
      
            if (frameCount % 120 === 0) 
            {
              soundManager.laserPlay();
              laserManager.add(this.saucers[i].position, this.saucers[i].heading, LaserType.Enemy);
            }
          }
        }
    }

    reset()
    {
        this.saucers = [];
    }

    add(saucerSize)
    {
        this.saucers.push(new Saucer(saucerSize));
    }
}