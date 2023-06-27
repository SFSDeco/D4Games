var fileIndex = 0;
var rankIndex = 1;

export default class Piece{

    constructor(type, color, html, moved = false, sees = [], pawnMoves = []){
        this.type = type;
        this.color = color;
        this.html = html;
        this.moved = moved;
        this.sees = sees;
        this.pawnMoves = pawnMoves;
    }

    genPawnMoves(ind){
        let moves = [];
        if(this.color === "white"){
            if(!this.moved){
                moves.push(ind-16);
                moves.push(ind-8);
            }
            else if(ind-8 >= 0){
                moves.push(ind-8);
            }
        }
        else{
            if(!this.moved){
                moves.push(ind+16);
                moves.push(ind+8);
            }
            else if(ind+8 < 64){
                moves.push(ind+8);
            }
        }
        return moves;
    }


    //index 0 == file , 1 == rank
    evalSight(position, board){
        this.sees =[];
        let sight;
        switch(this.type){
            case("p"): sight = this.pawnSight(position, board); break;
            case("R"): sight = this.rookSight(position, board); break;
            case("N"): sight = this.nightSight(position, board); break;
            case("B"): sight = this.shopSight(position, board); break;
            case("Q"): sight = this.rookSight(position, board); this.shopSight(position, board); break;
            case("K"): sight = this.kingSight(position, board); break;
        }
        return sight;
    }

    pawnSight(position, board){
        let square;
        let file = position[0];
        let rank = position[1];
        board.forEach((field, i)=>{
            if(this.color === "white"){
                if(field.rank == (rank+1) && (field.file == String.fromCharCode(file.charCodeAt()-1) || field.file == String.fromCharCode(file.charCodeAt()+1))){
                    square = {rank:field.rank, file:field.file};
                    this.sees.push(square);
                }
            }
            if(this.color === "black"){
                if(field.rank == (rank-1) && (field.file == String.fromCharCode(file.charCodeAt()-1) || field.file == String.fromCharCode(file.charCodeAt()+1))){
                    square = {rank:field.rank, file:field.file};
                    this.sees.push(square);
                }
            }
        })
        return this.sees;
    }

    rookSight(position, board){
        let square;
        let dirUp= true; let dirDown= true; let dirLeft= true ;let dirRight = true;
        let file = position[0];
        let rank = position[1];
        let index = board.findIndex(chessField => chessField.file == file && chessField.rank == rank);
        for(let i = 1; i < 8; ++i){
            if(dirDown && !(index + i*8 > 63)){
                if(!(board[index+i*8].isEmpty())){
                    square = {rank:board[index+i*8].rank, file:board[index+i*8].file};
                    this.sees.push(square);
                    dirDown = false;
                }
                else{
                    square = {rank:board[index+i*8].rank, file:board[index+i*8].file};
                    this.sees.push(square);
                }
            }
            if(dirUp && !(index-i*8 < 0)){
                if(!(board[index-i*8].isEmpty())){
                    square = {rank:board[index-i*8].rank, file:board[index-i*8].file};
                    this.sees.push(square);
                    dirUp = false;
                }
                else{
                    square = {rank:board[index-i*8].rank, file:board[index-i*8].file};
                    this.sees.push(square);
                }
            }
            //index Modulo 8 === File Position if they were also Numbered
            if(dirLeft && !(mod(index-i, 8) > mod(index, 8))){
                if(!(board[index-i].isEmpty())){
                    square = {rank:board[index-i].rank, file:board[index-i].file};
                    this.sees.push(square);
                    dirLeft = false;
                }
                else{
                    square = {rank:board[index-i].rank, file:board[index-i].file};
                    this.sees.push(square);
                }
            }
            if(dirRight && !(mod(index+i, 8) < mod(index, 8))){
                if(!(board[index+i].isEmpty())){
                    square = {rank:board[index+i].rank, file:board[index+i].file};
                    this.sees.push(square);
                    dirRight = false;
                }
                else{
                    square = {rank:board[index+i].rank, file:board[index+i].file};
                    this.sees.push(square);
                }
            }

            if(!dirUp && !dirDown && !dirLeft && !dirRight) break;
        }
        return this.sees;
    }

    nightSight(position, board){
        let square;
        let file = position[0];
        let rank = position[1];
        let index = board.findIndex(chessField => chessField.file == file && chessField.rank == rank);
        if(mod(index-2*8, 8) > mod(index-2*8-1, 8) && index-2*8 > 0){
            square = {rank:board[index-2*8-1].rank, file:board[index-2*8-1].file};
            this.sees.push(square);
        }
        if(mod(index-2*8, 8) < mod(index-2*8+1, 8) && index-2*8 > 0){
            square = {rank:board[index-2*8+1].rank, file:board[index-2*8+1].file};
            this.sees.push(square);
        }
        if(mod(index-1*8, 8) > mod(index-1*8-2, 8) && index-1*8 > 0){
            square = {rank:board[index-1*8-2].rank, file:board[index-1*8-2].file};
            this.sees.push(square);
        }
        if(mod(index-1*8, 8) < mod(index-1*8+2, 8) && index-1*8 > 0){
            square = {rank:board[index-1*8+2].rank, file:board[index-1*8+2].file};
            this.sees.push(square);
        }
        if(mod(index+2*8, 8) > mod(index+2*8-1, 8) && index+2*8 < 64){
            square = {rank:board[index+2*8-1].rank, file:board[index+2*8-1].file};
            this.sees.push(square);
        }
        if(mod(index+2*8, 8) < mod(index+2*8+1, 8) && index+2*8 < 64){
            square = {rank:board[index+2*8+1].rank, file:board[index+2*8+1].file};
            this.sees.push(square);
        }
        if(mod(index+1*8, 8) > mod(index+1*8-2, 8) && index+1*8 < 64){
            square = {rank:board[index+1*8-2].rank, file:board[index+1*8-2].file};
            this.sees.push(square);
        }
        if(mod(index+1*8, 8) < mod(index+1*8+2, 8) && index+1*8 < 64){
            square = {rank:board[index+1*8+2].rank, file:board[index+1*8+2].file};
            this.sees.push(square);
        }
        return this.sees;
    }

    shopSight(position, board){
        let square;
        let dirNE= true; let dirNW= true; let dirSE= true ;let dirSW = true;
        let file = position[0];
        let rank = position[1];
        let index = board.findIndex(chessField => chessField.file == file && chessField.rank == rank);

        
        for(var i = 1; i < 8; ++i){
            if(dirNW && (index - 8*i-i) > 0 && mod(index-8*i-i, 8) < mod(index, 8)){
                if(!board[index-8*i-i].isEmpty()){
                    square = {rank:board[index-8*i-i].rank ,file:board[index-8*i-i].file};
                    this.sees.push(square);
                    dirNW = false;
                }
                else{
                    square = {rank:board[index-8*i-i].rank ,file:board[index-8*i-i].file};
                    this.sees.push(square);
                }
            }
            if(dirNE && (index - 8*i+i) > 0 && mod(index-8*i+i, 8) > mod(index, 8)){
                if(!board[index-8*i+i].isEmpty()){
                    square = {rank:board[index-8*i+i].rank ,file:board[index-8*i+i].file};
                    this.sees.push(square);
                    dirNE = false;
                }
                else{
                    square = {rank:board[index-8*i+i].rank ,file:board[index-8*i+i].file};
                    this.sees.push(square);
                }
            }       
            if(dirSW && (index + 8*i-i) < 64 && mod(index+8*i-i, 8) < mod(index, 8)){
                if(!board[index+8*i-i].isEmpty()){
                    square = {rank:board[index+8*i-i].rank ,file:board[index+8*i-i].file};
                    this.sees.push(square);
                    dirSW = false;
                }
                else{
                    square = {rank:board[index+8*i-i].rank ,file:board[index+8*i-i].file};
                    this.sees.push(square);
                }
            }
            if(dirSE && (index + 8*i+i) < 64 && mod(index+8*i+i, 8) > mod(index, 8)){
                if(!board[index+8*i+i].isEmpty()){
                    square = {rank:board[index+8*i+i].rank ,file:board[index+8*i+i].file};
                    this.sees.push(square);
                    dirSE = false;
                }
                else{
                    square = {rank:board[index+8*i+i].rank ,file:board[index+8*i+i].file};
                    this.sees.push(square);
                }
            }
            
            if(!dirNE && !dirNW && !dirSE && !dirSW)
                break;
        }
        return this.sees;
    }

    kingSight(position, board){
        let square;
        let i = 1;
        let file = position[0];
        let rank = position[1];
        let index = board.findIndex(chessField => chessField.file == file && chessField.rank == rank);

        if((index - 8*i-i) > 0 && mod(index-8*i-i, 8) < mod(index, 8)){
            square = {rank:board[index-8*i-i].rank ,file:board[index-8*i-i].file};
            this.sees.push(square);
        }
        if((index - 8*i+i) > 0 && mod(index-8*i+i, 8) > mod(index, 8)){
            square = {rank:board[index-8*i+i].rank ,file:board[index-8*i+i].file};
            this.sees.push(square);
        }       
        if((index + 8*i-i) < 64 && mod(index+8*i-i, 8) < mod(index, 8)){
            square = {rank:board[index+8*i-i].rank ,file:board[index+8*i-i].file};
            this.sees.push(square);
        }
        if((index + 8*i+i) < 64 && mod(index+8*i+i, 8) > mod(index, 8)){
            square = {rank:board[index+8*i+i].rank ,file:board[index+8*i+i].file};
            this.sees.push(square);
        }

        if(!(index + i*8 > 63)){
            square = {rank:board[index+i*8].rank, file:board[index+i*8].file};
            this.sees.push(square);
        }
        if(!(index-i*8 < 0)){
            square = {rank:board[index-i*8].rank, file:board[index-i*8].file};
            this.sees.push(square);
        }
        //index Modulo 8 === File Position if they were also Numbered
        if(!(mod(index-i, 8) > mod(index, 8))){
            square = {rank:board[index-i].rank, file:board[index-i].file};
            this.sees.push(square);
        }
        if(!(mod(index+i, 8) < mod(index, 8))){
            square = {rank:board[index+i].rank, file:board[index+i].file};
            this.sees.push(square);
        }
        return this.sees;
    }


    //Optimized Algorithm for Legal Moves
    OPTlegalMove(position, destination, capture){
        let legal = false

        if(this.type === "p" && !capture){
            if(position[0] === destination[0]){
                if(!this.moved && ((destination[1]-position[1] < 3 && this.color === "white") || (Math.abs(destination[1]-position[1]) < 3 && this.color === "black"))){
                    this.moved = true;
                    return true;
                }

                if((destination[1]-position[1] < 2 && this.color === "white") || (Math.abs(destination[1]-position[1]) < 2 && this.color === "black")){
                    return true;
                }
            }
        }
        else if((this.type === "p" && capture) || this.type != "p" ){
            this.sees.forEach((seen, i) => {
                if(legal){
                    return;
                }
                if(seen.rank === destination[rankIndex] && seen.file === destination[fileIndex]){
                    legal = true;
                }
            })
        }
        return legal;
    }

    /*legalMove(position, destination, board, pieceIndex, destinIndex){
        switch(this.type){
            case("p"):
                if(position[0] === destination[0]){
                    if(!this.moved && ((destination[1]-position[1] < 3 && this.color === "white") || (Math.abs(destination[1]-position[1]) < 3 && this.color === "black"))){
                        this.moved = true;
                        return true;
                    }

                    if((destination[1]-position[1] < 2 && this.color === "white") || (Math.abs(destination[1]-position[1]) < 2 && this.color === "black")){
                        return true;
                    }
                }
                break;

            case("R"): 
                if(position[0] === destination[0]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }

                } 
                if(position[1] === destination[1]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                }
                break;

            case("B"):   
            var distance_x = position[0].charCodeAt() - destination[0].charCodeAt();
            var distance_y = position[1]-destination[1];
                if(Math.abs(distance_x) === Math.abs(distance_y)){
                    if(distance_x > 0){
                        if(distance_y > 0){
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i-i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i-i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    else{
                        if(distance_y > 0){
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i+i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i+i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    return true;
                }
                break;

            case("N"): 
            var distance_x = position[0].charCodeAt() - destination[0].charCodeAt();
            var distance_y = position[1] - destination[1];
                if((Math.abs(distance_x) == 2 && Math.abs(distance_y) == 1) || (Math.abs(distance_x) == 1 && Math.abs(distance_y) == 2)){
                    return true;
                }
                break;

            case("Q"): 
            var distance_x = position[0].charCodeAt() - destination[0].charCodeAt();
            var distance_y = position[1]-destination[1];
                if(position[0] === destination[0]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }

                } 
                if(position[1] === destination[1]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                }
                if(Math.abs(distance_x) === Math.abs(distance_y)){
                    if(distance_x > 0){
                        if(distance_y > 0){
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i-i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i-i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    else{
                        if(distance_y > 0){
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i+i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i+i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    return true;
                }
                break;

            case("K"): break;
        }

        return false;
    }

    legalCapture(position, destination, board, pieceIndex, destinIndex){
        switch(this.type){
            case("p"):
                if(destination[0] === String.fromCharCode(position[0].charCodeAt()-1) || destination[0] === String.fromCharCode(position[0].charCodeAt()+1)){
                    if((destination[1]-position[1] == 1 && this.color === "white") || (destination[1]-position[1] == -1 && this.color === "black")){
                        if(!this.moved){
                            this.moved = true;
                        }
                        return true;
                    }
                }
                break;

            case("R"): 
                if(position[0] === destination[0]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8-1; ++i){
                            if(!board[pieceIndex-(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;

                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8-1; ++i){
                            if(!board[pieceIndex+(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }

                } 
                if(position[1] === destination[1]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                }
                break;
            case("B"):   
            var distance_x = position[0].charCodeAt() - destination[0].charCodeAt();
            var distance_y = position[1]-destination[1];
                if(Math.abs(distance_x) === Math.abs(distance_y)){
                    if(distance_x > 0){
                        if(distance_y > 0){
                            for(var i = 1; i < (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i-i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i < (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i-i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    else{
                        if(distance_y > 0){
                            for(var i = 1; i < (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i+i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i < (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i+i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    return true;
                }
                break;

            case("N"):
            var distance_x = position[0].charCodeAt() - destination[0].charCodeAt();
            var distance_y = position[1] - destination[1];
                if((Math.abs(distance_x) == 2 && Math.abs(distance_y) == 1) || (Math.abs(distance_x) == 1 && Math.abs(distance_y) == 2)){
                    return true;
                }
                break;

            case("Q"): 
            var distance_x = position[0].charCodeAt() - destination[0].charCodeAt();
            var distance_y = position[1]-destination[1];
                if(position[0] === destination[0]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)*8].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }

                } 
                if(position[1] === destination[1]){
                    if(destinIndex < pieceIndex){
                        for(var i = 0; i < (pieceIndex - destinIndex)/8; ++i){
                            if(!board[pieceIndex-(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                    else{
                        for(var i = 0; i < (destinIndex - pieceIndex)/8; ++i){
                            if(!board[pieceIndex+(i+1)].isEmpty())
                                return false;
                        }
                        if(!this.moved)
                            this.moved = true;
                        return true;
                    }
                }
                if(Math.abs(distance_x) === Math.abs(distance_y)){
                    if(distance_x > 0){
                        if(distance_y > 0){
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i-i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i-i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    else{
                        if(distance_y > 0){
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex+8*i+i].isEmpty())
                                    return false;
                            }
                        }
                        else{
                            for(var i = 1; i <= (Math.abs(distance_x)); ++i){
                                if(!board[pieceIndex-8*i+i].isEmpty())
                                    return false;
                            }

                        }
                    }
                    return true;
                }
                break;

            case("K"): break;
        }

        return false;
    }*/
}

function mod(n, m) {
    return ((n % m) + m) % m;
}