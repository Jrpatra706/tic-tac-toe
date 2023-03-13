const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer ="X";
    // only emptying in gamegrid
    gameGrid = ["","","","","","","","",""]; 
    // emptying in UI
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // doing cause green of winning shadow is not removed after clicking new game button
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;


}

initGame();

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer= "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position) => {
        // all three boxes should be non-empty and exactly same
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                
                // check for winner
                if(gameGrid[position[0]] ==="X"){
                    answer = "X";
                }
                else{
                    answer = "0";
                }

                // disable click on boxes(pointer events) after we get a winner from above
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })


                // setting green color
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    // things doing after getting a winner 
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    // checking if it's a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    //if board is filled , it's a tie , things we have to do after tie
    if(fillCount ===9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === "" ) {
        // by this when we click , X/0 will be displayed 
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer; 
        // by this line when we go to a box having already a value , the cursor pointer won't happen
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

// by this when click happen on newGameBtn boxes will be cleared
newGameBtn.addEventListener("click",initGame);