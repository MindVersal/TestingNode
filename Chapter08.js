/**
 * Created by isp_pia on 17.03.2017.
 */
console.log("Chapter 08.");
let plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];
function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
};
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function (vector) {
    return  vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function (vector) {
    return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function (vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function (f, context) {
    for (let y = 0; y < this.height; y++){
        for (let x = 0; x < this.width; x++){
            let value = this.space[x + y * this.width];
            if (value != null) {
                f.call(context, value, new Vector(x, y));
            }
        }
    }
};
let directions = {
    "n"  : new Vector( 0, -1),
    "ne" : new Vector( 1, -1),
    "e"  : new Vector( 1,  0),
    "se" : new Vector( 1,  1),
    "s"  : new Vector( 0,  1),
    "sw" : new Vector(-1,  1),
    "w"  : new Vector(-1,  0),
    "nw" : new Vector(-1, -1)
};
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function BouncingCritter() {
    this.direction = randomElement(Object.keys(directions));
}
BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) !== " "){
        this.direction = view.found(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};
function elementFromChar(legend, ch) {
    if (ch === " "){
        return null;
    } else {
        let element = new legend[ch]();
        element.originChar = ch;
        return element;
    }
}
function World(map, legend) {
    let grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach(function (line, y) {
       for (let x = 0; x < line.length; x++) {
           grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
       }
    });
}
function charFromElement(element) {
    if (element === null){
        return " ";
    } else {
        return element.originChar;
    }
}
World.prototype.toString = function () {
    let output = "";
    for (let y = 0; y < this.grid.height; y++){
        for (let x = 0; x < this.grid.width; x++){
            let element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n"
    }
    return output;
};
function Wall() {
    
}
World.prototype.turn = function () {
    let acted = [];
    this.grid.forEach(function (critter, vector) {
        if (critter.act && acted.indexOf(critter) === -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};
World.prototype.letAct = function (critter, vector) {
    let action = critter.act(new View(this, vector));
    if (action && action.type === "move"){
        let dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) === null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)){
        let dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)){
            return dest;
        }
    }
};
function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function (dir) {
    let target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)){
        return charFromElement(this.world.grid.get(target));
    } else {
        return "#";
    }
};
View.prototype.findAll = function (ch) {
    let found = [];
    for (let dir in directions){
        if (this.look(dir) === ch){
            found.push(dir);
        }
    }
    return found;
};
View.prototype.find = function (ch) {
    let found = this.findAll(ch);
    if (found.legend === 0) {
        return null;
    } else {
        return randomElement(found);
    }
};
let directionNames = Object.keys(directions);
function dirPlus(dir, n) {
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}
function WallFollower() {
    this.dir = "s";
}
WallFollower.prototype.act = function (view) {
    let start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) !== " ") {
        start = this.dir = dirPlus(this.dir, -2);
    }
    while (view.look(this.dir) !== " "){
        this.dir = dirPlus(this.dir, 1);
        if (this.dir === start) {
            break;
        }
    }
    return {type: "move", direction: this.dir};
};
function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);
let actionType = Object.create(null);
LifelikeWorld.prototype.letAct = function (critter, vector) {
    let action = critter.act(new View(this, vector));
    let handled = action && actionType[action.type].call(this, critter, vector, action);
    if (!handled){
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
            this.grid.set(vector, null);
        }
    }
};
actionType.grow = function (critter) {
    critter.energy += 0.5;
    return true;
};
actionType.move = function (critter, vector, action) {
    let dest = this.checkDestination(action, vector);
    if (dest === null || critter.energy <= 1 || this.grid.get(dest) !== null){
        return false;
    }
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};
actionType.eat = function (critter, vector, action) {
    let dest = this.checkDestination(action, vector);
    let atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy === null){
        return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};
actionType.reproduce = function (critter, vector, action) {
    let baby = elementFromChar(this.legend, critter.originChar);
    let dest = this.checkDestination(action, vector);
    if (dest === null || critter.energy <= 2 * baby.energy || this.grid.get(dest) !== null){
        return false;
    }
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};
function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function (context) {
    if (this.energy > 15){
        let space = context.find(" ");
        if (space){
            return {type: "reproduce", direction: space};
        }
    }
    if (this.energy < 20){
        return {type: "grow"};
    }
};
function PlantEater() {
    this.energy = 20;
}
PlantEater.prototype.act = function (context) {
    let space = context.find(" ");
    if (this.energy > 60 && space){
        return {type: "reproduce", direction: space};
    }
    let plant = context.find("*");
    if (plant){
        return {type: "eat", direction: plant};
    }
    if (space){
        return {type: "move", direction: space};
    }
};
function SmartPlantEater() {
    PlantEater.call(this);
}
SmartPlantEater.prototype = Object.create(PlantEater.prototype);
SmartPlantEater.prototype.act = function (context) {
    let space = context.find(" ");
    if (this.energy > 40 && space){
        return {type: "reproduce", direction: space};
    }
    let plant = context.find("*");
    if (plant){
        return {type: "eat", direction: plant};
    }
    if (space){
        return {type: "move", direction: space};
    }
};
function Tiger() {
    this.energy = 60;
}
Tiger.prototype.act = function (context) {
    let space = context.find(" ");
    if (this.energy > 80 && space){
        return {type: "reproduce", direction: space};
    }
    let plantEater = context.find("O");
    if (plantEater){
        return {type: "eat", direction: plantEater};
    }
    if (space){
        return {type: "move", direction: space};
    }
};
//let world = new World(plan, {"#" : Wall, "o" : BouncingCritter});
let world = new LifelikeWorld(
    ["####################################################",
        "#                 ####         ****              ###",
        "#   *  @  ##                 ########       OO    ##",
        "#   *    ##        O O                 ****       *#",
        "#       ##*                        ##########     *#",
        "#      ##***  *         ****                     **#",
        "#* **  #  *  ***      #########                  **#",
        "#* **  #      *               #   *              **#",
        "#     ##              #   O   #  ***          ######",
        "#*            @       #       #   *        O  #    #",
        "#*                    #  ######                 ** #",
        "###          ****          ***                  ** #",
        "#       O                        @         O       #",
        "#   *     ##  ##  ##  ##               ###      *  #",
        "#   **         #              *       #####  O     #",
        "##  **  O   O  #  #    ***  ***        ###      ** #",
        "###               #   *****                    ****#",
        "####################################################"],
    {"#": Wall,
        "@": Tiger,
        "O": SmartPlantEater, // из предыдущего упражнения
        "*": Plant}
);
console.log("\nWorld to string: \n" + world.toString());
for (let i = 0; i < 150; i++){
    world.turn();
}
console.log("\nAfter Iterate " + ":\n" + world.toString());
console.log();
console.log("THE END.");