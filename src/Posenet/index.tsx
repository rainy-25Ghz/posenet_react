import { load, Pose } from "@tensorflow-models/posenet";
import React, { useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import imgsrc from "./images.jpg";
import { draw, init } from "../Game/Game";

let pose: Pose | undefined = undefined;
export let updatePose: () => Promise<Pose>;
export const Posenet = () => {
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
      
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
          alert('not supported');
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
            init();
            draw();
          }
        },
        false
      );
    }
    window.addEventListener("load", startup_posenet, false);
  }, []);
  return (
    <>
      <div className="camera">
        <video id="video" width="240" style={{ transform: "scaleX(-1)" }}>
          Video stream not available.
        </video>
      </div>
      <canvas id="myCanvas" width="480" height="320"></canvas>
    </>
  );
};
