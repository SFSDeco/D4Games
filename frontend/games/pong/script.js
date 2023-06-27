import Ball from './Ball.js';
import Board from './Board.js';
//Update Loop (Updating the positions)

const ball = new Ball(document.getElementById("ball"))
const playerBoard = new Board(document.getElementById("player-board"))
const botBoard = new Board(document.getElementById("bot-board"))
const playerScoreElement = document.getElementById("player-score")
const container = document.getElementById("container")
const navDiv = $('#NavBar');
const leaderRow = $('#leaderBoardRow');

navDiv.hide();
leaderRow.hide();

let totalScore = 0;
let gameOver = false
let lastTime
let itemElement;
let imageElement;
let itemField;
let scoreMultiplier = 1;

function createGrid() {
  const gridElement = document.querySelector('.grid');
  const gridSize = 15;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const field = document.createElement('div');
      field.classList.add('field');
      field.setAttribute('field-id', (i * gridSize) + (j + 1));
      gridElement.appendChild(field);
    }
  }
}

createGrid();

function generateRandomNumber() {
  return Math.floor(Math.random() * 3);
}
function generateRandomFieldNumber() {
  return Math.floor(Math.random() * 200);
}


function update(time){
    if(lastTime != null && !gameOver){
        const delta = time - lastTime

        if (!itemElement) {
            /*itemElement = document.createElement('div');
            itemElement.classList.add('item');
            var x =Math.random() * (parseInt(window.innerWidth) - parseInt(itemElement.offsetWidth)) + 'px';
            var y =Math.random() * (parseInt(window.innerHeight) - parseInt(itemElement.offsetHeight)) + 'px';
            console.log('X: ' +x + ';Y: ' + y);
            itemElement.style.left = Math.random() * (window.innerWidth - itemElement.offsetWidth) + 'px';
            itemElement.style.top = Math.random() * (window.innerHeight - itemElement.offsetHeight) + 'px';
            container.appendChild(itemElement);
      
            imageElement = document.createElement('img');
            imageElement.src = '/img/itemStrech.png';
            imageElement.width = 50;
            imageElement.height = 50;
            itemElement.appendChild(imageElement);*/
            var itemFields = document.querySelectorAll('.field');
            var randomNumber = generateRandomNumber();
            var randomFieldNumber = generateRandomFieldNumber();
            switch(randomNumber){
              case(0):
                var fieldToInsert = itemFields[randomFieldNumber];

                itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.setAttribute('item-id', 'extend');
                var x =Math.random() * (parseInt(window.innerWidth) - parseInt(itemElement.offsetWidth)) + 'px';
                var y =Math.random() * (parseInt(window.innerHeight) - parseInt(itemElement.offsetHeight)) + 'px';
                console.log("Spawning Stretch");
                itemElement.style.left = Math.random() * (window.innerWidth - itemElement.offsetWidth) + 'px';
                itemElement.style.top = Math.random() * (window.innerHeight - itemElement.offsetHeight) + 'px';
                fieldToInsert.appendChild(itemElement);
          
                imageElement = document.createElement('img');
                imageElement.src = './games/pong/img/itemStrech.png';
                imageElement.width = 50;
                imageElement.height = 50;
                itemElement.appendChild(imageElement);
                itemField = fieldToInsert;
                break;
              case(1):
                var fieldToInsert = itemFields[randomFieldNumber];

                itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.setAttribute('item-id', 'doublePoints');
                var x =Math.random() * (parseInt(window.innerWidth) - parseInt(itemElement.offsetWidth)) + 'px';
                var y =Math.random() * (parseInt(window.innerHeight) - parseInt(itemElement.offsetHeight)) + 'px';
                console.log("Spawning 2x");
                itemElement.style.left = Math.random() * (window.innerWidth - itemElement.offsetWidth) + 'px';
                itemElement.style.top = Math.random() * (window.innerHeight - itemElement.offsetHeight) + 'px';
                fieldToInsert.appendChild(itemElement);
          
                imageElement = document.createElement('img');
                imageElement.src = './games/pong/img/itemDoublePoints.png';
                imageElement.width = 50;
                imageElement.height = 50;
                itemElement.appendChild(imageElement);
                itemField = fieldToInsert;
                break;
              case(2):
                
              var fieldToInsert = itemFields[randomFieldNumber];

              itemElement = document.createElement('div');
              itemElement.classList.add('item');
              itemElement.setAttribute('item-id', 'triplePoints');
              var x =Math.random() * (parseInt(window.innerWidth) - parseInt(itemElement.offsetWidth)) + 'px';
              var y =Math.random() * (parseInt(window.innerHeight) - parseInt(itemElement.offsetHeight)) + 'px';
              console.log("Spawning 3x");
              itemElement.style.left = Math.random() * (window.innerWidth - itemElement.offsetWidth) + 'px';
              itemElement.style.top = Math.random() * (window.innerHeight - itemElement.offsetHeight) + 'px';
              fieldToInsert.appendChild(itemElement);
        
              imageElement = document.createElement('img');
              imageElement.src = './games/pong/img/itemTrippleP.png';
              imageElement.width = 50;
              imageElement.height = 50;
              itemElement.appendChild(imageElement);
              itemField = fieldToInsert;
              break;
              case(3):
                var fieldToInsert = itemFields[randomFieldNumber];

                itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.setAttribute('item-id', 'fivetimes');
                var x =Math.random() * (parseInt(window.innerWidth) - parseInt(itemElement.offsetWidth)) + 'px';
                var y =Math.random() * (parseInt(window.innerHeight) - parseInt(itemElement.offsetHeight)) + 'px';
                console.log("Spawning 5x");
                itemElement.style.left = Math.random() * (window.innerWidth - itemElement.offsetWidth) + 'px';
                itemElement.style.top = Math.random() * (window.innerHeight - itemElement.offsetHeight) + 'px';
                fieldToInsert.appendChild(itemElement);
          
                imageElement = document.createElement('img');
                imageElement.src = './games/pong/img/itemFiveP.png';
                imageElement.width = 50;
                imageElement.height = 50;
                itemElement.appendChild(imageElement);
                itemField = fieldToInsert;
                break;


              
            }
            
            console.log("Spawned item!");
          }


        //actual update code / movement in game are based on delta
        ball.update(delta, [playerBoard.rect(), botBoard.rect()])
        botBoard.update(delta, ball.y)

        if (checkBallItemCollision(ball, itemElement)) {
            // Aktiviere die Effekte des Items
            handleItemEffect(itemElement);
          }

        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
            )

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if (gotScoredOn()) handleLose()
    }

   lastTime = time
    //calls the update function as soon as an animation can be displayed
    if(!gameOver) window.requestAnimationFrame(update);

}

function gotScoredOn(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1*scoreMultiplier;
        scoreMultiplier = 1;
        totalScore = parseInt(playerScoreElement.textContent) + 1*scoreMultiplier;
    }else{
        gameOver = true
    }
    ball.reset()
    playerBoard.reset()
    botBoard.reset()

    if(gameOver){
      // Entferne das Item-Element, falls vorhanden
      if (itemElement) {
        itemField.removeChild(itemElement);
        itemElement = null;
      }
      navDiv.show();
      leaderRow.show();
      // create and show the score and retry elements
      const scoreElement = document.createElement("div");
      scoreElement.textContent = `Your Score: ${playerScoreElement.textContent}`;
      scoreElement.classList.add("score");
      scoreElement.classList.add("center");


      const retryButton = document.createElement("button");
      retryButton.type = "button";
      retryButton.textContent = "Retry";
      retryButton.classList.add("RetryButton")

      container.appendChild(scoreElement);
      container.appendChild(retryButton);
      if(totalScore){
        insertHighscore(totalScore);
      }

      // add event listener to retry button
      retryButton.addEventListener("click", () => {
        container.removeChild(scoreElement);
        container.removeChild(retryButton);
        totalScore = 0;
        playerScoreElement.textContent = "0";
        gameOver = false

        itemElement = null; // Zurücksetzen des Items
        navDiv.hide();
        leaderRow.hide();
        ball.reset()
        playerBoard.reset()
        botBoard.reset()
        window.requestAnimationFrame(update)
      });
}
}

  

document.addEventListener("mousemove", e => {
    playerBoard.position = e.y / window.innerHeight * 100 //to convert px into %
})


function checkBallItemCollision(ball, item) {
    const ballRect = ball.rect();
    const itemRect = itemElement.getBoundingClientRect();
  
    if (
      ballRect.left < itemRect.right &&
      ballRect.right > itemRect.left &&
      ballRect.top < itemRect.bottom &&
      ballRect.bottom > itemRect.top
    ) {
      return true; // Kollision erkannt
    }
  
    return false; // Keine Kollision
  }

  function handleItemEffect(item) {
    // Führe die entsprechenden Effekte des Items aus
    // Hier ein Beispiel für das Verlängern des Boards
    let itemID = itemElement.getAttribute('item-id')

    switch(itemID){
      case("extend"): playerBoard.extendBoard(); break;
      case("shrink"): playerBoard.shrinkBoard(); break;
      case("doublePoints"): scoreMultiplier = scoreMultiplier * 2; break;
      case("triplePoints"): scoreMultiplier = scoreMultiplier * 3; break;
      case("fivetimes"): scoreMultiplier = scoreMultiplier * 5; break;
    }
    // Entferne das Item aus der Spielfläche
    itemField.removeChild(itemElement);
    itemElement = null;
  }

//alternativ to setIntervall(,)
window.requestAnimationFrame(update)

//TODO1: Layout
//TODO2: Random Field Selection
//TODO3: Random? Item Generation
//TODO4: Generate new Items

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

