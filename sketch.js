let ship;
let asteroidCount = 0;
let asteroids = [];
let lasers = [];
let lives = 3;
let score = 0;
let saucers = [];
let nextSaucer = 0;
let saucerRate = 250;
let nextSmallSaucer = 1000;
let smallSaucerInterval = 1000;
let nextLife = 10000;

function setup() 
{
  createCanvas(600,600);
  ship = new Ship(createVector(width / 2, height / 2), 10);

  for(let i = 0; i < asteroidCount / 2; i++)
  {
    let size = 40;
    asteroids.push(new Asteroid(createVector(random(width * 0.75, width - size), random(size, height - size)), size));
    asteroids.push(new Asteroid(createVector(random(0 , width * 0.25), random(size, height - size)), size));
  }  
}

function draw() 
{
  noFill();
  stroke(255);
  background(0); 

  if(score >= nextSaucer)
  {
    let saucerSize = 70;
    if(score >= nextSmallSaucer)
    {
      saucerSize = 40;
      nextSmallSaucer += smallSaucerInterval;
    }
    console.log(saucerSize);
    let saucer = new Saucer(saucerSize);
    saucers.push(saucer);
    nextSaucer += saucerRate;
    
  }

  for(let i = 0; i < asteroids.length; i++)
  {
    if(asteroids[i].size >= 10)
    {
      if(ship.hits(asteroids[i]))
      {
          lives--;
          ship.respawn();
      }
      asteroids[i].display(); 
      asteroids[i].update();
    }    
    else
    {
      asteroids.splice(i, 1);
    }
  }

  for(let i = lasers.length - 1; i >= 0; i--)
  {
    if(lasers[i].checkEdges())
    {
      splice(i,1);
    }
    else
    {
      lasers[i].display(); 
      lasers[i].update();
      for(let j = asteroids.length - 1; j >=0; j--)
      {
        if(lasers[i].hits(asteroids[j]))
        {
          console.log(asteroids[j].size);
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
  
  if(lives > 0)
  {
    ship.display();
    ship.turn();
    ship.update();
    
    for(let i = 0; i < saucers.length; i++)
    {
      saucers[i].display();
      saucers[i].update();
      if(round(millis()/1000) % 2 === 0 && frameCount % 60 === 0)
      {
        lasers.push(new Laser(saucers[i].position, saucers[i].heading));
      }      
    }    
  }  
  else
  {
    push();
      textAlign(CENTER);
      fill(255);
      textSize(50);
      text("Game Over", width / 2, height /2);
    pop();
  }

  text(`Lives: ${lives}`, 20, 20);
  text(`Score: ${score}`, width - 75, 20);
}

function keyPressed() 
{

  if(key == ' ')
  {
    lasers.push(new Laser(ship.position, ship.heading));
    //console.log(ship.heading);
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
  else if(keyCode == SHIFT)
  {
    ship.warp();
  }
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

