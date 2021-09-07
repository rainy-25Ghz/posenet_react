import { load } from "@tensorflow-models/posenet";
import React, { useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import imgsrc from "./images.jpg";

export const Posenet = () => {
  useEffect(() => {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  const width = 320;    // We will scale the photo width to this
  let height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  let streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  

  function startup() {
    console.log('start');
    let video = document.getElementById('video') as HTMLVideoElement ;
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
   
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        console.log('canplay');
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
        video.width=width;
        video.height=height;
        canvas.width=width;
        canvas.height=height;
        streaming = true;
      }
    }, false);
  }
  window.addEventListener('load', startup, false);
  }, []);
  return (
    <>
      <div className="camera">
        <video id="video">Video stream not available.</video>
        <button id="startbutton">Take photo</button>
      </div>
      <canvas id="canvas"></canvas>
      <div className="output">
        <img id="photo" alt="The screen capture will appear in this box." />
      </div>
    </>
  );
};
