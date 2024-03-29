var canvas = document.getElementById("pongCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 20;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;
var lives = 3;
var lives1 = 3;
var paddleHeight = 100;
var paddleWidth = 20;
var paddleY = (canvas.height - paddleHeight) / 2;
var paddleY1 = (canvas.height - paddleHeight) / 2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientY - canvas.offsetTop;
  if (
    relativeX > paddleHeight / 2 &&
    relativeX < canvas.height - paddleHeight / 2
  ) {
    paddleY1 = relativeX - paddleHeight / 2;
  }
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives1, 0, 20);
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.rect(x, y, ballRadius, ballRadius);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(0, paddleY1, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawLives();

  if (x + dx == ballRadius) {
    if (y > paddleY1 && y < paddleY1 + paddleHeight) {
      dx = -dx;
    } else {
      lives1--;
      if (!lives1) {
        alert("GAME OVER: Player 2 wins");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleY = (canvas.height - paddleHeight) / 2;
        paddleY1 = (canvas.height - paddleHeight) / 2;
      }
    }
  } else if (x + dx == canvas.width - ballRadius) {
    if (y > paddleY && y < paddleY + paddleHeight) {
      dx = -dx;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER: Player 1 wins");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleY = (canvas.height - paddleHeight) / 2;
        paddleY1 = (canvas.height - paddleHeight) / 2;
      }
    }
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (rightPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 7;
  } else if (leftPressed && paddleY > 0) {
    paddleY -= 7;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}
draw();
