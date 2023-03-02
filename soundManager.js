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

    asteroid()
    {

    }

    engine()
    {

    }

}