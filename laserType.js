class LaserType
{
    // Enum for the two types of lasers, player or enemy lasers.
    static Player = new LaserType("Player");
    static Enemy = new LaserType("Enemy");

    constructor(name) 
    {
        this.name = name
    }
}