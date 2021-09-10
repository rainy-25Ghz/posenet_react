import { load, Pose } from "@tensorflow-models/posenet";
import React, { useEffect, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import { draw, drawInit, init, pause } from "../Game/Game";
import { Button, Modal } from "antd";
interface Props{
  setPaused:(arg:boolean)=>void;
}
let pose: Pose | undefined = undefined;
export let updatePose: () => Promise<Pose>;
export const Posenet = ({setPaused}:Props) => {
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
    setPaused(true);
    setIsSucceedModalVisible(false);
    setFailModalVisible(false);
  };
  useEffect(() => {
    
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
    <div className="game">
      <div className="camera">
        <video id="video" width="240" style={{ transform: "scaleX(-1)" }}>
          Video stream not available.
        </video>
      </div>
      <canvas id="myCanvas" width="480" height="320"></canvas>
      <Modal
        className="succeed"
        visible={isSucceedModalVisible}
        onCancel={() => {
          setIsSucceedModalVisible(false);
        }}
        onOk={handleOk}
        footer={<Button onClick={handleOk}>OK</Button>}
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
        footer={<Button onClick={handleOk}>OK</Button>}
      >
        失败
      </Modal>
      
    </div>
  );
};
