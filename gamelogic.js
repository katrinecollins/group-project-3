

//Fancy Titles https://patorjk.com/software/taag/#p=display&f=Standard

// __     __ _____  ____  _____  ___   ____    ____
// \ \   / /| ____|/ ___||_   _|/ _ \ |  _ \  |___ \
//  \ \ / / |  _| | |      | | | | | || |_) |   __) |
//   \ V /  | |___| |___   | | | |_| ||  _ <   / __/
//    \_/   |_____|\____|  |_|  \___/ |_| \_\ |_____|

class Vector2 {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
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

//    ___  ____      _ _____ ____ _____
//   / _ \| __ )    | | ____/ ___|_   _|
//  | | | |  _ \ _  | |  _|| |     | |
//  | |_| | |_) | |_| | |__| |___  | |
//   \___/|____/ \___/|_____\____| |_|

class Object {
  id; //Object Id
  createtime; //Time Object Created
  active = true; //Determines if its drawn
  position = Vector2.Zero();
  rotation = 0; //Degrees
  size = new Vector2(50, 50); //In Pixels
  sprite; //Image
  constructor(position, rotation, size, sprite) {
    this.position = position;
    this.rotation = rotation;
    this.size = size;
    this.sprite = new Image();
    this.sprite.src = sprite;
  }

  //Adds object to the object array, allowing an object to exist without being rendered, use case is cloning an object
  Instantiate() {
    return objectArray.push(this);
  }

  InstantiateTimer(timeout) {
    this.id = tempObjectArray.push(this);
    setTimeout(function(){
      tempObjectArray.reverse()
      tempObjectArray.pop()
      tempObjectArray.reverse()
      for(let i = 0; i < tempObjectArray.length; i++){
        tempObjectArray[i].id = i;
      }
    },timeout)
  }

  //Renders The Object on the Canvas
  DrawObject(context) {
    //WHY IS THE ONLY WAY TO ROATE AN IMAGE TO ROTATE THE CANVAS DRAW THE IMAGE THEN ROTATE THE CANVAS BACK
    //I NEED TO DO TRIG AND IT MAKES ME ANGRY

    //Time to calculate new posx and posy

    if (this.active) {
      let hypot = Math.hypot(this.position.x, this.position.y);
      let angleA = Math.atan(this.position.y / this.position.x);
      let angleB = angleA + this.rotation * (Math.PI / 180);
      let x = Math.sin(angleB) * hypot;
      let y = Math.cos(angleB) * hypot;

      context.rotate((this.rotation * Math.PI) / 180);
      context.drawImage(
        this.sprite,
        x - this.size.x / 2,
        y - this.size.y / 2,
        this.size.x,
        this.size.y
      );
      context.rotate((-this.rotation * Math.PI) / 180);
    }
  }

  //Returns the direction the object is facing
  Forward() {
    return new Vector2(
      Math.sin(this.rotation * (Math.PI / 180)),
      Math.cos(this.rotation * (Math.PI / 180))
    );
  }

  Right() {
    return new Vector2(
      Math.sin(this.rotation + 90 * (Math.PI / 180)),
      Math.cos(this.rotation + 90 * (Math.PI / 180))
    );
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
//Objects
let objectArray = [];
let tempObjectArray = [];
//Player
let player;
//Input
let input = Vector2.Zero();
let playerMovement = Vector2.Zero();

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
  //Add Key Press Event Listeners
  document.addEventListener("keydown", () => {
    inputHandler(event, true);
  });
  document.addEventListener("keyup", () => {
    inputHandler(event, false);
  });

  player = new Object(
    new Vector2(500, 500),
    0,
    new Vector2(20, 20),
    "https://via.placeholder.com/100"
  );
  player.Instantiate();
}

//Called When Game Updates
function Update() {
  //Player Drag... In Space?
  playerMovement.Divide(1.02);
  //Player Acceleration
  let forward = player.Forward();
  playerMovement.Add(forward.Times(input.y * 0.2));
  playerMovement.Clamp(-5, 5);
  player.position.Add(playerMovement);
  player.position.Clamp(0, gameWindow.width);
  player.rotation += input.x * 5;

  ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
  //Draw All Objects
  objectArray.forEach((object) => {
    object.DrawObject(ctx);
  });
  tempObjectArray.forEach((object) => {
    object.DrawObject(ctx);
  });
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

    case 32: // Space Bar
      //Shoot
      if (keyPressed) {
        new Object(
          new Vector2(player.position.x, player.position.y),
          0,
          new Vector2(100, 100),
          "https://via.placeholder.com/100"
        ).InstantiateTimer(1000);
      }
      break;

    default:
      console.log("Unlogged Key Pressed!  Code: " + event.keyCode);
      break;
  }
}
