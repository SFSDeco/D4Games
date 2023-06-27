const board = document.querySelector('main');
const display_mines = document.getElementById('mines');
const display_start = document.getElementById('start');
const display_timer = document.getElementById('timer');
const display_highscore = document.getElementById('highscore');
document.getElementById('difficulty').addEventListener('change', changeDifficulty);




const code_bomb = '&#x1f4a3';
const code_flag = '&#128681';
const code_start = '&#128522';
const code_win = '&#128526';
const code_lost = '&#128565';


let height = 9;
let width = 9;
let flag_number = 10;
let mine_number = 10;
let mineMap = [];
let game_over = true;

let highscore_E = 0;
let highscore_N = 0;
let highscore_H = 0;


let timerInterval = null;
let secondsPassed = 0;


createView();


function changeDifficulty(e) {
    let difficulty = e.target.value;
    switch (difficulty) {
        case 'easy':
            height = 9;
            width = 9;
            mine_number = 10;
            flag_number = 10;
            break;
        case 'normal':
            height = 16;
            width = 16;
            mine_number = 40;
            flag_number = 40;
            break;
        case 'hard':
            height = 16;
            width = 30;
            mine_number = 99;
            flag_number = 99;
            break;
    }
}
display_start.addEventListener('click', createView);


function createView(){
    board.innerHTML = '';
    secondsPassed = 0;
    flag_number = mine_number;
    display_mines.innerHTML = flag_number;
    display_start.innerHTML = code_start;
    display_timer.innerHTML = secondsPassed;
    for (let x = 0; x < width; x++) {
        let col_div = document.createElement('div');
        col_div.setAttribute('class', 'col');
        for (let y = 0; y < height; y++) {
            let field = document.createElement('div');
            field.setAttribute('class', 'field available');
            field.setAttribute('id', x+'_'+y);
            field.addEventListener('click', clickField);
            field.addEventListener('contextmenu', flagField);
            col_div.append(field);
        }
        board.append(col_div);
    }

    displayHighscore();
}

function createMap(click_x, click_y) {
    // Reset secondsPassed and start timer
    secondsPassed = 0;
    timerInterval = setInterval(function() {
        secondsPassed++;
        display_timer.innerHTML = secondsPassed;
    }, 1000);

    //Build MapArray
    for (let x = 0; x < width; x++) {
        mineMap[x] = [];
        for (let y = 0; y < height; y++) {
            mineMap[x][y] = 0;
        }
    }
    //Set Random Mines
    for (let mine = 0; mine < mine_number; mine++) {
        mine_y = click_y; //TODO
        mine_x = click_x;
        while (mineMap[mine_x][mine_y] == 'M' || (mine_x == click_x && mine_y == click_y)) {
            mine_x = Math.floor(Math.random() * width);
            mine_y = Math.floor(Math.random() * height);
        }
        mineMap[mine_x][mine_y] = 'M';

        //Set Numbers around Mine
        for (let x = mine_x - 1; x <= mine_x + 1; x++) {
            for (let y = mine_y - 1; y <= mine_y + 1; y++) {
                if (x >= 0 && y >= 0 && x < width && y < height) {
                    if (mineMap[x][y] != 'M') {
                        mineMap[x][y]++;
                    }
                }
            }
        }
    }

    game_over = false;
    showField(click_x, click_y);
}

function clickField(e) {
    let id = e.target.id
    let x = Number(id.split('_')[0]);
    let y = Number(id.split('_')[1]);

    if (game_over) {
        createMap(x, y);
    }
    else {
        showField(x, y);
    }
}

function showField(cord_x, cord_y) {
    field = document.getElementById(cord_x+'_'+cord_y);

    if (field.classList.contains('available')) {
        field.classList.remove('available');
        
        if (mineMap[cord_x][cord_y] == 'M') {
            field.innerHTML = code_bomb;
            lostGame();
        }
        else if (mineMap[cord_x][cord_y] == 0) {
            //field.innerHTML = '';
            for (let x = cord_x - 1; x <= cord_x + 1; x++) {
                for (let y = cord_y - 1; y <= cord_y + 1; y++) {
                    if (x >= 0 && y >= 0 && x < width && y < height) {
                        if (!(y == cord_y && x == cord_x)) {
                            showField(x, y)
                        }
                    }
                }
            }
        }
        else {
            field.innerHTML = mineMap[cord_x][cord_y];
            checkWin();
        }
    }
}

function flagField(e) {
    e.preventDefault();
    let field = e.target;
    if (field.classList.contains('available')) {
        if (!field.classList.contains('flag')) {
            field.classList.add('flag');
            field.innerHTML = code_flag;
            field.removeEventListener('click', clickField);
            flag_number--;
        }
        else {
            field.classList.remove('flag');
            field.innerHTML = '';
            field.addEventListener('click', clickField);
            flag_number++;
        }
    }
    display_mines.innerHTML = flag_number;
}

function displayHighscore() {
    let difficulty = document.getElementById('difficulty').value;
    switch (difficulty) {
        case 'easy':
            display_highscore.innerHTML = "Highscore Easy: " + highscore_E + " seconds";
            break;
        case 'normal':
            display_highscore.innerHTML = "Highscore Normal: " + highscore_N + " seconds";
            break;
        case 'hard':
            display_highscore.innerHTML = "Highscore Hard: " + highscore_H + " seconds";
            break;
    }
}
 

function lostGame() {
    display_start.innerHTML = code_lost;
    game_over = true;
    clearInterval(timerInterval); // Stop the timer

    // Reveal all mines
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (mineMap[x][y] == 'M') {
                let field = document.getElementById(x + '_' + y);
                field.innerHTML = code_bomb;
                field.classList.remove('available');
            }
        }
    }

    let fields = document.querySelectorAll('.field');
    for (let field of fields) {
        field.removeEventListener('click', clickField);
    }
}

function checkWin() {
    let open_field = document.querySelectorAll('.available');
    if (open_field.length == mine_number) {
        let final_score;
        display_start.innerHTML = code_win;
        game_over = true;
        clearInterval(timerInterval); // Stop the timer
        let difficulty = document.getElementById('difficulty').value;
        switch (difficulty) {
            case 'easy':
                if (highscore_E === 0 || secondsPassed < highscore_E) {
                    highscore_E = secondsPassed;
                    final_score = calcScoreAlg(secondsPassed, 1);
                    insertHighscore(final_score);
                    displayHighscore(); // Call the function to update the displayed highscore
                }
                break;
            case 'normal':
                if (highscore_N === 0 || secondsPassed < highscore_N) {
                    highscore_N = secondsPassed;
                    final_score = calcScoreAlg(secondsPassed, 3);
                    insertHighscore(final_score);
                    displayHighscore(); // Call the function to update the displayed highscore
                }
                break;
            case 'hard':
                if (highscore_H === 0 || secondsPassed < highscore_H) {
                    highscore_H = secondsPassed;
                    final_score = calcScoreAlg(secondsPassed, 6);
                    insertHighscore(final_score);
                    displayHighscore(); // Call the function to update the displayed highscore
                }
                break;
        }
    }
}


function calcScoreAlg(time, difficultyMultiplier){
    let score = parseInt(1000/(time*0.1)*difficultyMultiplier);
    return score;
}

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