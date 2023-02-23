class LaserType
{
    static Player = new LaserType("Player");
    static Enemy = new LaserType("Enemy");

    constructor(name) 
    {
        this.name = name
    }
}