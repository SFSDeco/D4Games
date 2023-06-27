<!DOCTYPE html>
<html lang="EN">

<head>
    <title>solitaire</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
    <link rel="stylesheet" href="./games/Kartenspiel/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    
    <link rel="stylesheet" href="D4Styles.css">
</head>

<body>
    <?php include("NavBar.php"); ?>
    
    <!--<div class="container" style="position:absolute; top:100px; margin-left:auto; margin-right:auto;">-->

        <canvas width="1000" height="600"></canvas>
        <script src="./games/Kartenspiel/shell.script.js" type="module"></script>
        
        <div class="row-auto">
            <div class="col-4">Solitaire</div>
            <div class="col-4">Time:</div>
            <div class="col-4"id="timerdiv">00:00</div>
        </div>
    <!--</div>-->
    <script src="./games/Kartenspiel/timer.js"></script>
</body>
</html>