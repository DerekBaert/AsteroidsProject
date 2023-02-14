let ship;

function setup() 
{
  createCanvas(500,500);

  ship = new Ship(createVector(250,250),10);
}

function draw() 
{
  background(0);
  ship.display();
  ship.turn();
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
}

function keyReleased()
{
  ship.setRotation(0);
}


