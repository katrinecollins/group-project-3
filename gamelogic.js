class Vector2 {
    x;
    y;
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    //Outputs 0,0 Vector
    static Empty(){
        return new Vector2(0, 0);
    }

    //Output x,y as string for debugging
    FormatString(){
        return `[${this.x}, ${this.y}]`;
    }

    //Normilizes Vector
    Normilize(){
        let _hypot = Math.hypot(this.x, this.y)
        this.x /= _hypot
        this.y /= _hypot
    }
}

const framerate = 60
window.onload = function() {
    const gameWindow = document.getElementById("GameCanvas")
    const contex = gameWindow.getContext("2d");
    document.addEventListener("keydown", keyDown);
    setInterval(game, 1000/framerate)
}

function keyDown(){

}

function game(){

}