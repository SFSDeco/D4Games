import Piece from "./pieces.js";
import Field from "./field.js";


/* TODO: put all possible Valid moves of the current turn into an array with the format {type:piece.type, destination_rank: rank, destination_file: file}
They are only valid if the move does not result in the King being in check. If the size of the Array is 0, GameOver*/

let currturn = 0;
let check = false;
let legalMoves = [];
const casteLongBtn = document.getElementById('O-O-O');
const castleShortBtn = document.getElementById('O-O');
const black = "black";
const white = "white";
const empty = null;
const king = "<div class='piece' id='king'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M224 0c17.7 0 32 14.3 32 32V48h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H256v48H408c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400H80L3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40H192V112H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V32c0-17.7 14.3-32 32-32zM38.6 473.4L80 432H368l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H54.6C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z\"/></svg></div>";
const queen = "<div class='piece' id='queen'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z\"/></svg></div>";
const rook = "<div class='piece' id='rook'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z\"/></svg></div>";
const bishop = "<div class='piece' id='bishop'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z\"/></svg></div>";
const knight = "<div class='piece' id='knight'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z\"/></svg></div>";
const pawn = "<div class='piece' id='pawn'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d=\"M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400H240L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H281.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432H64L22.6 473.4z\"/></svg></div>";

const chessBoard = [
    new Field(8, "a", new Piece("R", black, rook)), new Field(8, "b", new Piece("N", black, knight)), new Field(8, "c", new Piece("B", black, bishop)), new Field(8, "d", new Piece("Q", black, queen)), new Field(8, "e", new Piece("K", black, king)), new Field(8, "f", new Piece("B", black, bishop)), new Field(8, "g", new Piece("N", black, knight)), new Field(8, "h", new Piece("R", black, rook)),
    new Field(7, "a", new Piece("p", black, pawn)), new Field(7, "b", new Piece("p", black, pawn)), new Field(7, "c", new Piece("p", black, pawn)), new Field(7, "d", new Piece("p", black, pawn)), new Field(7, "e", new Piece("p", black, pawn)), new Field(7, "f", new Piece("p", black, pawn)), new Field(7, "g", new Piece("p", black, pawn)), new Field(7, "h", new Piece("p", black, pawn)),
    new Field(6, "a", empty), new Field(6, "b", empty), new Field(6, "c", empty), new Field(6, "d", empty), new Field(6, "e", empty), new Field(6, "f", empty), new Field(6, "g", empty), new Field(6, "h", empty),
    new Field(5, "a", empty), new Field(5, "b", empty), new Field(5, "c", empty), new Field(5, "d", empty), new Field(5, "e", empty), new Field(5, "f", empty), new Field(5, "g", empty), new Field(5, "h", empty),
    new Field(4, "a", empty), new Field(4, "b", empty), new Field(4, "c", empty), new Field(4, "d", empty), new Field(4, "e", empty), new Field(4, "f", empty), new Field(4, "g", empty), new Field(4, "h", empty),
    new Field(3, "a", empty), new Field(3, "b", empty), new Field(3, "c", empty), new Field(3, "d", empty), new Field(3, "e", empty), new Field(3, "f", empty), new Field(3, "g", empty), new Field(3, "h", empty),
    new Field(2, "a", new Piece("p", white, pawn)), new Field(2, "b", new Piece("p", white, pawn)), new Field(2, "c", new Piece("p", white, pawn)), new Field(2, "d", new Piece("p", white, pawn)), new Field(2, "e", new Piece("p", white, pawn)), new Field(2, "f", new Piece("p", white, pawn)), new Field(2, "g", new Piece("p", white, pawn)), new Field(2, "h", new Piece("p", white, pawn)),
    new Field(1, "a", new Piece("R", white, rook)), new Field(1, "b", new Piece("N", white, knight)), new Field(1, "c", new Piece("B", white, bishop)), new Field(1, "d", new Piece("Q", white, queen)), new Field(1, "e", new Piece("K", white, king)), new Field(1, "f", new Piece("B", white, bishop)), new Field(1, "g", new Piece("N", white, knight)), new Field(1, "h", new Piece("R", white, rook))
];

/*chessBoard.forEach((chessField, i) => {
    console.log(chessField.isEmpty());
});*/


const board = document.querySelector("#board");
const turn = document.querySelector("#turn");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
var posKingBlack = {rank:8, file:"e"};
var posKingWhite = {rank:1, file:"e"};

//gameSetup initializes game, evalPos generates Sight for pieces
gameSetup();
evalPos();
//evalLegal generates array of Legal Moves, evaluates potential sight with checkSight which calls evalPos!
evalLegal();
//call evalPos again to reset sight after checking legality
evalPos();

//uncomment below code to test legalMoves
//console.log(legalMoves);

function gameSetup(){
    $("#queenBtn").hide();
    $("#bishopBtn").hide();
    $("#rookBtn").hide();
    $("#knightBtn").hide();
    chessBoard.forEach((chessField, i) => {
        const field = document.createElement('div');
        field.classList.add('square');
        if(chessField.piece != null){
            field.innerHTML = chessField.piece.html;
            field.firstChild?.setAttribute('draggable', false);
        }
        if(chessField.piece != null && chessField.piece.color === "white"){
            field.firstChild?.setAttribute('draggable', true);
        }
        field.setAttribute('square-rank', chessField.rank);
        field.setAttribute('square-file', chessField.file);
        const row = Math.floor((63 - i)/8) + 1;
        if(row%2){
            field.classList.add(i%2 ? "white" : "red");
        }else{
            field.classList.add(i%2 ? "red" : "white");
        }
        board.append(field);

        if(i<= 15){
            field.firstChild.firstChild.classList.add("black");
        }

        if(i>47){
            field.firstChild.firstChild.classList.add("grey");
        }

        turn.innerHTML = "White";
    })
}

const gameboard = document.querySelectorAll("#board .square");
let initialPosition =[2];
let destinPosition = [2];
let pieceIndex;
let destinIndex;
let movedPiece;

//add EventListeneres onto every field of the gameboard
gameboard.forEach(field => {
    field.addEventListener("dragstart", dragStart)
    field.addEventListener("dragover", dragOver)
    field.addEventListener("drop", dragDrop)
})

function dragStart(e){
    //moved Piece gets the visualized form of the piece
    movedPiece = e.target;
    initialPosition[0] = movedPiece.parentNode.getAttribute('square-file');
    initialPosition[1] = parseInt(movedPiece.parentNode.getAttribute('square-rank'));
    //get the index of the piece within the array of the chessboard
    pieceIndex = chessBoard.findIndex(chessField => chessField.file == initialPosition[0] && chessField.rank == initialPosition[1]);
};

function dragOver(e){
    e.preventDefault();
};

function dragDrop(e){
    e.stopPropagation();
    //target of the drop = destination position of the piece 
    const taken = e.currentTarget;
    destinPosition[0] = taken.getAttribute('square-file');
    destinPosition[1] = parseInt(taken.getAttribute('square-rank'));
    
    const piece = taken.querySelector('.piece');

    destinIndex = chessBoard.findIndex(chessField => chessField.file == destinPosition[0] && chessField.rank == destinPosition[1]);

    if(destinPosition[0] === initialPosition[0] && destinPosition[1] === initialPosition[1]){
        console.log("Did not move.");
        return;
    }

    //if the piece variable != null, it's a capture move
    if(piece){
        console.log("Contains chess piece!");
        let movingPiece = chessBoard[pieceIndex].piece;
        //if the move is contained in the legalMove array value of moveIsLegal != -1
        let moveIsLegal = legalMoves.findIndex(legalMove => legalMove.type == movingPiece.type &&
                                                            legalMove.initial_file == chessBoard[pieceIndex].file &&
                                                            legalMove.initial_rank == chessBoard[pieceIndex].rank &&
                                                            legalMove.destination_file == chessBoard[destinIndex].file &&
                                                            legalMove.destination_rank == chessBoard[destinIndex].rank);
        
        if(moveIsLegal != -1){
            var tempPiece = chessBoard[pieceIndex].piece;
            tempPiece.moved = true;
            chessBoard[pieceIndex].piece = null;
            chessBoard[destinIndex].piece = tempPiece;
            if(tempPiece.type == "K"){
                if(currturn%2){
                    posKingBlack = {rank:chessBoard[destinIndex].rank, file:chessBoard[destinIndex].file};
                }
                else{
                    posKingWhite = {rank:chessBoard[destinIndex].rank, file:chessBoard[destinIndex].file};
                }
            }
            piece.remove();
            //Pawn Promotion
            if(tempPiece.type=="p" && (destinIndex<8 || destinIndex>55)){
                movedPiece.innerHTML = queen;
                if(destinIndex<8)
                    movedPiece.classList.add("grey");
                else
                    movedPiece.classList.add("black");
                chessBoard[destinIndex].piece.type = "Q";
            }
            taken.appendChild(movedPiece);
            console.log(check);
            nextTurn();
        }
        else{
            console.log("Illegal Move!");
        }
    }
    else{
        let movingPiece = chessBoard[pieceIndex].piece;
        let moveIsLegal = legalMoves.findIndex(legalMove => legalMove.type == movingPiece.type &&
                                                            legalMove.initial_file == chessBoard[pieceIndex].file &&
                                                            legalMove.initial_rank == chessBoard[pieceIndex].rank &&
                                                            legalMove.destination_file == chessBoard[destinIndex].file &&
                                                            legalMove.destination_rank == chessBoard[destinIndex].rank);
        
        if(moveIsLegal != -1){
            var tempPiece = chessBoard[pieceIndex].piece;
            tempPiece.moved = true;
            chessBoard[pieceIndex].piece = null;
            chessBoard[destinIndex].piece = tempPiece;
            if(tempPiece.type == "K"){
                if(currturn%2){
                    posKingBlack = {rank:chessBoard[destinIndex].rank, file:chessBoard[destinIndex].file};
                }
                else{
                    posKingWhite = {rank:chessBoard[destinIndex].rank, file:chessBoard[destinIndex].file};
                }
            }
            if(tempPiece.type=="p" && (destinIndex<8 || destinIndex>55)){
                movedPiece.innerHTML = queen;
                if(destinIndex<8)
                    movedPiece.classList.add("grey");
                else
                    movedPiece.classList.add("black");
                chessBoard[destinIndex].piece.type = "Q";
            }
            e.target.append(movedPiece);
            console.log(check);
            nextTurn();
        }
        else{
            console.log("Illegal Move!");
        }

    }
    //OLD ALGORITHM FOR REFERENCE
    /*if(piece){
        console.log("Contains chess piece!");
        if(chessBoard[pieceIndex].piece.type === "K" && chessBoard[pieceIndex].piece.OPTlegalMove(initialPosition, destinPosition, true)){
            let destination = {rank: destinPosition[1], file: destinPosition[0]}
            console.log("Checking King Move");
            console.log(destination);
            if(currturn%2){
                if(checkSight(destination, posKingWhite, currturn+1)){
                    console.log("Illegal Move");
                }
                else{
                    var tempPiece = chessBoard[pieceIndex].piece;
                    chessBoard[pieceIndex].piece = null;
                    chessBoard[destinIndex].piece = tempPiece;
                    posKingBlack = destination;
                    e.target.append(movedPiece);
                    check = checkSight(posKingBlack, posKingWhite, currturn);
                    console.log(check);
                    nextTurn();
                }
            }
            else{
                if(checkSight(posKingBlack, destination, currturn+1)){
                    console.log("Illegal Move");
                }
                else{
                    var tempPiece = chessBoard[pieceIndex].piece;
                    chessBoard[pieceIndex].piece = null;
                    chessBoard[destinIndex].piece = tempPiece;
                    posKingWhite = destination;
                    e.target.append(movedPiece);
                    check = checkSight(posKingBlack, posKingWhite, currturn);
                    console.log(check);
                    nextTurn();
                }
            }
        }
        else if(chessBoard[destinIndex].piece.color != chessBoard[pieceIndex].piece.color && chessBoard[pieceIndex].piece.OPTlegalMove(initialPosition, destinPosition, true)){
            //chessBoard[destinIndex].piece.color != chessBoard[pieceIndex].piece.color && chessBoard[pieceIndex].piece.legalCapture(initialPosition, destinPosition, chessBoard, pieceIndex, destinIndex)
            
            var tempPiece = chessBoard[pieceIndex].piece;
            var takenPiece = chessBoard[destinIndex].piece
            chessBoard[pieceIndex].piece = null;
            chessBoard[destinIndex].piece = tempPiece;
            if(checkSight(posKingBlack, posKingWhite, currturn-1)){
                console.log("Illegal Move");
                chessBoard[pieceIndex].piece = tempPiece;
                chessBoard[destinIndex].piece = takenPiece;
            }
            else{
                piece.remove();
                taken.appendChild(movedPiece);
                check = checkSight(posKingBlack, posKingWhite, currturn);
                console.log(check);
                nextTurn();
            }
        }
        else{
            console.log("illegal Move");
        }
    }
    else{
        if(chessBoard[pieceIndex].piece.type === "K" && chessBoard[pieceIndex].piece.OPTlegalMove(initialPosition, destinPosition, false)){
            let destination = {rank: destinPosition[1], file: destinPosition[0]}
            console.log("Checking King Move");
            console.log(destination);
            if(currturn%2){
                if(checkSight(destination, posKingWhite, currturn+1)){
                    console.log("Illegal Move");
                }
                else{
                    var tempPiece = chessBoard[pieceIndex].piece;
                    chessBoard[pieceIndex].piece = null;
                    chessBoard[destinIndex].piece = tempPiece;
                    posKingBlack = destination;
                    e.target.append(movedPiece);
                    check = checkSight(posKingBlack, posKingWhite, currturn);
                    console.log(check);
                    nextTurn();
                }
            }
            else{
                if(checkSight(posKingBlack, destination, currturn+1)){
                    console.log("Illegal Move");
                }
                else{
                    var tempPiece = chessBoard[pieceIndex].piece;
                    chessBoard[pieceIndex].piece = null;
                    chessBoard[destinIndex].piece = tempPiece;
                    posKingWhite = destination;
                    e.target.append(movedPiece);
                    check = checkSight(posKingBlack, posKingWhite, currturn);
                    console.log(check);
                    nextTurn();
                }
            }
        }
        else if(chessBoard[pieceIndex].piece.OPTlegalMove(initialPosition, destinPosition, false)){
            //chessBoard[pieceIndex].piece.legalMove(initialPosition, destinPosition, chessBoard, pieceIndex, destinIndex)
            var tempPiece = chessBoard[pieceIndex].piece;
            chessBoard[pieceIndex].piece = null;
            chessBoard[destinIndex].piece = tempPiece;
            if(checkSight(posKingBlack, posKingWhite, currturn-1)){
                console.log("Illegal Move");
                chessBoard[pieceIndex].piece = tempPiece;
                chessBoard[destinIndex].piece = null;
            }
            else{
                e.target.append(movedPiece);
                check = checkSight(posKingBlack, posKingWhite, currturn);
                nextTurn();
            }
        }
        else{
            console.log("illegal Move!");
        }
    }*/
};

//nextTurn increases the turn counter, then evaluates the Position, then evaluates all legal Moves for the current Player
function nextTurn(){
    currturn++;
    evalPos();
    evalLegal();

    //uncomment for legal move debugging
    /*console.log(legalMoves);
    chessBoard.forEach((chessField, i) => {
        if(!chessField.isEmpty() && chessField.piece.type === "Q") console.log(chessField.piece.sees);
    });*/



    if(currturn%2){
        if(!legalMoves.length){
            document.querySelector('#info-display').innerHTML = "Checkmate, White wins.";
        }
        else{
            turn.innerHTML = "Black";
        }
        swapDraggable()
    }
    else{
        if(!legalMoves.length){
            document.querySelector('#info-display').innerHTML = "Checkmate, Black wins.";
        }
        else{
            turn.innerHTML = "White";
        }
        swapDraggable()
    }
}

//changes all draggable pieces depending on the turn
function swapDraggable(){
    let allSquares = board.querySelectorAll('.square');
    allSquares.forEach((square, i ) =>{
        if(square.firstChild?.getAttribute('draggable') === "false"){
            square.firstChild?.setAttribute('draggable', true);
        } 
        else{
            square.firstChild?.setAttribute('draggable', false);}

    })
}

//checkSight uses current king Pos of Black and White to determine whether or not a move would lead to a check, returns true if yes
function checkSight(kingBlack, kingWhite, turn){
    let incheck = false;
    evalPos();
    chessBoard.forEach((checkSquare, i) =>{
        if(turn%2){
            if(!checkSquare.isEmpty() && checkSquare.piece.color === "black"){
                checkSquare.piece.sees.forEach((insight, i)=>{
                    if(kingWhite.rank === insight.rank && kingWhite.file === insight.file){
                        incheck = true;
                        console.log("CHECK!");
                    }
                })
            }
        }
        else{
            if(!checkSquare.isEmpty() && checkSquare.piece.color === "white"){
                checkSquare.piece.sees.forEach((insight, i)=>{
                    if(kingBlack.rank === insight.rank && kingBlack.file === insight.file){
                        incheck = true;
                        console.log("CHECK!");
                    }
                })
            }

        }
    })
    return incheck;
}

//calculates all seen squares for each piece
function evalPos(){
    chessBoard.forEach((evalSquare, i) =>{
        let currPos = [2];
        if(!evalSquare.isEmpty()){
            currPos[0] = determineFile(i);
            currPos[1] = 8-parseInt(i/8);
            if(evalSquare.piece.type === "p"){
                evalSquare.piece.pawnMoves = evalSquare.piece.genPawnMoves(i);
            }
            evalSquare.piece.sees = evalSquare.piece.evalSight(currPos, chessBoard);
        }
    })
}

//evaluates all Legal moves, by checking the seen squares and evaluating whether or not it would lead to the player's own King to stand in check
function evalLegal(){
    legalMoves = [];
    chessBoard.forEach((square, i) =>{
        let initPos = {rank:square.rank, file:square.file};
        if(currturn%2){
            if(!square.isEmpty() && square.piece.color == "black"){

                if(square.piece.type === "p"){
                    square.piece.pawnMoves.forEach((destination)=>{
                        let distance = Math.abs(destination-i)/8;
                        switch(distance){
                            case(1):
                                if(chessBoard[destination].isEmpty()){
                                    var tempPiece = square.piece;
                                    chessBoard[destination].piece = tempPiece;
                                    chessBoard[i].piece = null;
                                    if(!checkSight(posKingBlack, posKingWhite, currturn+1)){
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                        legalMoves.push({
                                            type:square.piece.type,
                                            initial_rank:chessBoard[i].rank,
                                            initial_file:chessBoard[i].file, 
                                            destination_rank:chessBoard[destination].rank, 
                                            destination_file:chessBoard[destination].file
                                        });
                                    }
                                    else{
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                    }
                                }
                                break;
                            case(2):
                                if(chessBoard[destination-8].isEmpty() && chessBoard[destination].isEmpty()){   
                                    var tempPiece = square.piece;
                                    chessBoard[destination].piece = tempPiece;
                                    chessBoard[i].piece = null;
                                    if(!checkSight(posKingBlack, posKingWhite, currturn+1)){
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                        legalMoves.push({
                                            type:square.piece.type,
                                            initial_rank:chessBoard[i].rank,
                                            initial_file:chessBoard[i].file, 
                                            destination_rank:chessBoard[destination].rank, 
                                            destination_file:chessBoard[destination].file
                                        });
                                    }
                                    else{
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                    }
                                }
                                break;
                        }
                        evalPos();
                    })
                }


                square.piece.sees.forEach((destPos)=>{
                    let destination = [];
                    let position = [];
                    let desDex;
                    position[0] = square.file;
                    position[1] = square.rank;
                    destination[0] = destPos.file;
                    destination[1] = destPos.rank;
                    desDex = chessBoard.findIndex(chessField => chessField.file == destination[0] && chessField.rank == destination[1]);
                    if(chessBoard[desDex].piece){
                        if(chessBoard[desDex].piece.color != square.piece.color && square.piece.type === "K" && square.piece.OPTlegalMove(position, destination, true)){

                            if(currturn%2){
                                var tempPiece = square.piece;
                                var takenPiece = chessBoard[desDex].piece
                                square.piece = null;
                                chessBoard[desDex].piece = tempPiece;
                                if(checkSight(destPos, posKingWhite, currturn+1)){
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                }
                                else{
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                            else{
                                var tempPiece = square.piece;
                                var takenPiece = chessBoard[desDex].piece
                                square.piece = null;
                                chessBoard[desDex].piece = tempPiece;
                                if(checkSight(posKingBlack, destPos, currturn+1)){
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                }
                                else{
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                        }
                        else if(chessBoard[desDex].piece.color != square.piece.color && square.piece.OPTlegalMove(position, destination, true)){
                            var tempPiece = square.piece;
                            var takenPiece = chessBoard[desDex].piece
                            square.piece = null;
                            chessBoard[desDex].piece = tempPiece;
                            if(checkSight(posKingBlack, posKingWhite, currturn-1)){
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = takenPiece;
                            }
                            else{
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = takenPiece;
                                legalMoves.push({
                                    type:square.piece.type, 
                                    initial_rank:chessBoard[i].rank,
                                    initial_file:chessBoard[i].file, 
                                    destination_rank:destPos.rank, 
                                    destination_file:destPos.file
                                });
                            }
                        }
                        else{
                        }
                    }
                    else{
                        if(square.piece.type === "K" && square.piece.OPTlegalMove(position, destination, false)){
                            if(currturn%2){
                                var tempPiece = square.piece;
                                square.piece = null;
                                chessBoard[desDex].piece = tempPiece;
                                if(checkSight(destPos, posKingWhite, currturn+1)){
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = null;
                                }
                                else{
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = null;
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                            else{
                                var tempPiece = square.piece;
                                square.piece = null;
                                chessBoard[desDex].piece = tempPiece;
                                if(checkSight(posKingBlack, destPos, currturn+1)){
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = null;
                                }
                                else{
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = null;
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                        }
                        else if(square.piece.OPTlegalMove(position, destination, false)){
                            //chessBoard[pieceIndex].piece.legalMove(initialPosition, destinPosition, chessBoard, pieceIndex, destinIndex)
                            var tempPiece = square.piece;
                            square.piece = null;
                            chessBoard[desDex].piece = tempPiece;
                            if(checkSight(posKingBlack, posKingWhite, currturn+1)){
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = null;
                            }
                            else{
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = null;
                                legalMoves.push({
                                    type:square.piece.type, 
                                    initial_rank:chessBoard[i].rank,
                                    initial_file:chessBoard[i].file, 
                                    destination_rank:destPos.rank, 
                                    destination_file:destPos.file
                                });
                            }
                        }
                        else{
                        }
                    }
                    //REEVALUATE POSITION TO BASE AFTER EVERY TESTED MOVE
                    evalPos();
                })
            }
        }
        else{
            if(!square.isEmpty() && square.piece.color == "white"){

                if(square.piece.type === "p"){
                    square.piece.pawnMoves.forEach((destination)=>{
                        let distance = Math.abs(destination-i)/8;
                        switch(distance){
                            case(1):
                                if(chessBoard[destination].isEmpty()){
                                    var tempPiece = square.piece;
                                    chessBoard[destination].piece = tempPiece;
                                    chessBoard[i].piece = null;
                                    if(!checkSight(posKingBlack, posKingWhite, currturn+1)){
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                        legalMoves.push({
                                            type:square.piece.type,
                                            initial_rank:chessBoard[i].rank,
                                            initial_file:chessBoard[i].file, 
                                            destination_rank:chessBoard[destination].rank, 
                                            destination_file:chessBoard[destination].file
                                        });
                                    }
                                    else{
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                    }
                                }
                                break;
                            case(2):
                                if(chessBoard[destination+8].isEmpty()&&chessBoard[destination].isEmpty()){   
                                    var tempPiece = square.piece;
                                    chessBoard[destination].piece = tempPiece;
                                    chessBoard[i].piece = null;
                                    if(!checkSight(posKingBlack, posKingWhite, currturn+1)){
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                        legalMoves.push({
                                            type:square.piece.type,
                                            initial_rank:chessBoard[i].rank,
                                            initial_file:chessBoard[i].file, 
                                            destination_rank:chessBoard[destination].rank, 
                                            destination_file:chessBoard[destination].file
                                        });
                                    }
                                    else{
                                        chessBoard[i].piece = tempPiece;
                                        chessBoard[destination].piece = null;
                                    }
                                }
                                break;
                        }
                        evalPos();
                    })
                }

                square.piece.sees.forEach((destPos)=>{
                    let destination = [];
                    let position = [];
                    let desDex;
                    position[0] = square.file;
                    position[1] = square.rank;
                    destination[0] = destPos.file;
                    destination[1] = destPos.rank;
                    desDex = chessBoard.findIndex(chessField => chessField.file == destination[0] && chessField.rank == destination[1]);
                    if(chessBoard[desDex].piece){
                        if(chessBoard[desDex].piece.color != square.piece.color && square.piece.type === "K" && square.piece.OPTlegalMove(position, destination, true)){
                            if(currturn%2){
                                var tempPiece = square.piece;
                                var takenPiece = chessBoard[desDex].piece
                                square.piece = null;
                                chessBoard[desDex].piece = tempPiece;
                                if(checkSight(destPos, posKingWhite, currturn+1)){
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                }
                                else{
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                            else{
                                var tempPiece = square.piece;
                                var takenPiece = chessBoard[desDex].piece
                                square.piece = null;
                                chessBoard[desDex].piece = tempPiece;
                                if(checkSight(posKingBlack, destPos, currturn+1)){
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                }
                                else{
                                    square.piece = tempPiece;
                                    chessBoard[desDex].piece = takenPiece;
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                        }
                        else if(chessBoard[desDex].piece.color != square.piece.color && square.piece.OPTlegalMove(position, destination, true)){
                            var tempPiece = square.piece;
                            var takenPiece = chessBoard[desDex].piece
                            square.piece = null;
                            chessBoard[desDex].piece = tempPiece;
                            if(checkSight(posKingBlack, posKingWhite, currturn-1)){
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = takenPiece;
                            }
                            else{
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = takenPiece;
                                legalMoves.push({
                                    type:square.piece.type, 
                                    initial_rank:chessBoard[i].rank,
                                    initial_file:chessBoard[i].file, 
                                    destination_rank:destPos.rank, 
                                    destination_file:destPos.file
                                });
                            }
                        }
                    }
                    else{
                        if(square.piece.type === "K" && square.piece.OPTlegalMove(position, destination, false)){
                            if(currturn%2){
                                if(checkSight(destPos, posKingWhite, currturn+1)){
                                }
                                else{
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                            else{
                                if(checkSight(posKingBlack, destPos, currturn+1)){
                                }
                                else{
                                    legalMoves.push({
                                        type:square.piece.type, 
                                        initial_rank:chessBoard[i].rank,
                                        initial_file:chessBoard[i].file, 
                                        destination_rank:destPos.rank, 
                                        destination_file:destPos.file
                                    });
                                }
                            }
                        }
                        else if(square.piece.OPTlegalMove(position, destination, false)){
                            //chessBoard[pieceIndex].piece.legalMove(initialPosition, destinPosition, chessBoard, pieceIndex, destinIndex)
                            var tempPiece = square.piece;
                            square.piece = null;
                            chessBoard[desDex].piece = tempPiece;
                            if(checkSight(posKingBlack, posKingWhite, currturn+1)){
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = null;
                            }
                            else{
                                square.piece = tempPiece;
                                chessBoard[desDex].piece = null;
                                legalMoves.push({
                                    type:square.piece.type, 
                                    initial_rank:chessBoard[i].rank,
                                    initial_file:chessBoard[i].file, 
                                    destination_rank:destPos.rank, 
                                    destination_file:destPos.file
                                });
                            }
                        }
                    }
                    //REEVALUATE POSITION TO BASE AFTER EVERY TESTED MOVE
                    evalPos();
                })
            }
        }
    });
}

//Unfinished Castle function for Castling functionality
function checkCastle(){
    if(currturn%2){
        if(!chessBoard[0].piece.moved && chessBoard[1].isEmpty() && chessBoard[2].isEmpty());
    }
}




//Returns file depending on the Modulo of the index
function determineFile(i){
    switch(i%8){
        case 0:
            return "a";
        case 1:
            return "b";
        case 2:
            return "c";
        case 3:
            return "d";
        case 4:
            return "e";
        case 5:
            return "f";
        case 6:
            return "g";
        case 7:
            return "h";
    }
}