//Allows the rendering of graphics on the canvas.
var canvas = document.getElementById("GameBoard");
var ctx = canvas.getContext("2d");

//Starting position
var x = 100; //bird x position (static)
var birdPos = canvas.height/2; //bird y position

var BirdSize = 20;

var fallSpeed = 2;
var jumpSpeed = 50;

var score = 0;

//For Pipes
var xStart = canvas.width + 5;
var pipeSpeed = 1;
var pipes = []; //Array to store the Object Pool

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

//Initial population of the Object Pool for the pipes
for(var i = 0; i < 5; i++) 
{
    var pipeWidth = 20;
    var tempTY = Random(25, canvas.height - 125);
    //var tempBY = Random(topY, canvas.height - 100);
    
    //Array stores JSON objects
    pipes[i] = {x: xStart,
                width: pipeWidth,
                topHeight: tempTY,
                bottomHeight: canvas.height};

    xStart += 100;
}

function drawPipes(x, width, topHeight, bottomHeight)
{
    //Top Pipe
    ctx.beginPath();
    ctx.rect(x, 0, width, topHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    //Bottom Pipe
    ctx.beginPath();
    ctx.rect(x, topHeight + 100, width, bottomHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawGame()
{
    //Clears canvas after each frame refresh
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    //Draw flappy bird
    drawBird();

    //Draw pipes
    for(var i = 0; i < 5; i++)
    {
        //Spawn pipes
        drawPipes(pipes[i].x, pipes[i].width, pipes[i].topHeight, pipes[i].bottomHeight);

        //Pipe Movement
        pipes[i].x -= pipeSpeed;        

        //Reuses pipes using Object Pooling
        for(var n = 0; n < 5; n++)
        {
            if(pipes[n].x == 0)
            {
                pipes[n].x = canvas.width;
                pipes[n].topHeight = Random(25, canvas.height - 125);
            }
        }

        //If bird falls out of screen
        if(birdPos >= canvas.height + BirdSize)
        {
            birdPos = canvas.height/2;
            alert("Game Over!" + "\n" + "Your Score: " + score.toString());
            document.location.reload();
        } 

        //Collision
        if(birdPos <= pipes[i].topHeight && x == pipes[i].x - (BirdSize - 5))
        {
            alert("Game Over!" + "\n" + "Your Score: " + score.toString());
            document.location.reload(); 
        }
        else if(birdPos >= pipes[i].topHeight + 100 && x == pipes[i].x - (BirdSize - 5))
        {
            alert("Game Over!" + "\n" + "Your Score: " + score.toString());
            document.location.reload(); 
        }

        //Score System
        if(pipes[i].x == x)
        {
            score++;
        }     
    }//End DrawPipes For Loop

    //Bird movement
    birdPos += fallSpeed;

    drawScore();
}
setInterval(drawGame, 20);