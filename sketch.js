let ship;
let asteroids = [];

function setup() 
{
  createCanvas(600,600);
  ship = new Ship(createVector(width / 2, height / 2), 10);
  asteroids.push(new Asteroid(createVector(random(width), random(height)), 50));
}

function draw() 
{
  noFill();
  stroke(255);
  background(0);
  ship.display();
  ship.turn();
  ship.update();

  asteroids.forEach(function(asteroid){asteroid.display();});
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


