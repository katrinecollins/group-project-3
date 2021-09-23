//Fancy Titles https://patorjk.com/software/taag

// __     __ _____  ____  _____  ___   ____    ____
// \ \   / /| ____|/ ___||_   _|/ _ \ |  _ \  |___ \
//  \ \ / / |  _| | |      | | | | | || |_) |   __) |
//   \ V /  | |___| |___   | | | |_| ||  _ <   / __/
//    \_/   |_____|\____|  |_|  \___/ |_| \_\ |_____|

class Vector2 {
  x;
  y;
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  //   ____  _____   _   _____  ___  ____
  //  / ___||_   _| / \ |_   _||_ _|/ ___|
  //  \___ \  | |  / _ \  | |   | || |
  //   ___) | | | / ___ \ | |   | || |___
  //  |____/  |_|/_/   \_\|_|  |___|\____|

  //Outputs 0,0 Vector
  static Zero() {
    return new Vector2(0, 0);
  }

  //   _____  ___   ____   __  __     _   _____
  //  |  ___|/ _ \ |  _ \ |  \/  |   / \ |_   _|
  //  | |_  | | | || |_) || |\/| |  / _ \  | |
  //  |  _| | |_| ||  _ < | |  | | / ___ \ | |
  //  |_|    \___/ |_| \_\|_|  |_|/_/   \_\|_|

  //Output x,y as string for debugging
  FormatString() {
    return `[${this.x}, ${this.y}]`;
  }

  //    __  __     _   _____  _   _
  //   |  \/  |   / \ |_   _|| | | |
  //   | |\/| |  / _ \  | |  | |_| |
  //   | |  | | / ___ \ | |  |  _  |
  //   |_|  |_|/_/   \_\|_|  |_| |_|

  //Adds A Vector2 To Current Vector2
  Add(vector2) {
    this.x += vector2.x;
    this.y += vector2.y;
  }

  //Returns A Vector2 Plus Current Vector2
  Plus(vector2) {
    let vector2Out = new Vector2(this.x, this.y);
    vector2Out.x += vector2.x;
    vector2Out.y += vector2.y;
    return vector2Out;
  }

  //Subtracts A Vector2 from Current Vector2
  Subtract(vector2) {
    this.x -= vector2.x;
    this.y -= vector2.y;
  }

  //Returns A Vector2 Minus Current Vector2
  Minus(vector2) {
    let vector2Out = new Vector2(this.x, this.y);
    vector2Out.x -= vector2.x;
    vector2Out.y -= vector2.y;
    return vector2Out;
  }

  //Multiply A Value To Current Vector2
  Multiply(value) {
    this.x *= value;
    this.y *= value;
  }

  //Returns A Value Times Current Vector2
  Times(value) {
    let vector2Out = new Vector2(this.x, this.y);
    vector2Out.x *= value;
    vector2Out.y *= value;
    return vector2Out;
  }

  //Divide A Value To Current Vector2
  Divide(value) {
    this.x /= value;
    this.y /= value;
  }

  //Returns A Value Quotient Current Vector2
  Quotient(value) {
    let vector2Out = new Vector2(this.x, this.y);
    vector2Out.x /= value;
    vector2Out.y /= value;
    return vector2Out;
  }

  //Restrains X and Y
  Clamp(min, max) {
    //No mixing min function and max var is not incorrect
    this.x = Math.min(this.x, max);
    this.y = Math.min(this.y, max);
    //The min var is the lower bound but it will be negitive, hard to explain and counter intuitive but correct
    this.x = Math.max(this.x, min);
    this.y = Math.max(this.y, min);
  }

  //Normilizes Vector
  Normilize() {
    if (this.x == 0 && this.y == 0) {
      return;
    }
    let _hypot = Math.hypot(this.x, this.y);
    console.log(_hypot, this.x, this.y);
    this.x /= _hypot;
    this.y /= _hypot;
  }
}

//  ____   _   _  ____   _      ___   ____     __     __ _     ____   ____
// |  _ \ | | | || __ ) | |    |_ _| / ___|    \ \   / // \   |  _ \ / ___|
// | |_) || | | ||  _ \ | |     | | | |         \ \ / // _ \  | |_) |\___ \
// |  __/ | |_| || |_) || |___  | | | |___       \ V // ___ \ |  _ <  ___) |
// |_|     \___/ |____/ |_____||___| \____|       \_//_/   \_\|_| \_\|____/

//Window
let gameWindow;
let ctx;

//Player
//Input
let input = Vector2.Zero();
let playerMovement = Vector2.Zero();
//Transform
let playerPosition = new Vector2(10, 10);

//      ____     _     __  __  _____       _      ___    ___   ____
//     / ___|   / \   |  \/  || ____|     | |    / _ \  / _ \ |  _ \
//    | |  _   / _ \  | |\/| ||  _|       | |   | | | || | | || |_) |
//    | |_| | / ___ \ | |  | || |___      | |___| |_| || |_| ||  __/
//     \____|/_/   \_\|_|  |_||_____|     |_____|\___/  \___/ |_|

//Create Game Loop
const framerate = 60;
window.onload = function () {
  gameWindow = document.getElementById("GameCanvas");
  ctx = gameWindow.getContext("2d");
  Start();
  setInterval(Update, 1000 / framerate);
};

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
  if (input.x == Vector2.Zero().x && input.y == Vector2.Zero().y){
    playerMovement.Divide(1.015)
  }
  playerMovement.Add(input.Times(0.2));
  playerMovement.Clamp(-5, 5);
  playerPosition.Add(playerMovement);
  //console.log(playerMovement);
  playerPosition.Clamp(0, gameWindow.width);

  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
  ctx.beginPath();
  ctx.arc(playerPosition.x, playerPosition.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
}

//Called When Key is Pressed
function inputHandler(event, keyPressed) {
  switch (event.keyCode) {
    case 37: // Left Arrow
    case 65: // A
      //Manage Input Vector
      if (input.x != -1 && keyPressed) {
        input.x = -1;
      } else if (input.x == -1 && !keyPressed) {
        input.x = 0;
      }
      break;

    case 38: // Up Arrow
    case 87: // W
      //Manage Input Vector
      if (input.y != -1 && keyPressed) {
        input.y = -1;
      } else if (input.y == -1 && !keyPressed) {
        input.y = 0;
      }
      break;

    case 39: // Right Arrow
    case 68: // D
      //Manage Input Vector
      if (input.x != 1 && keyPressed) {
        input.x = 1;
      } else if (input.x == 1 && !keyPressed) {
        input.x = 0;
      }
      break;

    case 40: // Down Arrow
    case 83: // S
      //Manage Input Vector
      if (input.y != 1 && keyPressed) {
        input.y = 1;
      } else if (input.y == 1 && !keyPressed) {
        input.y = 0;
      }
      break;

    default:
      console.log("Unlogged Key Pressed!  Code: " + event.keyCode);
      break;
  }

  //console.log(event.keyCode + ", " + keyPressed);
}
