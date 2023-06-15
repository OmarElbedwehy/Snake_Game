
let playBoard = document.querySelector(".play-board")
let scoreEle = document.querySelector(".score")
let highScoreEle = document.querySelector(".high-score")
let controls = document.querySelectorAll(".controls i")


let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let gameInterval;

let score = 0;

let high_score = localStorage.getItem("high_score") || 0;
highScoreEle.innerHTML = `High Score: ${high_score}`


const changePosition = (e)=>{
    const key = e.key;
    if (key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if (key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if (key === "ArrowLeft" && velocityX != 1){
        velocityY = 0;
        velocityX = -1;
    }else if (key === "ArrowRight" && velocityX != -1){
        velocityY = 0;
        velocityX = 1;
    }
    Game()
}

controls.forEach((key) =>{
    key.addEventListener("click", () => changePosition({ key: key.dataset.key }))
})

const changeFoodPosition = ()=>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = ()=>{
    clearInterval(gameInterval)
    alert("Game Over, Press Ok to replay...")
    location.reload()
}

const Game = ()=>{
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    htmlMarkup += `<div class="snake" style="grid-area: ${snakeY} / ${snakeX}"></div>`

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]
    snakeX += velocityX;
    snakeY += velocityY;
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }
    if (snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++;

        high_score = score >= high_score ? score : high_score;

        localStorage.setItem("high_score", high_score);

        
    }
    for (let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if (i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
    scoreEle.innerHTML = `Score: ${score}`
    highScoreEle.innerHTML = `High Score: ${high_score}`
}

changeFoodPosition();
gameInterval = setInterval(Game, 125)
document.addEventListener("keydown", changePosition)