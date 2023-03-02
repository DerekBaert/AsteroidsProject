// All sounds downloaded from https://mixkit.co/free-sound-effects/game/

let ship;
let asteroidCount = 5;
let asteroids;
let playerLasers = [];
let saucerLasers = [];
let lives = 3;
let score = 0;
let saucers = [];
let nextSaucer = 250;
let saucerRate = 250;
let nextSmallSaucer = 1000;
let smallSaucerInterval = 1000;
let nextLife = 10000;
let bigSaucerSize = 50;
let smallSaucerSize = 25;
let pause = false;
let gameStart = false;
let myFont;
let playButton;
let soundManager;

function preload()
{
  myFont = loadFont("PixeloidSans.ttf");
  soundManager = new SoundManager();
  //soundFormats('wav');
  // let asteroid = loadSound("audio/Asteroid.wav");
  // let engine = loadSound("audio/Engine.wav");
  // let gameOver = loadSound("audio/GameOver.wav");
  // let laser = loadSound("audio/Laser.wav");
  // let music = loadSound("audio/Music.wav");
  // let saucer = loadSound("audio/Saucer.wav");
  // let shipExplode = loadSound("audio/ShipExplode.wav");
  // let warp = loadSound("audio/Warp.wav");
}

function setup() 
{
  createCanvas(600,600);
  frameRate(60);
  
  ship = new Ship(createVector(width / 2, height / 2), 10);
  generateAsteroids();
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
  handleAsteroids(); 
  if(!gameStart)
  {
    textAlign(CENTER);
    textFont(myFont);
    fill(255);
    textSize(50);
    text("Asteroids", width / 2 , 100);
    textSize(25);  
  }

  if(!pause && gameStart)
  {
    if(lives > 0 && asteroids.length > 0)
    {
      soundManager.gameResume();
      handleScore();
      handleLasers(playerLasers);
      handleLasers(saucerLasers);
      handleSaucers();  
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

function handleSaucers() {
  for (let i = 0; i < saucers.length; i++) {
    if (saucers[i].checkEdges()) {
      saucers.splice(i, 1);
    }
    else {
      saucers[i].display();
      saucers[i].update();

      if (ship.hits(saucers[i])) {
        lives--;
        ship.respawn();
      }

      if (frameCount % 60 === 0) {
        saucerLasers.push(new Laser(saucers[i].position, saucers[i].heading, LaserType.Enemy));
      }
    }
  }
}

function keyPressed() 
{

  if(key == ' ')
  {
    playerLasers.push(new Laser(ship.position, ship.heading, LaserType.Player));
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
    ship.boosting(true);
  }
  else if(keyCode == DOWN_ARROW)
  {
    ship.warp();
  }
  else if(keyCode == ESCAPE)
  {
    pause = !pause;
  }
  else if((keyCode == ENTER && lives <= 0) || (keyCode == ENTER && asteroids.length <= 0))
  {
    reset();
    generateAsteroids();
  }
}

function reset()
{
  playerLasers = [];
  saucerLasers = [];
  saucers = [];
  asteroidCount = 5;
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
}

function keyReleased()
{
  ship.setRotation(0);
  ship.boosting(false);
}

function checkLifeGain()
{
  if(score > nextLife)
  {
    lives += 1;
    nextLife += 10000;
  }
}

function generateAsteroids()
{
  asteroids = [];
  for(let i = 0; i < asteroidCount / 2; i++)
  {
    let size = floor(random(20, 40));
    asteroids.push(new Asteroid(createVector(random(width * 0.75, width - size), random(size, height - size)), size));
    asteroids.push(new Asteroid(createVector(random(0 , width * 0.25), random(size, height - size)), size));
  }  
}

function handleLasers(lasers)
{
  for(let i = lasers.length - 1; i >= 0; i--)
  {
    if(!lasers[i].alive())
    {
      lasers.splice(i,1);
      console.log("laserDead");
    }
    else
    {

      lasers[i].display(); 
      lasers[i].update();
      lasers[i].checkEdges();
      for(let j = asteroids.length - 1; j >=0; j--)
      {
        if(lasers[i].hits(asteroids[j]))
        {
          if(asteroids[j].size == 40)
          {
            score += 20;
          }
          else if(asteroids[j].size >= 20)
          {
            score += 50;
          }
          else
          {
            score += 100;
          }
          let newAsteroids = asteroids[j].break();
          asteroids = asteroids.concat(newAsteroids);
          asteroids.splice(j, 1);
          lasers.splice(i,1);
          checkLifeGain();
          break;
        }
      }
      
    }    
  }

  for(let i = lasers.length - 1; i >= 0; i--)
  {
    for(let j = saucers.length - 1; j >=0; j--)
      {
        if(lasers[i].hits(saucers[j]) && lasers[i].laserType != LaserType.Enemy)
        {
          if(saucers[j].size == 60)
          {
            score += 200;
          }
          else if(saucers[j].size == 30)
          {
            score += 1000;
          }
          saucers.splice(i, 1);
        }
      }
      if(lasers[i].hits(ship) && lasers[i].laserType != LaserType.Player)
      {
        lasers.splice(i, 1);
        lives--;
        ship.respawn();
      }
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
    console.log(saucerSize);
    let saucer = new Saucer(saucerSize);
    saucers.push(saucer);
    nextSaucer += saucerRate;
    
  }
}

function handleAsteroids()
{
  for(let i = 0; i < asteroids.length; i++)
      {
        if(asteroids[i].size >= 10)
        {
          asteroids[i].display(); 
          asteroids[i].update();
    
          if(ship.hits(asteroids[i]))
          {
              lives--;
              ship.respawn();
          }
    
          for(let j = saucers.length - 1; j >= 0; j--)
          {
            if(saucers[j].hits(asteroids[i]))
            {
              saucers.splice(j, 1);
              console.log("Saucer Crashed");
            }
          }
          
        }    
        else
        {
          asteroids.splice(i, 1);
        }
      }
}
