class SaucerManager
{
    constructor()
    {
        this.saucers = [];
        this.nextSaucer = 500;
        this.saucerRate = 500;
        this.nextSmallSaucer = 1000;
        this.smallSaucerInterval = 1000;
    }

    update(soundManager, score)
    {
      if(this.saucers.length > 0)
      {
          soundManager.saucerPlay();
      }
      else
      {
          soundManager.saucerStop();
      }

      if(score >= this.nextSaucer)
      {
        let saucerSize = bigSaucerSize;
        this.nextSaucer += this.saucerRate;
        if(score >= this.nextSmallSaucer)
        {
          saucerSize = smallSaucerSize;
          this.nextSmallSaucer += this.smallSaucerInterval;           
        }
        this.add(saucerSize);
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
              trauma += addedTrauma * 1.5;
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
        this.nextSaucer = 250;
        this.saucerRate = 250;
        this.smallSaucerInterval = 750;
        this.bigSaucerSize = 30;
        this.smallSaucerSize = 15;
    }

    add(saucerSize)
    {
        this.saucers.push(new Saucer(saucerSize));
    }
}