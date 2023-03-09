// All sounds downloaded from https://mixkit.co/free-sound-effects/game/

let ship;

let asteroidManager = new AsteroidManager();
let saucerManager = new SaucerManager();
let laserManager = new LaserManager();

let lives = 3;
let score = 0;
let nextLife = 10000;

let bigSaucerSize = 30;
let smallSaucerSize = 15;

let pause = false;
let gameStart = false;
let myFont;
let playButton;
let soundManager;
let gameOverPlayed = false;
let trauma = 0;
let addedTrauma = 10;

// Preload music and font
function preload()
{
  myFont = loadFont("PixeloidSans.ttf");
  soundManager = new SoundManager();
}


function setup() 
{
  createCanvas(600,600);
  frameRate(60);
  
  // Create ship object and generate asteroids
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
    textFont(myFont);
  
    // Update saucers
    saucerManager.update(soundManager, score);

    // Display title screen if game hasn't started
    if(!gameStart)
    {
      textAlign(CENTER);      
      fill(255);
      textSize(50);
      text("Space Junk", width / 2 , 100);
      textSize(25);  
    }

    // If score has hit or exceeded a million, a winner is you
    if(score >= 1000000)
    {
      pause = true;
      push();
        textAlign(CENTER);
        fill(255);
        textSize(25);
        text("Congratulations!", width / 2, height /2);
        text("Press [ENTER] to restart", width / 2, height /2 + 50);
      pop();
    }

    if(!pause && gameStart)
    {
      // If player has not run out of lives and there are still asteroids
      if(lives > 0 && asteroidManager.asteroids.length > 0)
      {
        push();  
          // Handle any screen shake
          let cameraX =  trauma * noise(500); 
          let cameraY =  trauma * noise(500); 
          translate(cameraX, cameraY);
          trauma = trauma > 0 ? trauma - 0.25 : trauma;
          checkLifeGain();

          // Managers handle their arrays
          asteroidManager.handleAsteroids(ship, soundManager, lives);
          laserManager.handleLasers(asteroidManager, soundManager, lives, saucerManager);
          saucerManager.handleSaucers(ship, soundManager, lives, laserManager);  

          // Set game sound to default
          soundManager.gameResume();
          
          // Update and display ship
          ship.display();
          ship.update();  
        pop();
      }  
      // If player has run out of lives, trigger game over
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
      // If there are no more asteroids, spawn a new set
      else if(asteroidManager.asteroids.length <= 0)
      {
        asteroidManager.generateAsteroids();
      }
      // Displays lives and score while game is unpaused and started
      textSize(15);
      fill(255)
      text(`Lives: ${lives}`, 50, 20);
      text(`Score: ${score}`, width - 75, 20);
    }  
    // If game is not won and pause is set to true, display pause screen and turn down sound
    else if(pause && score < 1000000)
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

// Handles key pressed events
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

// Resets variables to defaults, and resets manager objects
function reset()
{
  laserManager.reset();
  saucerManager.reset();
  asteroidManager.reset();
  lives = 3;
  score = 0;
  nextLife = 10000;
  bigSaucerSize = 50;
  smallSaucerSize = 25;
  pause = false;
  gameOverPlayed = false;
  trauma = 0;
  asteroidManager.generateAsteroids();
}

// Stops respective functions when certain keys are released
function keyReleased()
{
  // Stops engine firing when up arrow is released
  if(keyCode == UP_ARROW)
  {
    ship.boosting(false);
    soundManager.engineStop();
  }
  // Stops rotation when left or right arrow keys are released
  else if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW)
  {
    ship.setRotation(0);
  }
}

// Checks if player has high enough score to gain a life
function checkLifeGain()
{
  if(score > nextLife)
  {
    lives += 1;
    nextLife += 10000;
  }
}

