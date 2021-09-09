import { Pose } from "@tensorflow-models/posenet";
import { updatePose } from "../Posenet";
import background from "./background.jpg";
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let ballRadius: number;
let x: number;
let y: number;
let dx: number;
let dy: number;
let paddleHeight: number;
let paddleWidth: number;
let paddleX: number;
let rightPressed: boolean;
let leftPressed: boolean;
let brickRowCount: number;
let brickColumnCount: number;
let brickWidth: number;
let brickHeight: number;
let brickPadding: number;
let brickOffsetLeft: number;
let brickOffsetTop: number;
let score: number;
let lives: number;
let bricks: any[];
let video: HTMLVideoElement;
let id: number;
let interval = 33;
let modal: (succeed: boolean) => void;
export let hitAudio:HTMLAudioElement | null;
export let backgroundAudio: HTMLAudioElement | null;
export const pause = () => {
  if (backgroundAudio) {
    backgroundAudio.pause();
  }
  console.log(id);
  cancelAnimationFrame(id);
};

export const init = (callback: (succeed: boolean) => void) => {
  modal = callback;
  canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  video = document.getElementById("video") as HTMLVideoElement;
  if (!backgroundAudio) {
    backgroundAudio = new Audio("/BGM.mp3");
  }
  if(!hitAudio){
    hitAudio=new Audio("/hit.wav");
  }
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ballRadius = 10;
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleHeight = 10;
  paddleWidth = 75;
  paddleX = (canvas.width - paddleWidth) / 2;
  rightPressed = false;
  leftPressed = false;
  brickRowCount = 5;
  brickColumnCount = 3;
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 30;
  brickOffsetLeft = 30;
  score = 0;
  lives = 3;
  bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
};
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          hitAudio?.play();
          score++;
          if (score == brickRowCount * brickColumnCount) {
            modal(true);
            // alert("YOU WIN, CONGRATS!");
            // document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
let backImage = new Image();
backImage.src = background;
export function drawInit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backImage, 0, 0);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
}
export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backImage, 0, 0);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        // alert("GAME OVER");
        // document.location.reload();
        modal(false);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  updatePose().then((pose) => {
    if (pose.keypoints[0].score > 0.6)
      paddleX =
        (pose.keypoints[0].position.x / video.width) * canvas.width * 1.1;
  });
  id = requestAnimationFrame(draw);
}
