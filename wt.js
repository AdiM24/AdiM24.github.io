
var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 7;

var paddleHeight = 10;
var paddleWidth = 75;
var paddlePosition = (canvas.width - paddleWidth)/2;

var leftKey = false;
var rightKey = false;

var brickRow = 6;
var brickColumn = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

var score = 0;

var red = 0;
var green = 0;
var blue = 255;

var sp = 10;


for(c = 0; c<brickColumn; c++){
	bricks[c] = [];
	for(r = 0; r<brickRow; r++) {
		bricks[c][r] = { x:0, y:0, status:1};
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keepScore(){

	ctx.font = "16px Arial";
	ctx.fillStyle = "Black";
	ctx.fillText("Score: " + score, 8, 20);

}



function collision() {

	for(c = 0; c < brickColumn; c++){
		for(r = 0; r < brickRow; r++){

			
			if(bricks[c][r].status == 1){
				if(x >= bricks[c][r].x && x <= bricks[c][r].x + brickWidth && y >= bricks[c][r].y && y <= bricks[c][r].y + brickHeight){

					dy = -dy;
					bricks[c][r].status = 0;

					red = Math.floor(Math.random()*255);
					green = Math.floor(Math.random()*255);
					blue = Math.floor(Math.random()*255);


			
					score ++;

					sp -= 1;

					console.log(sp);
					if(score == brickRow * brickColumn){
						alert("Congratulations! You win!");
						document.location.reload();
	                }
	            }
	        }
	    }
	}
}


function drawBrick(){
	
	for(c = 0; c < brickColumn; c++){

		for(r = 0; r < brickRow; r++){

			if(bricks[c][r].status ==1){
				var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight+ brickPadding)) + brickOffsetTop;

				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;

				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "Blue";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
  
}


function keyDownHandler(e){
	if (e.keyCode == 39){
		rightKey = true;
	}
	else if(e.keyCode == 37){
		leftKey = true;
	}
}


function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightKey = false;
    }
    else if(e.keyCode == 37) {
        leftKey = false;
    }
}


function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "rgb("+red+","+green+","+blue+")";
	ctx.fill();
	ctx.closePath();

}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddlePosition, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "Blue";
	ctx.fill();
	ctx.closePath();
}

function draw(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();

	drawPaddle();

	drawBrick();

	collision();

	keepScore();



	if(y + dy <= ballRadius){

		dy = - dy;


	}
	else if(y + dy >= canvas.height-ballRadius) {


        if(x >= paddlePosition && x <= paddlePosition + paddleWidth) {
            dy = -dy;
        }
   
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }

	if( x + dx >= canvas.width - ballRadius || x + dx <= ballRadius){

		dx = -dx;

	}

	if(rightKey && paddlePosition < canvas.width - paddleWidth) {

		paddlePosition += 7;

	}

	else if(leftKey && paddlePosition > 0){

		paddlePosition -= 7;

	}

	x += dx;
	y += dy;
}

setInterval(draw, 10);


