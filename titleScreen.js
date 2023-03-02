class TitleScreen
{
    constructor(centreHeight, centreWidth, font)
    {
        this.centreHeight = centreHeight;
        this.centreWidth = centreWidth;
        this.font = font;
    }

    display()
    {
        textAlign(CENTER);
        textFont(this.font);
        fill(255);
        textSize(50);
        text("Asteroids", this.centreWidth, 100);
        textSize(25);
        text("Press [Enter] to Start", this.centreWidth, this.centreHeight);
    }
}