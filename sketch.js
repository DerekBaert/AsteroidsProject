let ship;

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  ship = new Ship(createVector(width / 2, height / 2), 20);
}

function draw() 
{
  background(0);
  ship.display();
  ship.turn();
  ship.update();
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


