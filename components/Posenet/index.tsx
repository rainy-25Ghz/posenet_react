import { load, Pose } from "@tensorflow-models/posenet";
import { useEffect, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import { Modal } from "antd";
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
let modal: (succeed: boolean) => void;
export let hitAudio: HTMLAudioElement | null;
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
    backgroundAudio = new Audio( '/Assets/BGM.mp3');
  }
  if (!hitAudio) {
    hitAudio = new Audio('/Assets/hit.wav');
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
const imageFromPath = function (src: string) {
  let img = new Image();
  img.src = src;
  return img;
} 

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1) {
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
          if (score === brickRowCount * brickColumnCount) {
            modal(true);
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.drawImage(imageFromPath( '/Assets/ball.png'), x-ballRadius, y-ballRadius);
  ctx.closePath();
  
}
function drawPaddle() {
  ctx.beginPath();
  /*ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  console.log(paddleWidth + ' ' + paddleHeight)
  ctx.fillStyle = "#0095DD";
  ctx.fill();*/
  ctx.drawImage(imageFromPath( '/Assets/paddle.png'), paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.closePath();
}
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        /*ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        var img = new Image();
        img.src =  + '/Assets/brick1.png';
        img.onload = function () {
          var ptrn = ctx.createPattern(img, 'repeat') as CanvasPattern;
        }
        ctx.closePath();*/
        ctx.drawImage(imageFromPath('/Assets/brick1.png'), brickX, brickY, brickWidth, brickHeight);
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
let backImage ;

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
    if (Math.abs((x + 10) - (paddleX + paddleWidth/2)) < (10 + paddleWidth)/2 && Math.abs((y + 10) - (canvas.height-paddleHeight + paddleHeight/2)) < (10 + paddleHeight)/2) {
      dy = -dy;
    } else {
      lives--;
      if (lives === 0) {
        lives = 0;
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

let pose: Pose | undefined = undefined;
export let updatePose: () => Promise<Pose>;
export const Posenet = () => {
  const [paused, setpaused] = useState(true);
  const [isSucceedModalVisible, setIsSucceedModalVisible] = useState(false);
  const [isFailModalVisible, setFailModalVisible] = useState(false);
  const show = (succeed: boolean) => {
    if (succeed) {
      setIsSucceedModalVisible(true);
      return;
    } else {
      setFailModalVisible(true);
    }
  };

  const handleOk = () => {
    init(show);
    pause();
    setpaused(true);
    setIsSucceedModalVisible(false);
    setFailModalVisible(false);
  };
  useEffect(() => {
    backImage= new Image();
backImage.src =  '/Assets/background.jpg';
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    let streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    async function startup_posenet() {
      console.log("start");
      let net = await load();

      let video = document.getElementById("video") as HTMLVideoElement;
      video.setAttribute("playsinline", "true");
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" }, audio: false })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
          alert("not supported");
        });

      video.addEventListener(
        "canplay",
        function (ev) {
          if (!streaming) {
            console.log("canplay");
            streaming = true;
            updatePose = async () => {
              pose = await net.estimateSinglePose(video, {
                flipHorizontal: true,
              });
              console.log(pose);
              return pose;
            };
            init(show);
            drawInit();
            // console.log('start draw!');
            // requestAnimationFrame(draw);
          }
        },
        false
      );
    }
    window.addEventListener("load", startup_posenet, false);
  }, []);

 

  return (
    <div className="main-screen">
      <div className="left"></div>
      <div className="header">
        <img
          src= "/Assets/title.png"
          width="90%"
          height="auto"
          alt="PoseNet 打砖块"
        />
      </div>
      <canvas id="myCanvas" width="480" height="320"></canvas>
      <div className="controls">
        <div className="control-buttons">
          <button
            style={{
              backgroundColor:'lightgray',
              backgroundImage: "/Assets/OKbutton.png",
            }}
            onClick={() => {
              if (!paused) {
                pause();
              } else {
                if (backgroundAudio) {
                  console.log(backgroundAudio);
                  backgroundAudio.autoplay = true;
                  backgroundAudio.play();
                }
                requestAnimationFrame(draw);
              }
              setpaused(!paused);
            }}
          >
            {paused ? `开始` : `暂停`}
          </button>
        </div>
        <div className="camera">
          <video id="video" width="240" style={{ transform: "scaleX(-1)" }}>
            视频流不可用。
          </video>
        </div>
      </div>
      <div className="right"></div>
      <Modal
        className="title"
        visible={isSucceedModalVisible}
        onCancel={() => {
          setIsSucceedModalVisible(false);
        }}
        onOk={handleOk}
        footer={<button onClick={handleOk}>OK</button>}
      >
        获胜
      </Modal>
      <Modal
        className="failed"
        visible={isFailModalVisible}
        onCancel={() => {
          setFailModalVisible(false);
        }}
        onOk={handleOk}
        footer={<button onClick={handleOk}>OK</button>}
      >
        失败
      </Modal>
    </div>
  );
};
