let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;
let highestscore = 0;
const scoreDisplay = document.querySelector('#score');
const highestscoreDisplay = document.querySelector('#highscore');
const levelDisplay = document.querySelector('#level');
const startBtn = document.querySelector('#gamestart');


function criarBG() {//cria o background do jogo num quadrado 16*16
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {//cria a cobrinha no centro do BG
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){// cria a comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


document.addEventListener('keydown', update);//pega o movimento da cobrinha

function update (event){//faz o movimento da cobrinha e não permite que ela volte
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction ="up";
    if(event.keyCode == 39 && direction != "left") direction ="right";
    if(event.keyCode == 40 && direction != "up") direction ="down";
}


function IniciarJogo() {

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; // comandos para a cobrinha n sair da tela
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
                if(score > highestscore){
                    highestscore = score;
                    highestscoreDisplay.innerHTML = highestscore
                };
            score = 0;    
            alert("Game Over");
            snake.splice(1);
            snake[0] = {
                x: 8 * box,
                y: 8 * box
            };
 
        }
    } //game over


    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction =="up") snakeY -=box;
    if(direction =="down") snakeY +=box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();

    } else {
        food.x= Math.floor(Math.random() * 15 + 1) * box;
        food.y= Math.floor(Math.random() * 15 + 1) * box;
        score = score + 1;
        scoreDisplay.innerHTML = score
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}
var jogo = setInterval(IniciarJogo, 200); // reinicia o BG e a cobrinha a cada 100 ms, para o jogo nao travar


