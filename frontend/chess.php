<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Chess</title>
        <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="IndexScript.js"></script>
    <link rel="stylesheet" href="D4Styles.css">

    </head>
    <link rel="stylesheet" href="./games/chess/chess.css">
<body>
    <?php include("NavBar.php");
    include("VerticalMenu.php");?>
<div class="container">
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4" >
            <div id="board"></div>
            <p id="info-display" style="color:white">Turn of <span id="turn"></span></p>
            <div>
                <button type="button" id="O-O">Castle Short</button>
                <button type="button" id="O-O-O">Castle Long</button>
                <button type='button' id='queenBtn'>Queen</button>
                <button type='button' id='rookBtn'>Rook</button>
                <button type='button' id='bishopBtn'>Bishop</button>
                <button type='button' id='knightBtn'>Knight</button>
            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>
</div>
<script src="./games/chess/chess.js" type="module"> </script>
</body>
</html>