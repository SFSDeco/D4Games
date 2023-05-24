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

function handleCardClick() {
    window.location.href = "Hilfe.php";
}

function askForDelete(){
    document.getElementById("myFormDelete").style.display = "block";
    $("#myFormDelete").hide();
    $("#myFormDelete").fadeIn(300);
    
}









