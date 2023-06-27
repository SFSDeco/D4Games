
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
$("#Shield").hide();
// width and height of each platform and where platforms start
const platformWidth = 65;
const platformHeight = 20;
const platformStart = canvas.height - 50;
var scoreExact = 0;
var itemType = 0;
// items
const itemSize = 30;
let items = [];
let starItems = [];
let shieldItems = [];


// player physics
const gravity = 0.2;
const drag = 0.3;
const bounceVelocity = -10.5;

// minimum and maximum vertical space between each platform
let minPlatformSpace = 10;
let maxPlatformSpace = 10;

// information about each platform. the first platform starts in the
// bottom middle of the screen
let platforms = [{
  x: canvas.width / 2 - platformWidth / 2,
  y: platformStart
}];

// get a random number between the min (inclusive) and max (exclusive)
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// filling the initial screen with platforms and items
let y = platformStart;
while (y > 0) {
  // the next platform can be placed above the previous one with a space
  // somewhere between the min and max space
  y -= platformHeight + random(minPlatformSpace, maxPlatformSpace);

  let x;
  do {
    x = random(25, canvas.width - 25 - platformWidth);
  } while (
    y > canvas.height / 2 &&
    x > canvas.width / 2 - platformWidth * 1.5 &&
    x < canvas.width / 2 + platformWidth / 2
  );

  platforms.push({ x, y });

  // Add items at random positions on the screen
  if (Math.random() < 0.25) {
    items.push({
      x: random(25, canvas.width - 25 - itemSize),
      y: platforms[platforms.length - 1].y - random(itemSize, maxPlatformSpace)
    });
  }

  if (Math.random() < 0.25) {
    starItems.push({
      x: random(25, canvas.width - 25 - itemSize),
      y: platforms[platforms.length - 1].y - random(itemSize, maxPlatformSpace)
    });
  }

  if (Math.random() < 0.25) {
    shieldItems.push({
      x: random(25, canvas.width - 25 - itemSize),
      y: platforms[platforms.length - 1].y - random(itemSize, maxPlatformSpace)
    });
  }
}

// the doodle jumper
const doodle = {
  width: 40,
  height: 60,
  x: canvas.width / 2 - 20,
  y: platformStart - 60,

  // velocity
  dx: 0,
  dy: 0
};

// keep track of player direction and actions
let playerDir = 0;
let lastPlayerDir = 1; // Start direction to the right
let keydown = false;
let prevDoodleY = doodle.y;

// game status
let gameOver = false;
const itemImage = new Image();
itemImage.src = 'Images/ArrowItem.png';
const itemImage1 = new Image();
itemImage1.src = 'Images/star.png';
const shieldImage = new Image();
shieldImage.src = 'Images/shield.png';
shieldImage.onload = function(){
  console.log("Shield image loaded successfully");
}

shieldImage.onerror = function(){
  console.log("Error loading the shield image");
}
canvas.style.transition = 'background-image 0.5s ease-in-out';
// game loop
function loop() {
  if(scoreExact > 40){
    canvas.style.backgroundImage = "url('Images/DoodleBackground.jpg')";
  }else if (scoreExact > 30){
    canvas.style.backgroundImage = "url('Images/3.png')";
  }else if (scoreExact > 10){
    canvas.style.backgroundImage = "url('Images/2.png')";
  }
  var scoreRounded = Math.round(scoreExact);
  context.clearRect(0, 0, canvas.width, canvas.height);
  $("#Score").text("Score: " + scoreRounded);
  // apply gravity to doodle

 // apply gravity to doodle
if (doodle.shield) {
  const remainingTime = Math.max(0, (doodle.shieldEndTime - Date.now()) / 1000);
  console.log("Shield is active. Remaining time:", remainingTime.toFixed(1), "seconds");
  context.fillStyle = '#fff';
  context.font = '16px Arial';
  context.fillText("Shield: " + remainingTime.toFixed(1) + "s", 10, 20);
  $("#Shield").text("Shield active for: "+remainingTime.toFixed(1)+" seconds")
  $("#Shield").show();
  if (Date.now() >= doodle.shieldEndTime) {
    doodle.shield = false;
    $("#Shield").hide();
  }
} 

  doodle.dy += gravity;

  // if doodle reaches the middle of the screen, move the platforms down
  // instead of doodle up to make it look like doodle is going up
  if (doodle.y < canvas.height / 2 && doodle.dy < 0) {
    platforms.forEach(function (platform) {
      platform.y += -doodle.dy;
    });
    items.forEach(function (item) {
      item.y += -doodle.dy;
    });
    starItems.forEach(function (item) {
      item.y += -doodle.dy;
    });
    shieldItems.forEach(function (item) {
      item.y += -doodle.dy;
    });
    scoreExact += 0.01;


    // add more platforms to the top of the screen as doodle moves up
    while (platforms[platforms.length - 1].y > 0) {
      platforms.push({
        x: random(25, canvas.width - 25 - platformWidth),
        y: platforms[platforms.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))
      });

      if (Math.random() < 0.15) {
        items.push({
          x: random(25, canvas.width - 25 - itemSize),
          y: platforms[platforms.length - 1].y - random(itemSize, maxPlatformSpace)
        });
      }
      if (Math.random() < 0.10) {
        starItems.push({
          x: random(25, canvas.width - 25 - itemSize),
          y: platforms[platforms.length - 1].y - random(itemSize, maxPlatformSpace)
        });
     }
     if (Math.random() < 0.03) {
        shieldItems.push({
          x: random(25, canvas.width - 25 - itemSize),
          y: platforms[platforms.length - 1].y - random(itemSize, maxPlatformSpace)
        });
     }
     
      // add a bit to the min/max platform space as the player goes up
      minPlatformSpace += 0.5;
      maxPlatformSpace += 0.5;

      // cap max space
      maxPlatformSpace = Math.min(maxPlatformSpace, canvas.height / 2);
    }
  } else {
    doodle.y += doodle.dy;
  }

  // only apply drag to horizontal movement if key is not pressed
  if (!keydown) {
    if (playerDir < 0) {
      doodle.dx += drag;

      // don't let dx go above 0
      if (doodle.dx > 0) {
        doodle.dx = 0;
        playerDir = 0;
      }
    } else if (playerDir > 0) {
      doodle.dx -= drag;

      if (doodle.dx < 0) {
        doodle.dx = 0;
        playerDir = 0;
      }
    }
  }

  doodle.x += doodle.dx;

  // make doodle wrap the screen
  if (doodle.x + doodle.width < 0) {
    doodle.x = canvas.width;
  } else if (doodle.x > canvas.width) {
    doodle.x = -doodle.width;
  }

  // place plattforms width calculated positions
  function fillRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  // ...

  // draw platforms
  context.fillStyle = '#dc174f';
  platforms.forEach(function (platform) {
    fillRoundedRect(context, platform.x, platform.y, platformWidth, platformHeight, 10);

    // make doodle jump if it collides with a platform from above
    if (
      // doodle is falling
      doodle.dy > 0 &&

      // doodle was previous above the platform
      prevDoodleY + doodle.height <= platform.y &&

      // doodle collides with platform
      // (Axis Aligned Bounding Box [AABB] collision check)
      doodle.x < platform.x + platformWidth &&
      doodle.x + doodle.width > platform.x &&
      doodle.y < platform.y + platformHeight &&
      doodle.y + doodle.height > platform.y
    ) {
      // reset doodle position so it's on top of the platform
      doodle.y = platform.y - doodle.height;
      doodle.dy = bounceVelocity;
    }
  });

  //draw Uplink Items
  items.forEach(function (item) {
    itemType++;
    context.drawImage(itemImage, item.x, item.y, itemSize, itemSize);

    // Check if doodle collides with an item
    if (
      doodle.x < item.x + itemSize &&
      doodle.x + doodle.width > item.x &&
      doodle.y < item.y + itemSize &&
      doodle.y + doodle.height > item.y
    ) {
      // Doodle has collected the item, remove it and increase the score
      const index = items.indexOf(item);
      if (index > -1) {
        items.splice(index, 1);
      }
      if(doodle.dy<0){
        doodle.dy-=10;
      }else{
        doodle.dy-=20;
      }
    }
  });
  
  //draw Star Items
  starItems.forEach(function (item) {
    itemType++;
    context.drawImage(itemImage1, item.x, item.y, itemSize, itemSize);

    // Check if doodle collides with an item
    if (
      doodle.x < item.x + itemSize &&
      doodle.x + doodle.width > item.x &&
      doodle.y < item.y + itemSize &&
      doodle.y + doodle.height > item.y
    ) {
      // Doodle has collected the item, remove it and increase the score
      const index = starItems.indexOf(item);
      if (index > -1) {
        starItems.splice(index, 1);
      }
      scoreExact += 4;
    }
  });

//draw Shield Items
  shieldItems.forEach(function (item) {
    itemType++;
    context.drawImage(shieldImage, item.x, item.y, itemSize, itemSize);
  
    // Check if doodle collides with an item
    if (
      doodle.x < item.x + itemSize &&
      doodle.x + doodle.width > item.x &&
      doodle.y < item.y + itemSize &&
      doodle.y + doodle.height > item.y
    ) {
      // Doodle has collected the shield, remove it and make the doodle invulnerable
      const index = shieldItems.indexOf(item);
      if (index > -1) {
        shieldItems.splice(index, 1);
      }
      doodle.shield = true;
      $("#Shield").show();
      doodle.shieldEndTime = Date.now() + 8000; // Die Dauer des Schilds beträgt 8000 Millisekunden (8 Sekunden)
    }
  });
  
 

  // draw doodle
  const imageRight = new Image();
imageRight.src = 'Images/NinjaJumper.png';
const imageLeft = new Image();
imageLeft.src = 'Images/NinjaJumper-modified.png';

  // wait for the image to load before drawing it

  if (lastPlayerDir >= 0) {
    context.drawImage(imageLeft, doodle.x, doodle.y, doodle.width, doodle.height);
} else {
    context.drawImage(imageRight, doodle.x, doodle.y, doodle.width, doodle.height);
}

//draw Shield Items
shieldItems.forEach(function (item) {
  itemType++;
  context.drawImage(shieldImage, item.x, item.y, itemSize, itemSize);

  // Check if doodle collides with an item
  if (
    doodle.x < item.x + itemSize &&
    doodle.x + doodle.width > item.x &&
    doodle.y < item.y + itemSize &&
    doodle.y + doodle.height > item.y
  ) {
    // Doodle has collected the shield, remove it and make the doodle invulnerable
    const index = shieldItems.indexOf(item);
    if (index > -1) {
      shieldItems.splice(index, 1);
    }
    doodle.shield = true;
    $("#Shield").show();
    setTimeout(function() {
      doodle.shield = false;
      $("#Shield").hide();
    }, 8000); // shield lasts for 8 seconds
  }
});
  prevDoodleY = doodle.y;

  // check if doodle falls off the canvas
  if (doodle.y > canvas.height) {
    if (!doodle.shield) {
      gameOver = true;
    } else {
      // reset the doodle to the top platform
      doodle.y = 300 - doodle.height;
      doodle.dy = bounceVelocity;
      doodle.shield = false;
      $("#Shield").hide();
    }
  }
  
  // remove any platforms that have gone offscreen
  platforms = platforms.filter(function (platform) {
    return platform.y < canvas.height;
  });
  items = items.filter(function (item) {
    return item.y < canvas.height;
  });
  starItems = starItems.filter(function (item) {
    return item.y < canvas.height;
  });

  shieldItems = shieldItems.filter(function (item) {
    return item.y < canvas.height;
  });

  // check if game over
  if (gameOver) {
    insertHighscore();
    resetGame();
    return;
  }
  requestAnimationFrame(loop);

}

//Insert HighScores in MySQL Database
//with ajax-call
function insertHighscore(){
  var finalScore = Math.round(scoreExact);
  $.ajax({
    type:"GET",
    url: "../Backend/servicehandler.php",
    data: {method: "setLeader", param: finalScore},
    success: function(response){
      console.log(response);
      loadLeaderboard();
    },
    error: function(a, b, c){
      console.log(a+"\n"+b+"\n"+c);
    }
  })

}


// reset game
function resetGame() {
  var scoreRounded = Math.round(scoreExact)
  console.log(scoreExact);
  // Draw Game Over text
  var gameOver= document.createElement('h1');
  gameOver.innerHTML = "Game Over!";
  document.body.appendChild(gameOver);
  gameOver.classList.add("GameOver");
  // Add delay before restarting the game
  var button = document.createElement('button');
  button.innerHTML = 'Restart Game';
  button.addEventListener('click', restartGame);

  // Füge dem Button eine CSS-Klasse hinzu
  button.classList.add('resetButton');

  // Append the button to the document body
  document.body.appendChild(button);
  function restartGame() {
    location.reload();
  }
}


// listen to keyboard events to move doodle
document.addEventListener('keydown', function (e) {
  // left arrow key
  if (e.which === 37) {
    keydown = true;
    playerDir = -1;
    lastPlayerDir = playerDir;
    doodle.dx = -3;
  }
  // right arrow key
  else if (e.which === 39) {
    keydown = true;
    playerDir = 1;
    lastPlayerDir = playerDir;
    doodle.dx = 3;
  }
});


document.addEventListener('keyup', function (e) {
  keydown = false;
});

// start the game
function startGame(){
  loop();
  $("#startDoodleJump").hide();
  $("#FullScreenDoodleJump").hide();
  $("#HalfScreenDoodleJump").hide();
}

//set Game Fullscreen
function setFullScreen(){
  canvas.width=800;
  $("#Score").css("width","801px");
  $("#FullScreenDoodleJump").hide();
  $("#HalfScreenDoodleJump").show();
}


//set Game Halfscreen
function setHalfScreen(){
  canvas.width=600;
  $("#Score").css("width","601px");
  $("#FullScreenDoodleJump").show();
  $("#HalfScreenDoodleJump").hide();
}