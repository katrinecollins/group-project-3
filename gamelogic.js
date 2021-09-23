//Types
class Vector2 {
  x;
  y;
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  //Outputs 0,0 Vector
  static Zero() {
    return new Vector2(0, 0);
  }

  //Output x,y as string for debugging
  FormatString() {
    return `[${this.x}, ${this.y}]`;
  }

  //Normilizes Vector
  Normilize() {
    let _hypot = Math.hypot(this.x, this.y);
    this.x /= _hypot;
    this.y /= _hypot;
  }
}

//Create Game Loop
const framerate = 60;
window.onload = function () {
  const gameWindow = document.getElementById("GameCanvas");
  const contex = gameWindow.getContext("2d");
  Start();
  setInterval(Update, 1000 / framerate);
};

//Public Vars
let input = Vector2.Zero();

//Called When Key is Pressed
function inputHandler(event, keyPressed) {
  switch (event.keyCode) {
    case 37: // Left Arrow
    case 65: // A
    //Manage Input Vector
      if (input.x == 0 && keyPressed) {
        input.x = -1;
      } else if (input.x != 0 && !keyPressed) {
        input.x = 0;
      }
      break;

    case 38: // Up Arrow
    case 87: // W
    //Manage Input Vector
      if (input.y == 0 && keyPressed) {
        input.y = 1;
      } else if (input.y != 0 && !keyPressed) {
        input.y = 0;
      }
      break;

    case 39: // Right Arrow
    case 68: // D
    //Manage Input Vector
      if (input.x == 0 && keyPressed) {
        input.x = 1;
      } else if (input.x != 0 && !keyPressed) {
        input.x = 0;
      }
      break;

    case 40: // Down Arrow
    case 83: // S
    //Manage Input Vector
      if (input.y == 0 && keyPressed) {
        input.y = -1;
      } else if (input.y != 0 && !keyPressed) {
        input.y = 0;
      }
      break;

    default:
      console.log("Unlogged Key Pressed!  Code: " + event.keyCode);
  }
  console.log(event.keyCode + ", " + keyPressed);
}

//Called When Game Starts
function Start() {
  console.log("Start");
  //Add Key Press Event Listeners
  document.addEventListener("keydown", () => {
    inputHandler(event, true);
  });
  document.addEventListener("keyup", () => {
    inputHandler(event, false);
  });
}

//Called When Game Updates
function Update() {
  console.log(input.FormatString());
}
