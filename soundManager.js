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

    // Plays asteroid hit sound
    asteroidPlay()
    {
        if(!this.asteroid.isPlaying())
        {
            this.asteroid.play(); 
        }       
    }

    // Plays engine firing sound on a loop
    enginePlay()
    {
        if(!this.engine.isPlaying())
        {
            this.engine.play();
            this.engine.loop();
        }
    }

    // Stops engine sound
    engineStop()
    {
        this.engine.stop();
    }

    // Plays game over music, stops background music
    gameOverPlay()
    {
        if(this.music.isPlaying())
        {
            this.music.stop();
        }
        if(!this.gameOver.isPlaying())
        {
            this.gameOver.play();
        }
    }

    // Plays laser firing sound
    laserPlay()
    {
        if(!this.laser.isPlaying())
        {
            this.laser.play();
        }
    }

    // Plays background music on loop
    backgroundMusic()
    {
        if(!this.music.isPlaying())
        {
            this.music.setVolume(0.75);
            this.music.play();
            this.music.loop();
        }        
    }

    // Turns music volume down when game is paused
    gamePause()
    {
        this.music.setVolume(0.15);
        if(this.saucer.isPlaying())
        {
            this.saucer.setVolume(0.15);
        }
    }

    // Resets game music to normal volume
    gameResume()
    {
        this.music.setVolume(0.75);
        if(this.saucer.isPlaying())
        {
            this.saucer.setVolume(0.75);
        }
    }

    // Plays saucer sound on loop
    saucerPlay()
    {
        if(!this.saucer.isPlaying())
        {
            this.saucer.setVolume(0.75);
            this.saucer.play();
            this.saucer.loop();  
        }    
          
    }

    // Stops saucer sound from playing
    saucerStop()
    {
        if(this.saucer.isPlaying())
        {
           this.saucer.stop(); 
        }        
    }

    // Plays explosion sound
    explodePlay()
    {
        if(!this.shipExplode.isPlaying())
        {
            this.shipExplode.play();
            this.saucerStop();
        }        
    }

    // Plays warp sound effect
    warpPlay()
    {
        this.warp.play();        
    }
}