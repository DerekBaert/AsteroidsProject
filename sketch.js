let ship;
let asteroidCount = 5;
let asteroids = [];

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
  ship.display();
  ship.turn();
  ship.update();

  asteroids.forEach(function(asteroid)
  {
    asteroid.display(); 
    asteroid.update();
  });
}

function keyPressed() 
{
  if(keyCode == RIGHT_ARROW) 
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


