export default class Field{
    constructor(rank, file, piece){
        this.rank = rank;
        this.file = file;
        this.piece = piece;
    }

    isEmpty(){
        if(this.piece == null){
            return true;
        }
        return false;
    }
}