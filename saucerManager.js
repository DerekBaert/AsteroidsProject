class SaucerManager
{
    constructor()
    {
        this.saucers = [];
        this.nextSaucer = 1000;
        this.saucerRate = 1000;
        this.nextSmallSaucer = 2500;
        this.smallSaucerInterval = 2500;
    }

    // Update saucers in array
    update(soundManager, score)
    {
      // If a saucer is in play, play the saucer sound
      if(this.saucers.length > 0)
      {
          soundManager.saucerPlay();
      }
      else
      {
          soundManager.saucerStop();
      }

      // Spawns a new saucer if score requirement is met
      if(score >= this.nextSaucer)
      {
        // Set saucer size to large saucer size
        let saucerSize = bigSaucerSize;

        // Increase requirement for next saucer
        this.nextSaucer += this.saucerRate;

        // If the score is high enough for a small saucer, set the saucer size to that instead
        if(score >= this.nextSmallSaucer)
        {
          saucerSize = smallSaucerSize;
          this.nextSmallSaucer += this.smallSaucerInterval;           
        }

        // Add new saucer to array
        this.add(saucerSize);
      }
    }

    // Handles behaviour of saucers in array 
    handleSaucers()
    {
        for (let i = 0; i < this.saucers.length; i++) 
        {
          this.saucers[i].checkEdges();
          this.saucers[i].display();
          this.saucers[i].update();
      
          // Check if the saucer has hit the player's ship
          if (ship.hits(this.saucers[i])) 
          {
            soundManager.explodePlay();
            lives--;
            trauma += addedTrauma * 1.5;
            ship.respawn();
          }
      
          // Every 2 seconds, fire a laser
          if (frameCount % 120 === 0) 
          {
            soundManager.laserPlay();
            laserManager.add(this.saucers[i].position, this.saucers[i].heading, LaserType.Enemy);
          }
        }
    }


    // Resets array and all values to beginning state when game is reset
    reset()
    {
        this.saucers = [];
        this.nextSaucer = 250;
        this.saucerRate = 250;
        this.smallSaucerInterval = 750;
        this.bigSaucerSize = 30;
        this.smallSaucerSize = 15;
    }

    // Adds saucer of given size
    add(saucerSize)
    {
        this.saucers.push(new Saucer(saucerSize));
    }
}