const SPEED = 0.018 //bei 0.2 schwieriger wegen schnelligkeit des Computers

export default class Board {
    constructor(boardElement){
        this.boardElement = boardElement
        this.reset()
    }

    get position (){
        return parseFloat(getComputedStyle(this.boardElement).getPropertyValue("--position"))
    }

    set position(value){
        this.boardElement.style.setProperty("--position", value)

    }

    reset(){
        this.position = 50
    }

    update(delta, ballHeight){
        this.position += SPEED * delta * (ballHeight - this.position)
    }

    rect(){
        return this.boardElement.getBoundingClientRect()
    }
}