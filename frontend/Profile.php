<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="IndexScript.js"></script>
    <link rel="stylesheet" href="D4Styles.css">
    <title>D4GAMES</title>
    <!--TODO: PHP Implementation! -->
</head>

<body onload="loadProfil()">

    <div calss="row">
        <?php include("NavBar.php"); ?>
    </div>
    <div class="container-fluid">
        <div class="row">
            <h1 class="h1-white">Profile</h1>
            <h3 class="h1-white">You can Change your Profile-Data below</h3>

        </div>
        <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-8 ProfileGrid">
                <div class="row">
                    <div class="col-sm-12">
                        <form class="formstyling leftProfileForm topProfileForm" >
                            <div class="col-sm-12">
                                <label for="username" class="inputLabel">Username:</label><br>
                                <input type="text" name="username" id="username" class="textInput"
                                    placeholder="AngryBear123" required><br>
                                <button type="button" class="btn-green" onclick="alterUsername()">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <form class="formstyling leftProfileForm" >
                            <div class="col-sm-12">
                                <label for="salutation" class="inputLabel">Salutation:</label><br>
                                <select name="salutation" id="salutation">
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Ms">Ms.</option>
                                    <option value="Div">Div.</option>
                                </select><br><br><br>
                                <button type="button" class="btn-green" onclick="alterSalutation()">
                                    Submit
                                </button>
                            </div>
                        </form>

                        <form class="formstyling leftProfileForm" >
                            <div class="col-sm-12">
                                <label for="firstname" class="inputLabel">First Name:</label><br>
                                <input type="text" name="firstname" id="firstname" class="textInput" placeholder="John"
                                    required><br>
                                <button type="button" class="btn-green" onclick="alterFirstname()">
                                    Submit
                                </button>
                            </div>
                        </form>

                        <form class="formstyling leftProfileForm" >
                            <div class="col-sm-12">
                                <label for="email" class="inputLabel">Email:</label><br>
                                <input type="email" name="email" id="email" class="textInput"
                                    placeholder="example@technikum.at" required><br>
                                <button type="button" class="btn-green" onclick="alterEmail()">
                                    Submit
                                </button>
                            </div>

                        </form>

                    </div>


                    <div class="col-sm-6">
                        <form class="formstyling leftProfileForm" >
                            <div class="col-sm-12">
                                <label for="birthDate" class="inputLabel">Birth-Date:</label><br>
                                <input type="date" name="birthDate" id="birthDate" class="textInput"
                                    placeholder="birthDate" required><br>
                                <button type="button" class="btn-green" onclick="alterBirthDate()">
                                    Submit
                                </button>
                            </div>
                        </form>

                        <form class="formstyling leftProfileForm" >
                            <div class="col-sm-12">
                                <label for="lastname" class="inputLabel">Last Name:</label><br>
                                <input type="text" name="lastname" id="lastname" class="textInput" placeholder="Miller"
                                    required><br>
                                <button type="button" class="btn-green" onclick="alterLastname()">
                                    Submit
                                </button>
                            </div>
                        </form>

                        <form class="formstyling leftProfileForm" >
                            <div class="col-sm-12">
                                <label for="password" class="inputLabel">Password:</label><br>
                                <input type="password" name="password" id="password" class="textInput"
                                    placeholder="Password" required>
                                <input type="repeatpassword" name="repeatpassword" id="repeatpassword" class="textInput"
                                    placeholder=" Repeat Password" required><br>
                                <button type="button" class="btn-green" onclick="alterPassword()">
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>
                    
                </div>
                <div class="row" style="display:flex; justify-content: center;">
                <button class="btn-red" style="margin-top:1rem; width:30rem; height:4rem; font-size:2rem; padding:0;" onclick="askForDelete()">Delete Account</button>
                </div>
            </div>
        </div>
        <div class="col-sm-2"></div>
    </div>
    </div>
    <div class="form-popup" id="myFormDelete">
            <form action="index.php" class="form-containerProfile" method="POST">
                <h2 class="h1-white">Do you really want to delete your Account?</h2>
                <input type="submit" class="btn-red" id="loginSub" value="Delete"></input>
                <button type="button"  class="btn-blue" id="loginCan" onclick="closeFormDelete()">Cancel</button>
            </form>
    </div>
    <?php include("footer.php"); ?>
</body>
</html>