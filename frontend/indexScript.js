$(document).ready(function () {
    $("#UserMenu").hide();
    var navbarHeight = $('.navbar-mainbg').outerHeight();
  $('body').css('padding-top', navbarHeight + 'px');
    $.ajax({
        url: 'LoginResponse.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          var Loggedin = response.Loggedin;
          console.log(Loggedin);
          if (Loggedin === true) {
              console.log(Loggedin);
              $("#UserMenu").show(300);
          }
        }
      });
});

function loginUser(){
    console.log("Clicked!");
    var userData = [];
    userData[0] = $("#username").val();
    userData[1] = $("#psw").val(); 
    $.ajax({
        type: 'GET',
        url: "../Backend/servicehandler.php",
        data: { method: "loginUser", param: userData},
        success: function (response){
            console.log(response);
            window.location.replace("index.php")
        },
        error: function(){
            console.log("LoginError");
        }
    })
};

function openForm() {
    document.getElementById("myForm").style.display = "block";
    $("#myForm").hide();
    $("#myForm").fadeIn(300);
}
function closeForm() {
    $("#myForm").fadeOut(300);
}
function closeFormDelete() {
    $("#myFormDelete").fadeOut(300);
}
function submitForm(){

}

function handleCardClick(gameName) {
    switch(gameName){
        case 'Pong':
            window.location.href = "Pong.php";
            break;
        case 'Snake':
            window.location.href = "Snake.php";
            break;
        case 'StickHero':
            window.location.href = "StickHero.php";
            break;
        case 'Solitaire':
            window.location.href = "Solitaire.php";
            break;
        case 'Minesweeper':
            window.location.href = "Minesweeper.php";
            break;
        case 'Moodle Jump':
            window.location.href = "DoodleJump.php";
            break;
        case 'TicTacToe':
            window.location.href = "demon.php";
            break;
        case 'Chess':
            window.location.href = "chess.php";
            break;
        default: 
        console.log("Wrong gameName");
        break;
    }
    
}

function askForDelete(){
    document.getElementById("myFormDelete").style.display = "block";
    $("#myFormDelete").hide();
    $("#myFormDelete").fadeIn(300);
    
}
function signUp(){
    let salutation = $("#salutation").val();
    let email = $("#email").val();
    let birthDate = $("#birthDate").val();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let passwordRep = $("#passwordRepeat").val();
    console.log(birthDate);

    if(password==passwordRep){
        let sendData = [salutation,email,birthDate,firstname,lastname,username,password]

        $.ajax({
            type:"GET",
            url: "../Backend/servicehandler.php",
            data: {method: "submitPlayer", param: sendData},
            //dataType: "json",
            success: function(result){
                console.log(result)

            },
            error: function(a, b ,c){
                console.log("signUpError\n"+a+"\n"+b+"\n"+c);
            } 
        })
    }

    
    
}

function loadLeaderboard(){
    console.log("Entered");
    let leaderBoard = $("#LeaderBoards");
    leaderBoard.empty();
    $.ajax({
        type:"GET",
        url: "../Backend/servicehandler.php",
        data: {method: "getLeaders"},
        //dataType: "json",
        success: function(response){
            console.log(response);
            let leaders = [];
            let leaderItem;
            leaderItem = "<div><h1 class='h1-white' style='background-color:#3a2e43; margin-bottom:0; text-align:center;'>Scoreboard</h1><div>";
            leaders.push(leaderItem);
            $.each(response, function(i, v){
                if(i%2){
                    leaderItem = "<div class='lightRow'><p class='centeredInfo-white'>" + v.user + " Score:" + v.score + "</p></div>";
                }else{
                    leaderItem = "<div class='darkRow'><p class='centeredInfo-white'>" + v.user + " Score:" + v.score + "</p></div>";
                }
                leaders.push(leaderItem);
            })
            let strLead = leaders.join("\n");
            leaderBoard.append(strLead);
        },
        error: function(a, b, c){
            console.log(a+"\n"+b+"\n"+c);
        }
    })
}
function loadProfil(){
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "searchPlayer"},
        dataType: "json",
        success: function(response){
            console.log(response[0]["salutation"]);
            $("#username").val(response[0]["username"]);
            $("#email").val(response[0]["email"]);
            $("#salutation").val(response[0]["salutation"]);
            $("#lastname").val(response[0]["lastname"]);
            $("#firstname").val(response[0]["firstname"]);
            $("#birthDate").val(response[0]["birthDate"]);
        },
        error: function(){
            console.log("errorProfile");
        }

    })
    
}

function alterFirstname(){
    let firstname = $("#firstname").val();
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "alterFirstname",param: firstname},
        dataType: "json",
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log("alterError");
        }
    })
}

function alterLastname(){
    let lastname = $("#lastname").val();
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "alterLastname",param: lastname},
        success: function(response){
            console.log(response);
        },
        error: function(a,b,c){
            console.log("alterError"+"\n"+a+"\n"+b+"\n"+c);
        }
    })
}

function alterUsername(){
    let username = $("#username").val();
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "alterUsername",param: username},
        dataType: "json",
        success: function(response){
            console.log(response);
        },
        error: function(a,b,c){
            console.log("alterError"+"\n"+a+"\n"+b+"\n"+c);
        }
    })
}

function alterEmail(){
    let email = $("#email").val();
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "alterEmail",param: email},
        dataType: "json",
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log("alterError");
        }
    })
}

function alterBirthDate(){
    let birthDate = $("#birthDate").val();
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "alterBirthDate",param: birthDate},
        dataType: "json",
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log("alterError");
        }
    })
}

function alterSalutation(){
    let salutation = $("#salutation").val();
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "alterSalutation",param: salutation},
        dataType: "json",
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log("alterError");
        }
    })
}

function alterPassword(){
    let password = $("#password").val();
    let passwordRep = $("#repeatpassword").val();
    if(password==passwordRep){
         $.ajax({
            type: "GET",
            url: "../Backend/servicehandler.php",
            data: {method: "alterPassword",param: password},
            dataType: "json",
            success: function(response){
                console.log(response);
            },
            error: function(){
                console.log("alterError");
            }
        })
    }
   
}

function logoutUser(){
    $.ajax({
        type: "GET",
        url: "../Backend/servicehandler.php",
        data: {method: "Logout"},
        success: function(response){
            console.log(response);
            window.location.replace("index.php");
        },
        error: function(a, b, c){
            console.log(a+"\n"+b+"\n"+c);
        }
    })
}






