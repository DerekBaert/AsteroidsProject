// All sounds downloaded from https://mixkit.co/free-sound-effects/game/

let ship;
// let asteroidCount = 5;
// let asteroids;
// let playerLasers = [];
// let saucerLasers = [];
// let saucers = [];
let asteroidManager = new AsteroidManager();
let saucerManager = new SaucerManager();
let laserManager = new LaserManager();

let lives = 3;
let score = 0;
let nextLife = 10000;

let nextSaucer = 250;
let saucerRate = 250;
let nextSmallSaucer = 1000;
let smallSaucerInterval = 1000;
let bigSaucerSize = 50;
let smallSaucerSize = 25;

let pause = false;
let gameStart = false;
let myFont;
let playButton;
let soundManager;
let gameOverPlayed = false;

function preload()
{
  myFont = loadFont("PixeloidSans.ttf");
  soundManager = new SoundManager();
}

function setup() 
{
  createCanvas(600,600);
  frameRate(60);
  
  ship = new Ship(createVector(width / 2, height / 2), 10);
  asteroidManager.generateAsteroids();
  playButton = createButton("Play");
  playButton.position((width / 2) - 20, height / 2);
  playButton.mouseClicked(function()
  {
    gameStart = true;
    playButton.remove();
    soundManager.backgroundMusic();
  });
}

function draw() 
{
  background(0); 
  noFill();
  stroke(255);

  saucerManager.update(soundManager);

  if(!gameStart)
  {
    handleAsteroids(); 
    textAlign(CENTER);
    textFont(myFont);
    fill(255);
    textSize(50);
    text("Asteroids", width / 2 , 100);
    textSize(25);  
  }

  if(!pause && gameStart)
  {
    if(lives > 0 && asteroidManager.asteroids.length > 0)
    {
      asteroidManager.handleAsteroids(ship, soundManager, lives);
      soundManager.gameResume();
      handleScore();
      laserManager.handleLasers(asteroidManager, soundManager, lives, saucerManager);
      saucerManager.handleSaucers(ship, soundManager, lives, laserManager);  
      checkLifeGain();
      ship.display();
      ship.turn();
      ship.update();  
    }  
    else if(lives <= 0)
    {
      push();
        textAlign(CENTER);
        fill(255);
        textSize(25);
        if(!gameOverPlayed)
        {
          soundManager.gameOverPlay();
          gameOverPlayed = true;
        }        
        text("Game Over", width / 2, height /2);
        text("Press [ENTER] to restart", width / 2, height /2 + 50);
      pop();
    }
    else 
    {
      push();
        textAlign(CENTER);
        fill(255);
        textSize(25);
        text("Congratulations!", width / 2, height /2);
        text("Press [ENTER] to restart", width / 2, height /2 + 50);
      pop();
    }
    textSize(15);
    fill(255)
    text(`Lives: ${lives}`, 50, 20);
    text(`Score: ${score}`, width - 50, 20);
  }  
  else if(pause)
  {
    soundManager.gamePause();
    push();
        textAlign(CENTER);
        fill(255);
        textSize(25);
        text("Game Paused", width / 2, height /2);
      pop();
  }
}


function keyPressed() 
{

  if(key == ' ')
  {
    soundManager.laserPlay();
    laserManager.add(ship.position, ship.heading, LaserType.Player);
    ship.fire();
  }
  else if(keyCode == RIGHT_ARROW) 
  {
    ship.setRotation(0.1);
  } 
  else if (keyCode == LEFT_ARROW) 
  {
    ship.setRotation(-0.1);
  }
  else if (keyCode == UP_ARROW)
  {
    soundManager.enginePlay();
    ship.boosting(true);
  }
  else if(keyCode == DOWN_ARROW)
  {
    soundManager.warpPlay();
    ship.warp();
  }
  else if(keyCode == ESCAPE)
  {
    pause = !pause;
  }
  else if((keyCode == ENTER && lives <= 0) || (keyCode == ENTER && asteroids.length <= 0))
  {
    reset();
  }
}

function reset()
{
  laserManager.reset();
  saucerManager.reset();
  asteroidManager.reset();
  lives = 3;
  score = 0;
  nextSaucer = 250;
  saucerRate = 250;
  nextSmallSaucer = 1000;
  smallSaucerInterval = 1000;
  nextLife = 10000;
  bigSaucerSize = 50;
  smallSaucerSize = 25;
  pause = false;
  gameOverPlayed = false;
  asteroidManager.generateAsteroids();
}

function keyReleased()
{
  ship.setRotation(0);
  ship.boosting(false);
  soundManager.engineStop();
}

function checkLifeGain()
{
  if(score > nextLife)
  {
    lives += 1;
    nextLife += 10000;
  }
}

function handleScore()
{
  if(score >= nextSaucer)
  {
    let saucerSize = bigSaucerSize;
    if(score >= nextSmallSaucer)
    {
      saucerSize = smallSaucerSize;
      nextSmallSaucer += smallSaucerInterval;
    }
    saucerManager.add(saucerSize);
    nextSaucer += saucerRate;    
  }
}


