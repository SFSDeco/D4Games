<?php session_start(); $_SESSION["game"] = "Minesweeper"?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="./D4Styles.css">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Minesweeper</title>
	<link rel="stylesheet" href="./games/Minesweeper/Minesweeper.css">
</head>
<body>
	<?php include("NavBar.php");?>
	<div class="row">
		<div class="col-sm-3">
			<?php include("LeaderBoards.php");?>
		</div>
		<div id="game" class="col-sm-9 minesweeper">
			<header>
				<h1>Minesweeper</h1>
				<div id="head-menu">
					<div id="mines" class="display">0</div>
					<div id="start" class="start-btn"></div>
					<div id="timer" class="display">0</div>
				</div>
			</header>
			<main></main>
			<select id="difficulty">
				<option value="easy">Easy</option>
				<option value="normal">Normal</option>
				<option value="hard">Hard</option>
			</select>
			<div id="highscore"></div>
		</div>
	</div>
	<script src="./games/Minesweeper/Minesweeper.js"></script>
</body>
</html>