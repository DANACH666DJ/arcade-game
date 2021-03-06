// Enemies our player must avoid
let level = 1; 
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.
    // every time the enemy leaves the canvas, it appears again with a different speed
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // here the collisions between the enemies and the player are checked
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
     // these variables allow us to manage the player by the x and y axes 
     this.x = x;
     this.y = y;
 
     //The image that we will use to give our player an aspect
     this.player = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};


// method to be able to move the player with the keys
Player.prototype.handleInput = function (keyPress) {
    // allows the user to move to the left,right,up and down by the axis x,y and also prevents him from leaving the canvas
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    } else if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    } else if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    } else if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    } 
    // if the player reaches the water, the position of the player is automatically reset to its initial position
    if (this.y < 0) {
        document.querySelector(".modal").style.display ="block";
        level+=1;
        var text = document.createTextNode(`Level ${level}`);
        document.querySelector("#level").textContent= `Level ${level}`;
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
            document.querySelector(".win").textContent= `Congratulations, you have  won the level ${level}`;
            document.querySelector(".modal").style.display ="none";
        }, 800);
    };
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// we place the enemies in different positions on the canvas
var enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 300 
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 300);
    allEnemies.push(enemy);
});


// Place the player object in a variable called player
var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
