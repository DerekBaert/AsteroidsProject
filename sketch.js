let ship;
let asteroidCount = 5;
let asteroids = [];
let lasers = [];

function setup() 
{
  createCanvas(600,600);
  ship = new Ship(createVector(width / 2, height / 2), 10);
  for(let i = 0; i < asteroidCount; i++)
  {
    let size =  random(20, 50);
    asteroids.push(new Asteroid(createVector(random(size, width - size), random(size, height - size)), size));
  }  
}

function draw() 
{
  noFill();
  stroke(255);
  background(0); 

  for(let i = 0; i < asteroids.length; i++)
  {
    asteroids[i].display(); 
    asteroids[i].update();
  }

  for(let i = lasers.length - 1; i >= 0; i--)
  {
    lasers[i].display(); 
    lasers[i].update();
    for(let j = asteroids.length - 1; j >=0; j--)
    {
      if(lasers[i].hits(asteroids[j]))
      {
        let newAsteroids = asteroids[j].break();
        //asteroids.push(newAsteroids);
        asteroids.splice(j, 1);
        lasers.splice(i,1);
        break;
      }
    }
  }
  lasers.forEach(function(laser)
  {
    
  });
  
  ship.display();
  ship.turn();
  ship.update();
}

function keyPressed() 
{

  if(key == ' ')
  {
    lasers.push(new Laser(ship.position, ship.heading));
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
}

function keyReleased()
{
  ship.setRotation(0);
  ship.boosting(false);
}


