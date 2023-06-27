window.onload = function() {
    // Get the canvas and context
    loadLeaderboard();
    var canvas = document.getElementById("canvas"); 
    var context = canvas.getContext("2d");
    
    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
    
    var initialized = false;
    
    // Images
    var images = [];
    var tileimage;
    var slow;
    var double;
    var bolt;
    
    // Image loading global variables
    var loadcount = 0;
    var loadtotal = 0;
    var preloaded = false;
    
    // Load images
    function loadImages(imagefiles) {
        // Initialize variables
        loadcount = 0;
        loadtotal = imagefiles.length;
        preloaded = false;
        
        // Load the images
        var loadedimages = [];
        for (var i=0; i<imagefiles.length; i++) {
            // Create the image object
            var image = new Image();
            
            // Add onload event handler
            image.onload = function () {
                loadcount++;
                if (loadcount == loadtotal) {
                    // Done loading
                    preloaded = true;
                }
            };
            
            // Set the source url of the image
            image.src = imagefiles[i];
            
            // Save to the image array
            loadedimages[i] = image;
        }
        
        // Return an array of images
        return loadedimages;
    }
    
    // Level properties
    var Level = function (columns, rows, tilewidth, tileheight) {
        this.columns = columns;
        this.rows = rows;
        this.tilewidth = tilewidth;
        this.tileheight = tileheight;
        
        // Initialize tiles array
        this.tiles = [];
        for (var i=0; i<this.columns; i++) {
            this.tiles[i] = [];
            for (var j=0; j<this.rows; j++) {
                this.tiles[i][j] = 0;
            }
        }
    };
    
    // Generate a default level with walls
    Level.prototype.generate = function() {
        for (var i=0; i<this.columns; i++) {
            for (var j=0; j<this.rows; j++) {
                if (i == 0 || i == this.columns-1 ||
                    j == 0 || j == this.rows-1) {
                    // Add walls at the edges of the level
                    this.tiles[i][j] = 1;
                } else {
                    // Add tiles in a checkerboard pattern
                    if ((i + j) % 2 == 0) {
                        this.tiles[i][j] = 0;
                    } 
                    else {
                        this.tiles[i][j] = 3;
                    }
                }
            }
        }
    };
    
    
    // Snake
    var Snake = function() {
        this.init(0, 0, 1, 10, 1);
    }
    
    // Direction table: Up, Right, Down, Left
    Snake.prototype.directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    
    // Initialize the snake at a location
    Snake.prototype.init = function(x, y, direction, speed, numsegments) {
        this.x = x;
        this.y = y;
        this.direction = direction; // Up, Right, Down, Left
        this.speed = speed * speedMultiplier; // Multipliziere die Geschwindigkeit mit speedMultiplier
        this.movedelay = 0;
        
        // Reset the segments and add new ones
        this.segments = [];
        this.growsegments = 0;
        for (var i=0; i<numsegments; i++) {
            this.segments.push({x:this.x - i*this.directions[direction][0],
                                y:this.y - i*this.directions[direction][1]});
        }
    }
    
    // Increase the segment count
    Snake.prototype.grow = function() {
        this.growsegments++;
    };
    
    // Check we are allowed to move
    Snake.prototype.tryMove = function(dt) {
        this.movedelay += dt;
        var maxmovedelay = 1 / this.speed;
        if (this.movedelay > maxmovedelay) {
            return true;
        }
        return false;
    };
    
    // Get the position of the next move
    Snake.prototype.nextMove = function() {
        var nextx = this.x + this.directions[this.direction][0];
        var nexty = this.y + this.directions[this.direction][1];
        return {x:nextx, y:nexty};
    }
    
    // Move the snake in the direction
    Snake.prototype.move = function() {
        // Get the next move and modify the position
        var nextmove = this.nextMove();
        this.x = nextmove.x;
        this.y = nextmove.y;
    
        // Get the position of the last segment
        var lastseg = this.segments[this.segments.length-1];
        var growx = lastseg.x;
        var growy = lastseg.y;
    
        // Move segments to the position of the previous segment
        for (var i=this.segments.length-1; i>=1; i--) {
            this.segments[i].x = this.segments[i-1].x;
            this.segments[i].y = this.segments[i-1].y;
        }
        
        // Grow a segment if needed
        if (this.growsegments > 0) {
            this.segments.push({x:growx, y:growy});
            this.growsegments--;
        }
        
        // Move the first segment
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;
        
        // Reset movedelay
        this.movedelay = 0;
    }

    Snake.prototype.slow = function(){
        this.speed /= 2;
    }

    Snake.prototype.bolt = function(){
        this.speed *= 2;
    }

    // Create objects
    var snake = new Snake();
    var level = new Level(30, 20, 32, 32);
    
    // Variables
    var doubleScoreActive = false; 
    var speedMultiplier = 1;
    var difficulty = 2;         //Difficulty
    var score = 0;              // Score
    var highscore = 0;          // Highscore 
    var gameover = true;        // Game is over
    var gameovertime = 1;       // How long we have been game over
    var gameoverdelay = 0.5;    // Waiting time after game over
    
    // Initialize the game
    function init() {
        // Load images
        images = loadImages(["./games/Snake/snake-graphics.png", "./games/Snake/slow.png", "./games/Snake/double.png", "./games/Snake/bolt.png"]);
        tileimage = images[0];
        slow = images[1];
        double = images[2];
        bolt = images[3];

    
        // Add mouse events
        canvas.addEventListener("mousedown", onMouseDown);
        
        // Add keyboard events
        document.addEventListener("keydown", onKeyDown);
        
        // New game
        startItemInterval();
        newGame();
        gameover = true;
    
        // Enter main loop
        main(0);
    }
    
    // Check if we can start a new game
    function tryNewGame() {
        if (gameovertime > gameoverdelay) {
            newGame();
            gameover = false;
        }
    }
    
    function newGame() {
        // Initialize the snake
        snake.init(10, 10, 1, 10, 4);
        
        // Generate the default level
        level.generate();
        
        // Add an apple
        addApple();
        
        // Initialize the score
        score = 0;
        
        // Initialize variables
        gameover = false;
    }
    
    // Add an apple to the level at an empty position
    function addApple() {
        // Loop until we have a valid apple
        var valid = false;
        while (!valid) {
            // Get a random position
            var ax = randRange(0, level.columns-1);
            var ay = randRange(0, level.rows-1);
            
            // Make sure the snake doesn't overlap the new apple
            var overlap = false;
            for (var i=0; i<snake.segments.length; i++) {
                // Get the position of the current snake segment
                var sx = snake.segments[i].x;
                var sy = snake.segments[i].y;
                
                // Check overlap
                if (ax == sx && ay == sy) {
                    overlap = true;
                    break;
                }
            }

            //Check if item is on the tile
            if(level.tiles[ax][ay] == 5 || level.tiles[ax][ay] == 6 || level.tiles[ax][ay] == 7 || level.tiles[ax][ay] == 8 || level.tiles[ax][ay] == 9 || level.tiles[ax][ay] == 10){
                overlap = true;
            }
            
            // Tile must be empty
            if (!overlap && (level.tiles[ax][ay] == 0 || level.tiles[ax][ay] == 3)) {
                // Add an apple at the tile position
                if(level.tiles[ax][ay] == 0){
                    level.tiles[ax][ay] = 2;
                }
                else if(level.tiles[ax][ay] == 3){
                    level.tiles[ax][ay] = 4;
                }
                valid = true;
            }
        }
    }

    function startItemInterval() {
        var itemInterval = Math.floor(Math.random() * 30) + 1;
        setTimeout(addItem, itemInterval * 1000);
    }

    function removeItemAfterDelay(ax, ay, itemValue) {
        setTimeout(function() {
            if (level.tiles[ax][ay] === itemValue) {
                if (itemValue % 2 === 0) {
                    level.tiles[ax][ay] = 3;
                } else {
                    level.tiles[ax][ay] = 0;
                }
            }
        }, 15000);
    }

    function addItem(){
        var item = Math.floor(Math.random() * 3) + 1;
    
        var valid = false;
        while (!valid) {
            // Get a random position
            var ax = randRange(0, level.columns-1);
            var ay = randRange(0, level.rows-1);
            
            // Make sure the snake doesn't overlap the random item
            var overlap = false;
            for (var i=0; i<snake.segments.length; i++) {
                // Get the position of the current snake segment
                var sx = snake.segments[i].x;
                var sy = snake.segments[i].y;
                
                // Check overlap
                if (ax == sx && ay == sy) {
                    overlap = true;
                    break;
                }
            }
            
            // Check if apple is on the tile
            if (level.tiles[ax][ay] == 2 || level.tiles[ax][ay] == 4) {
                overlap = true;
            }
            
            // Tile must be empty
            if (!overlap && (level.tiles[ax][ay] == 0 || level.tiles[ax][ay] == 3)) {
                // Add an item at the tile position
                switch(item){
                    case 1:
                        if(level.tiles[ax][ay] == 0){
                            level.tiles[ax][ay] = 5;
                        }
                        else if(level.tiles[ax][ay] == 3){
                            level.tiles[ax][ay] = 6;
                        }
                        break;
                    case 2:
                        if(level.tiles[ax][ay] == 0){
                            level.tiles[ax][ay] = 7;
                        }
                        else if(level.tiles[ax][ay] == 3){
                            level.tiles[ax][ay] = 8;
                        }
                        break;
                    case 3:
                        if(level.tiles[ax][ay] == 0){
                            level.tiles[ax][ay] = 9;
                        }
                        else if(level.tiles[ax][ay] == 3){
                            level.tiles[ax][ay] = 10;
                        }
                        break;
                    default:
                        break;
                }
                valid = true;
                startItemInterval();

                // Remove item after 15 seconds
                removeItemAfterDelay(ax, ay, level.tiles[ax][ay]);
            }
        }
    }

    //10s points recieved doubled
    function activateDouble(){
        doubleScoreActive = true;
        setTimeout(function() {
            doubleScoreActive = false;
        }, 10000); // Deaktiviert das doppelte Punktesystem nach 10 Sekunden
    }
    
    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);
        
        if (!initialized) {
            // Preloader
            
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw a progress bar
            var loadpercentage = loadcount/loadtotal;
            context.strokeStyle = "#ff8080";
            context.lineWidth=3;
            context.strokeRect(18.5, 0.5 + canvas.height - 51, canvas.width-37, 32);
            context.fillStyle = "#ff8080";
            context.fillRect(18.5, 0.5 + canvas.height - 51, loadpercentage*(canvas.width-37), 32);
            
            // Draw the progress text
            var loadtext = "Loaded " + loadcount + "/" + loadtotal + " images";
            context.fillStyle = "#000000";
            context.font = "16px Verdana";
            context.fillText(loadtext, 18, 0.5 + canvas.height - 63);
            
            if (preloaded) {
                initialized = true;
            }
        } else {
            // Update and render the game
            update(tframe);
            render();
        }
    }
    
    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        
        // Update the fps counter
        updateFps(dt);
        
        if (!gameover) {
            updateGame(dt);
        } else {
            gameovertime += dt;
        }
    }
    
    function updateGame(dt) {
        // Move the snake
        if (snake.tryMove(dt)) {
            // Check snake collisions
            
            // Get the coordinates of the next move
            var nextmove = snake.nextMove();
            var nx = nextmove.x;
            var ny = nextmove.y;
            
            if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) {
                if (level.tiles[nx][ny] == 1) {
                    // Collision with a wall
                    gameover = true;
                }
                
                // Collisions with the snake itself
                for (var i=0; i<snake.segments.length; i++) {
                    var sx = snake.segments[i].x;
                    var sy = snake.segments[i].y;
                    
                    if (nx == sx && ny == sy) {
                        // Found a snake part
                        gameover = true;
                        break;
                    }
                }
                
                if (!gameover) {
                    // The snake is allowed to move

                    // Move the snake
                    snake.move();
                    
                    // Check collision with an apple
                    if (level.tiles[nx][ny] == 2) {
                        // Remove the apple
                        level.tiles[nx][ny] = 0;
                        
                        // Add a new apple
                        addApple();
                        
                        // Grow the snake
                        snake.grow();
                        
                        // Add a point to the score
                        if(doubleScoreActive){
                            score += 2;
                        }else{
                            score++;
                        }
                    }
                    else if(level.tiles[nx][ny] == 4) {
                        // Remove the apple
                        level.tiles[nx][ny] = 3;
                        
                        // Add a new apple
                        addApple();
                        
                        // Grow the snake
                        snake.grow();
                        
                        // Add a point to the score
                        if(doubleScoreActive){
                            score += 2;
                        }else{
                            score++;
                        }

                    }
                    else if(level.tiles[nx][ny] == 5) {
                        //remove item
                        level.tiles[nx][ny] = 0;

                        snake.slow();
                        
                        setTimeout(function() {
                            snake.bolt(); // Double the speed to cancel out the slow effect
                        }, 10000);
                    }
                    else if(level.tiles[nx][ny] == 6) {
                        //remove item
                        level.tiles[nx][ny] = 3;
                        
                        snake.slow();
                        
                        setTimeout(function() {
                            snake.bolt(); // Double the speed to cancel out the slow effect
                        }, 10000);
                    }
                    else if(level.tiles[nx][ny] == 7) {
                        //remove item
                        level.tiles[nx][ny] = 0;
                        
                        activateDouble();
                    }
                    else if(level.tiles[nx][ny] == 8) {
                        //remove item
                        level.tiles[nx][ny] = 3;
                        
                        activateDouble();
                    }
                    else if(level.tiles[nx][ny] == 9) {
                        //remove item
                        level.tiles[nx][ny] = 0;
                        
                        snake.bolt();
                        
                        setTimeout(function() {
                            snake.slow(); // Halve the speed to cancel out the bolt effect
                        }, 10000);
                    }
                    else if(level.tiles[nx][ny] == 10) {
                        //remove item
                        level.tiles[nx][ny] = 3;
                        
                        snake.bolt();
                        
                        setTimeout(function() {
                            snake.slow(); // Halve the speed to cancel out the bolt effect
                        }, 10000);
                    }
                    

                }
            } else {
                // Out of bounds
                gameover = true;
            }
            
            if (gameover) {
                gameovertime = 0;
                // Check if score is higher than highscore
                switch(difficulty){
                    case 1:
                        if (score > highscore) {
                            highscore = score;
                        }
                        break;
                    case 2:
                        score *= 2;
                        if (score > highscore) {
                            highscore = score;
                        }
                        break;
                    case 3: 
                        score *= 3;
                        if (score > highscore) {
                            highscore = score;
                        }
                        break; 
                    case 4:
                        score *= 4;
                        if (score > highscore) {
                            highscore = score;
                        }
                        break;
                    default:
                        break;
                }
                if(score){
                    insertHighscore(score);
                }
            }
        }
    }
    
    function updateFps(dt) {
        if (fpstime > 0.25) {
            // Calculate fps
            fps = Math.round(framecount / fpstime);
            
            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }
        
        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }

    function drawMenu() {
        // Draw background
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        // Draw play button
        context.fillStyle = "#ffffff";
        context.font = "24px Verdana";
        drawCenterText("Play", 0, canvas.height / 2, canvas.width);
    
        // Draw score and highscore
        context.fillStyle = "#ffffff";
        context.font = "16px Verdana";
        context.fillText("Score: " + score, 10, 20);
        context.fillText("Highscore: " + highscore, canvas.width - 150, 20);
    
        // Draw difficulty level options
        switch(difficulty){
            case 1:
                context.fillText("Select difficulty:", 10, canvas.height - 100);
                context.fillText("1 - Easy <--", 10, canvas.height - 80);
                context.fillText("2 - Normal", 10, canvas.height - 60);
                context.fillText("3 - Hard", 10, canvas.height - 40);
                context.fillText("4 - Extreme", 10, canvas.height - 20);
                break;
            case 2:
                context.fillText("Select difficulty:", 10, canvas.height - 100);
                context.fillText("1 - Easy", 10, canvas.height - 80);
                context.fillText("2 - Normal <--", 10, canvas.height - 60);
                context.fillText("3 - Hard", 10, canvas.height - 40);
                context.fillText("4 - Extreme", 10, canvas.height - 20);
                break;
            case 3: 
                context.fillText("Select difficulty:", 10, canvas.height - 100);
                context.fillText("1 - Easy", 10, canvas.height - 80);
                context.fillText("2 - Normal", 10, canvas.height - 60);
                context.fillText("3 - Hard <--", 10, canvas.height - 40);
                context.fillText("4 - Extreme", 10, canvas.height - 20);
                break; 
            case 4:
                context.fillText("Select difficulty:", 10, canvas.height - 100);
                context.fillText("1 - Easy", 10, canvas.height - 80);
                context.fillText("2 - Normal", 10, canvas.height - 60);
                context.fillText("3 - Hard", 10, canvas.height - 40);
                context.fillText("4 - Extreme <--", 10, canvas.height - 20);
                break;
            default:
                break;
        }
    }
    
    // Render the game
    function render() {
        
        drawLevel();
        drawSnake();
            
        // Game over
        if (gameover) {
            drawMenu();
            return;
        }

        // Draw score and highscore
        context.fillStyle = "#ffffff";
        context.font = "16px Verdana";
        context.fillText("Score: " + score, 10, 20);
        context.fillText("Highscore: " + highscore, canvas.width - 150, 20);
    }
    
    // Draw the level tiles
    function drawLevel() {
        for (var i=0; i<level.columns; i++) {
            for (var j=0; j<level.rows; j++) {
                // Get the current tile and location
                var tile = level.tiles[i][j];
                var tilex = i*level.tilewidth;
                var tiley = j*level.tileheight;
                
                // Draw tiles based on their type
                if (tile == 0) {
                    // Empty space
                    context.fillStyle = "#6B8E23";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                } else if (tile == 3) {
                    // Empty Space 2
                    context.fillStyle = "#C0FF3E";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                }
                else if (tile == 1) {
                    // Wall
                    context.fillStyle = "#548B54";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                } else if (tile == 2) {
                    // Apple Dark
                    
                    // Draw apple background
                    context.fillStyle = "#6B8E23";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the apple image
                    var tx = 0;
                    var ty = 3;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(tileimage, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }else if (tile == 4) {
                    // Apple Light
                    
                    // Draw apple background
                    context.fillStyle = "#C0FF3E";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the apple image
                    var tx = 0;
                    var ty = 3;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(tileimage, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }else if (tile == 5) {
                    // Slow Dark
                    
                    // Draw slow background
                    context.fillStyle = "#6B8E23";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the slow image
                    var tx = 0;
                    var ty = 0;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(slow, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }
                else if (tile == 6) {
                    // Slow Light
                    
                    // Draw slow background
                    context.fillStyle = "#C0FF3E";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the slow image
                    var tx = 0;
                    var ty = 0;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(slow, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }else if (tile == 7) {
                    // Double Dark
                    
                    // Draw double background
                    context.fillStyle = "#6B8E23";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the double image
                    var tx = 0;
                    var ty = 0;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(double, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }else if (tile == 8) {
                    // Double Light
                    
                    // Draw double background
                    context.fillStyle = "#C0FF3E";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the double image
                    var tx = 0;
                    var ty = 0;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(double, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }else if (tile == 9) {
                    // Bolt Dark
                    
                    // Draw bolt background
                    context.fillStyle = "#6B8E23";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the bolt image
                    var tx = 0;
                    var ty = 0;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(bolt, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }else if (tile == 10) {
                    // Bolt Light
                    
                    // Draw bolt background
                    context.fillStyle = "#C0FF3E";
                    context.fillRect(tilex, tiley, level.tilewidth, level.tileheight);
                    
                    // Draw the bolt image
                    var tx = 0;
                    var ty = 0;
                    var tilew = 64;
                    var tileh = 64;
                    context.drawImage(bolt, tx*tilew, ty*tileh, tilew, tileh, tilex, tiley, level.tilewidth, level.tileheight);
                }
            }
        }
    }
    
    // Draw the snake
    function drawSnake() {
        // Loop over every snake segment
        for (var i=0; i<snake.segments.length; i++) {
            var segment = snake.segments[i];
            var segx = segment.x;
            var segy = segment.y;
            var tilex = segx*level.tilewidth;
            var tiley = segy*level.tileheight;
            
            // Sprite column and row that gets calculated
            var tx = 0;
            var ty = 0;
            
            if (i == 0) {
                // Head; Determine the correct image
                var nseg = snake.segments[i+1]; // Next segment
                if (segy < nseg.y) {
                    // Up
                    tx = 3; ty = 0;
                } else if (segx > nseg.x) {
                    // Right
                    tx = 4; ty = 0;
                } else if (segy > nseg.y) {
                    // Down
                    tx = 4; ty = 1;
                } else if (segx < nseg.x) {
                    // Left
                    tx = 3; ty = 1;
                }
            } else if (i == snake.segments.length-1) {
                // Tail; Determine the correct image
                var pseg = snake.segments[i-1]; // Prev segment
                if (pseg.y < segy) {
                    // Up
                    tx = 3; ty = 2;
                } else if (pseg.x > segx) {
                    // Right
                    tx = 4; ty = 2;
                } else if (pseg.y > segy) {
                    // Down
                    tx = 4; ty = 3;
                } else if (pseg.x < segx) {
                    // Left
                    tx = 3; ty = 3;
                }
            } else {
                // Body; Determine the correct image
                var pseg = snake.segments[i-1]; // Previous segment
                var nseg = snake.segments[i+1]; // Next segment
                if (pseg.x < segx && nseg.x > segx || nseg.x < segx && pseg.x > segx) {
                    // Horizontal Left-Right
                    tx = 1; ty = 0;
                } else if (pseg.x < segx && nseg.y > segy || nseg.x < segx && pseg.y > segy) {
                    // Angle Left-Down
                    tx = 2; ty = 0;
                } else if (pseg.y < segy && nseg.y > segy || nseg.y < segy && pseg.y > segy) {
                    // Vertical Up-Down
                    tx = 2; ty = 1;
                } else if (pseg.y < segy && nseg.x < segx || nseg.y < segy && pseg.x < segx) {
                    // Angle Top-Left
                    tx = 2; ty = 2;
                } else if (pseg.x > segx && nseg.y < segy || nseg.x > segx && pseg.y < segy) {
                    // Angle Right-Up
                    tx = 0; ty = 1;
                } else if (pseg.y > segy && nseg.x > segx || nseg.y > segy && pseg.x > segx) {
                    // Angle Down-Right
                    tx = 0; ty = 0;
                }
            }
            
            // Draw the image of the snake part
            context.drawImage(tileimage, tx*64, ty*64, 64, 64, tilex, tiley,
                              level.tilewidth, level.tileheight);
        }
    }
    
    // Draw text that is centered
    function drawCenterText(text, x, y, width) {
        var textdim = context.measureText(text);
        context.fillText(text, x + (width-textdim.width)/2, y);
    }
    
    // Get a random int between low and high, inclusive
    function randRange(low, high) {
        return Math.floor(low + Math.random()*(high-low+1));
    }
    
    // Mouse event handlers
    function onMouseDown(e) {
        
        if (gameover) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;

            // Check if the play button was clicked
            // Adjust the coordinates and button.
            // dimensions based on your design
            var buttonWidth = 100;
            var buttonHeight = 40;
            var buttonX = canvas.width / 2 - buttonWidth / 2;
            var buttonY = canvas.height / 2 - buttonHeight / 2;

            if (
                mouseX >= buttonX &&
                mouseX <= buttonX + buttonWidth &&
                mouseY >= buttonY &&
                mouseY <= buttonY + buttonHeight
            ) {
                // Play button clicked, start the game
                startGame(difficulty);
            }
        }
    }

    
    // Keyboard event handler
    function onKeyDown(e) {
        if (gameover) {
            if (e.key === "1") {
                // Key 1 pressed, start the game with difficulty level 1
                difficulty = 1;
            } else if (e.key === "2") {
                // Key 2 pressed, start the game with difficulty level 2
                difficulty = 2;
            } else if (e.key === "3") {
                // Key 3 pressed, start the game with difficulty level 3
                difficulty = 3;
            }
            else if (e.key === "4") {
                // Key 4 pressed, start the game with difficulty level 4
                difficulty = 4;
            }
        } 
        else {
            if (e.keyCode == 37 || e.keyCode == 65) {
                // Left or A
                if (snake.direction != 1)  {
                    snake.direction = 3;
                }
            } else if (e.keyCode == 38 || e.keyCode == 87) {
                // Up or W
                if (snake.direction != 2)  {
                    snake.direction = 0;
                }
            } else if (e.keyCode == 39 || e.keyCode == 68) {
                // Right or D
                if (snake.direction != 3)  {
                    snake.direction = 1;
                }
            } else if (e.keyCode == 40 || e.keyCode == 83) {
                // Down or S
                if (snake.direction != 0)  {
                    snake.direction = 2;
                }
            }
        }
    }

    function startGame(difficulty) {
        // Set gameover to false
        gameover = false;
    
        // Handle difficulty selection
        switch (difficulty) {
            case 1:
                speedMultiplier = 0.75; // Setze speedMultiplier auf 0.75 für Schwierigkeit 1
                break;
            case 2:
                speedMultiplier = 1; // Setze speedMultiplier auf 1 für Schwierigkeit 2
                break;
            case 3:
                speedMultiplier = 2; // Setze speedMultiplier auf 2 für Schwierigkeit 3
                break;
            case 4:
                speedMultiplier = 3; // Setze speedMultiplier auf 3 für Schwierigkeit 4
                break;
            default:
                // Handle invalid difficulty
                break;
        }
        newGame();
    }
    
    // Call init to start the game
    init();
};

function insertHighscore(score){
  var finalScore = score;
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