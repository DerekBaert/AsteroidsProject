class SoundManager
{
    constructor()
    {
        this.asteroid = loadSound("audio/Asteroid.wav");
        this.engine = loadSound("audio/Engine.wav");
        this.gameOver = loadSound("audio/GameOver.wav");
        this.laser = loadSound("audio/Laser.wav");
        this.music = loadSound("audio/Music.wav");
        this.saucer = loadSound("audio/Saucer.wav");
        this.shipExplode = loadSound("audio/ShipExplode.wav");
        this.warp = loadSound("audio/Warp.wav");
    }

    asteroidPlay()
    {
        if(!this.asteroid.isPlaying())
        {
            this.asteroid.play(); 
        }       
    }

    enginePlay()
    {
        if(!this.engine.isPlaying())
        {
            this.engine.play();
        }
    }

    gameOverPlay()
    {
        if(!this.gameOver.isPlaying())
        {
            this.gameOver.play();
        }
    }

    laserPlay()
    {
        if(!this.laser.isPlaying())
        {
            this.laser.play();
        }
    }

    backgroundMusic()
    {
        this.music.play();
        this.music.loop();
    }

    gameResume()
    {
        this.music.setVolume(0.75);
    }

    gamePause()
    {
        this.music.setVolume(0.15);
    }

    saucerPlay()
    {
        if(!this.saucer.isPlaying())
        {
            this.saucer.play();
            this.music.loop();  
        }    
          
    }

    saucerStop()
    {
        this.saucer.stop();
    }

    explodePlay()
    {
        if(!this.saucer.isPlaying())
        {
            this.shipExplode.play();
        }        
    }

    warpPlay()
    {
        if(!this.warp.isPlaying())
        {
           this.warp.play(); 
        }        
    }
}