
const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('.statusText')
const restartButton = document.querySelector('.restart')
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8], 
    [2,4,6],
    [0,3,6], 
    [1,4,7], 
    [2,5,8]
]

let options = ["","","","","","","","",""]
let currentPlayer= ""
let running = false


function initializeGame(player){
    cells.forEach(cell =>
         cell.addEventListener('click',(evt)=>{ 
            cellClicked(evt)
        }))
    restartButton.addEventListener("click", restartGame)
    currentPlayer = player
    statusText.textContent = `${currentPlayer}'s turn`
    running = true
}

function cellClicked(evt){
    const cellIndex = evt.target.getAttribute("cellIndex")

    if(!running){
        return
    }

    let c = 9
    let y = 1
    for(let i=0; i < options.length; i++) {
        if(options[i] != "" && y <= 9){
            y++
        } 
    }
    c = c - y //the number of empty slot in the options array

    if (c >= 3 ){
        updateCell(evt.target, cellIndex)
        checkWinner();
    }else{
        cells.forEach(cell =>
            cell.addEventListener('click', isLegalMove))
    }

}

function isLegalMove(){
    if(this.textContent != ""){
        const cellIndex = this.getAttribute("cellIndex")
        let moves = possibleMove(parseInt(cellIndex))

        for(let a=0; a < options.length; a++){
            console.log(`index:${a} data: ${options[a]}`)
        }

        movingCell(this, moves, cellIndex)
        
    }

    /* updateCell(this, cellIndex)
    checkWinner(); */
}

/* cell.addEventListener('click', (evt)=>{
    updateCell(node, index )
    makeMove(evt)
    checkWinner();
    cells.forEach(cell =>{
        cell.setAttribute("moves","false")
    })
         }
    ) */

function movingCell(node, moves, index){
    for(let i of moves){
        cells.forEach(cell_1 =>{
            let cellNum = cell_1.getAttribute("cellIndex")
            if(cellNum == i){
                if(options[index] == currentPlayer){
                    cell_1.setAttribute("moves","true")
                    cell_1.addEventListener('click', (evt)=>{
                        if(options[index] == currentPlayer){
                            removeCell(node, index )
                            makeMove(evt)
                        }
                       
                        cells.forEach(cell =>{
                            cell.setAttribute("moves","false")
                        })
                    })

                }//end of if(options[index] == currentPlayer
            }
        })
    }
}

/**
 * This make the move on the board
 * It takes off the value from the existing cell
 * and add it to the next chosen cell 
 * @firstIndex cellIndex to be moved
 * @firstCell the cell to be emptied
 */

function makeMove(node){
    let cellIndex = node.target.getAttribute('cellIndex')
    let cell = document.querySelector(`td[cellIndex='${node.target.getAttribute('cellIndex')}']`)
    //add a maker on the second cell
    if(options[cellIndex] == ""){
        updateCell(cell, cellIndex)
        checkWinner();
    }
    
}





function updateCell(cell, index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer  
}

function removeCell(cell, index){
    if(options[index] != ""){
        options[index] = ""
        cell.textContent = ""
    }
}


/** 
    This will find possible moves 
  @index as input of the cellIndex
  @return an array of available empty cells in the game
*/

function possibleMove(index){
    let availablePositions = []
    for( let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]

        if(condition.includes(index)){
            for(let j = 0; j < condition.length; j++){
                if(condition[j] != index){
                    if(options[condition[j]] == ""){
                        availablePositions.push(condition[j])
                    }
                }

            }
        }
    }

    return availablePositions
}



function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O": "X"
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){
    let roundWon = false

    for(let i=0; i < winConditions.length; i++){
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if(cellA == "" || cellB == "" || cellC == ""){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true
            break
        }

    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        running = false
    }else{
        changePlayer()
    }

   /*  if(!options.includes("")){
        statusText.textContent = "Draw!"
        running = false
    } */
}

function restartGame(){
    currentPlayer = "X"
    options = ["","","","","","","","",""]
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell =>
        cell.textContent=" ")
    running = true
}


$(document).ready(function(){
    $(".alert-choice").hide()

    $(".play").click(function(){
        $(".alert-choice").show("easy")
    })   

    $(".start").click(function(){
        $(".alert-choice").hide("easy")
        let playerChoice = $(".playerChoice option:selected").val()
        initializeGame(playerChoice)
    })



})





