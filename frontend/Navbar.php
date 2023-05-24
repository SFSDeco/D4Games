<nav class="navbar navbar-expand-custom navbar-mainbg fixed-top">
        <a class="navbar-brand navbar-logo" href="index.php">D4GAMES</a>
        <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars text-white"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <div class="hori-selector"><div class="left"></div><div class="right"></div></div>
                <li class="nav-item ">
                    <a class="nav-link" href="index.php"><i class="fas fa-tachometer-alt"></i>Home</a>
                </li>

				<?php
				if(isset($_SESSION["Loggedin"])){
					if($_SESSION["Loggedin"]==true){
						echo'<li class="nav-item">
						<a class="nav-link" href="Profile.php"><i class="fas fa-tachometer-alt"></i>Profile</a>
					</li>';
					}else{
						echo'<li class="nav-item" id="SignUpItem">
						<a class="nav-link" href="SignUp.php"><i class="fas fa-tachometer-alt"></i>Sign Up</a>
					</li>';
					}
				}
				?>
                <li class="nav-item">
                    <a class="nav-link" href="Scores.php"><i class="fas fa-tachometer-alt"></i>Scores</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="impressum.php"><i class="fas fa-tachometer-alt"></i>Imprint</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="Hilfe.php"><i class="fas fa-tachometer-alt"></i>Help</a>
                </li>
            </ul>
        </div>
    </nav>


    <script>// ---------Responsive-navbar-active-animation-----------
// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); },);
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 200);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});

 $(window).on('load',function () {
     var current = location.pathname;
     console.log(current);
	 console.log("TEST");
     $('#navbarSupportedContent ul li a').each(function(){
         var $this = $(this);
         // if the current path is like this link, make it active
         if($this.attr('href').indexOf(current) !== -1){
             $this.parent().addClass('active');
             $this.parents('.menu-submenu').addClass('show-dropdown');
             $this.parents('.menu-submenu').parent().addClass('active');
         }else{
         }
     })
 });

</script>
    
