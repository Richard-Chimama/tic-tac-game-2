
class Tictactoe{
    cells = document.querySelectorAll('.cell')
    statusText = document.querySelector('.statusText')
    restartButton = document.querySelector('.restart')
    winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8], 
        [2,4,6],
        [0,3,6], 
        [1,4,7], 
        [2,5,8]
    ]

    
    options = ["","","","","","","","",""]
    currentPlayer= ""
    count = 0
    running = false 
    


    /**
     * This initializes the game
     */
    initializeGame = function(player){
        this.cells.forEach(cell =>
            cell.addEventListener('click',(evt)=>{ 
               this.count++
               this.cellClicked(evt)
           }))

        this.restartButton.addEventListener("click", this.restartGame)
        this.currentPlayer = player
        this.statusText.textContent = `${this.currentPlayer}'s turn`
        this.running = true

    }//end of initializeGame


    cellClicked = function(evt){
        const cellIndex = evt.target.getAttribute("cellIndex")
        // console.log(count)


        if(!this.running){
            return
        }

        if (this.count <=6 ){
            this.updateCell(evt.target, cellIndex)
            this.checkWinner();
        }else{
            this.cells.forEach(cell =>
                cell.addEventListener('click', this.isLegalMove))
        }
        }//end of the cellClicked 




    isLegalMove = function(){
        if(this.textContent != ""){
            let cellIndex = this.getAttribute("cellIndex")
            let moves = this.possibleMove(cellIndex)
    
           /*  for(let a=0; a < options.length; a++){
                console.log(`index:${a} data: ${options[a]}`)
            } */
    
            for(let i of moves){
                this.cells.forEach(cell =>{
                    cellNum = cell.getAttribute("cellIndex")
                    if(cellNum == i){
                        cell.setAttribute("moves","true")
                        cell.addEventListener('click', (evt)=>{
                            makeMove(evt,this, cellIndex )
                            cells.forEach(cell =>{
                                cell.setAttribute("moves","false")
                            })
                                 }
                            )
                    }
                })
            }
    
            console.log(possibleMove(parseInt(cellIndex)))
        }
    }//end of isLegalMove



    /**
     * This make the move on the board
     * It takes off the value from the existing cell
     * and add it to the next chosen cell 
     * @firstIndex cellIndex to be moved
     * @firstCell the cell to be emptied
     */
    makeMove = function(node, firstCell, firstIndex){

    }


    updateCell = function(cell, index){
        this.options[index] = this.currentPlayer
        cell.textContent = this.currentPlayer
    }


    /** 
    * This will find possible moves 
    * @index as input of the cellIndex
    * @return an array of available empty cells in the game
    */
    possibleMove = (index)=>{
        let availablePositions = []
        for( let i = 0; i < this.winConditions.length; i++){
            const condition = this.winConditions[i]

            if(condition.includes(index)){
                for(let j = 0; j < condition.length; j++){
                    if(condition[j] != index){
                        if(this.options[condition[j]] == ""){
                            availablePositions.push(condition[j])
                        }
                    }

                }
            }
        }

        return availablePositions
     }//end of possibleMove


    changePlayer = function(){
        this.currentPlayer = (this.currentPlayer == "X")? "O": "X"
        this.statusText.textContent = `${this.currentPlayer}'s turn`
    }



    checkWinner = function(){
        let roundWon = false

        for(let i=0; i < this.winConditions.length; i++){
            const condition = this.winConditions[i]
            const cellA = this.options[condition[0]]
            const cellB = this.options[condition[1]]
            const cellC = this.options[condition[2]]

            if(cellA == "" || cellB == "" || cellC == ""){
                continue
            }
            if(cellA == cellB && cellB == cellC){
                roundWon = true
                break
            }

        }
        if(roundWon){
            this.statusText.textContent = `${this.currentPlayer} wins!`
            this.running = false
        }else{
            this.changePlayer()
        }
    }//end of checkWinner




    restartGame = function(){}


}//end of the class



const game = new Tictactoe()

$(document).ready(function(){
    $(".alert-choice").hide()

    $(".play").click(function(){
        $(".alert-choice").show("easy")
    })   

    $(".start").click(function(){
        $(".alert-choice").hide("easy")
        let playerChoice = $(".playerChoice option:selected").val()
        game.initializeGame(playerChoice)
    })



})

game