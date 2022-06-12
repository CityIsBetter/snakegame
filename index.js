tryagain = document.getElementById('reset');
tryagain.style.display = "none";
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakepart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;


let tilecount = 20;
let tilesize = canvas.width/tilecount - 2;

let applex = 5;
let appley = 5;

let headx = 10;
let heady = 10;
const snakeparts = [];
let taillength = 0;

let xvel = 0;
let yvel = 0;

let score = 0;

const gulp = new Audio("gulp.mp3")
const gameoversfx = new Audio("game over.wav")



function drawgame(){
    changesnakepos();
    let result = isgameover();
    if (result){
        return;
    }
    clearscreen();
    checkapplecol();
    drawapple();
    drawsnake();

    drawscore();
    setTimeout(drawgame,1000/speed);

}

function isgameover(){
    let gameover = false;

    //walls
    if (headx < 0){
        gameover = true;
    }
    else if (headx === tilecount){
        gameover = true;
    }
    else if (heady < 0){
        gameover = true;
    }
    else if (heady === tilecount){
        gameover = true;
    }

    for (let i= 0; i < snakeparts.length; i++){
        let part = snakeparts[i];
        if (part.x === headx && part.y === heady){
            gameover = true;
            break;
        }
    }
    if (gameover){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width/6.5, canvas.height/6.5);
        gameoversfx.play();
        tryagain.style.display = "";
    }
    return gameover;
}

function drawscore(){
    ctx.fillStyle = "White";
    ctx.font = "15px Verdana";
    ctx.fillText("score:" + score, canvas.width - 70, 15);
}

function clearscreen(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawsnake(){
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeparts.length; i++){
        let part = snakeparts[i];
        ctx.fillRect(part.x * tilecount, part.y * tilecount, tilesize, tilesize);
    }
    snakeparts.push(new snakepart(headx, heady));
    while (snakeparts.length > taillength){
        snakeparts.shift();

    }

    ctx.fillStyle = "orange";
    ctx.fillRect(headx * tilecount, heady * tilecount,tilesize,tilesize);
}



function changesnakepos(){
    headx = headx + xvel;
    heady = heady + yvel;
}

function drawapple(){
    ctx.fillStyle = "red";
    ctx.fillRect(applex * tilecount, appley * tilecount, tilesize, tilesize);
}

function checkapplecol(){
    if (applex == headx && appley == heady){
        applex = Math.floor(Math.random() * tilecount);
        appley = Math.floor(Math.random() * tilecount);
        taillength++;
        score++;
        gulp.play();
    }
}


document.body.addEventListener('keydown', keydown);

function keydown(event){
    //up
    if (event.keyCode == 38) {
        if (yvel == 1)
            return;
        yvel = -1;
        xvel = 0;
    }
    //down
    if (event.keyCode == 40) {
        if (yvel == -1)
            return;
        yvel = 1;
        xvel = 0;
    }
    //left
    if (event.keyCode == 37) {
        if (xvel == 1)
            return;
        yvel = 0;
        xvel = -1;
    }
    //right
    if (event.keyCode == 39) {
        if (xvel == -1)
            return;
        yvel = 0;
        xvel = 1;
    }

}


drawgame();
