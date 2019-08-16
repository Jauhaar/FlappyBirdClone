//Allows the rendering of graphics on the canvas.
var canvas = document.getElementById("GameBoard");
var ctx = canvas.getContext("2d");

//Starting position
var x = 100;
var birdPos = canvas.height/2;

var BirdSize = 20;

var fallSpeed = 2;
var jumpSpeed = 50;

var score = 0;

//Function to generate a random number within a min and max range
function Random(min, max)
{
    var randomNumber = Math.floor(Math.random() * (max - min) + min);

    return randomNumber;
}

//Event Handler for bird movement
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e)
{
    switch(e.key)
    {
        case "ArrowUp":
            birdPos -= jumpSpeed;
        break;
    }
}

function drawBird()
{
    ctx.beginPath();
    ctx.rect(x, birdPos - BirdSize, BirdSize,BirdSize);
    ctx.fillStyle = "white ";
    ctx.fill();
    ctx.closePath();
}

function drawScore()
{
    ctx.font = "30px Ariel";
    ctx.fillStyle = "red";
    ctx.fillText(score.toString(), 25,25);
}

//get random top
var topY = Random(25, canvas.height - 125);    

//get random from bottom
var bottomY = Random(topY, canvas.height - 100);

var pipePos = canvas.width;
var pipeSpeed = 1;

var xStart = canvas.width + 50;
var pipes = [];
for(var i = 0; i < 5; i++)
{
    var pipeWidth = 20;

    var tempTY = Random(25, canvas.height - 125);
    var tempBY = Random(topY, canvas.height - 100);
    
    pipes[i] = {x: xStart,
                width: pipeWidth,
                topHeight: tempTY,
                bottomHeight: canvas.height};

    xStart += 100;
}

function drawPipes(x, width, topHeight, bottomHeight)
{
    ctx.beginPath();
    ctx.rect(x, 0, width, topHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(x, topHeight + 100, width, bottomHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

//TEST
function drawPipesTest()
{
    ctx.beginPath();
    ctx.rect(pipePos, 0, 20, topY);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(pipePos, topY + 100, 20, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawGame()
{
    //Clears canvas after each frame refresh
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    //Draw flappy bird and score
    drawBird();

    //Draw pipes
    for(var i = 0; i < 5; i++)
    {
        //spawn pipes
        drawPipes(pipes[i].x, pipes[i].width, pipes[i].topHeight, pipes[i].bottomHeight);

        //Pipe Movement
        pipes[i].x -= pipeSpeed;

        //collision
        if(birdPos <= pipes[i].topHeight && x == pipes[i].x - (BirdSize - 5))
        {
            alert("Game Over!");
            document.location.reload(); 
        }
        else if(birdPos >= pipes[i].topHeight + 100 && x == pipes[i].x - (BirdSize - 5))
        {
            alert("Game Over!");
            document.location.reload(); 
        }

        //score
        if(pipes[i].x == x)
        {
            score++;
        }     
    }

    //Bird movement
    birdPos += fallSpeed;

    drawScore();

}
setInterval(drawGame, 20);