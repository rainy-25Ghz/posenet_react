import { Button } from "antd";
import React, { useState } from "react";
import "./App.css";
import { backgroundAudio, draw, pause } from "./Game/Game";
import { Posenet } from "./Posenet";
import "antd/dist/antd.css";
function App() {
  const [paused, setpaused] = useState(true);
  return (
    <div className="App">
      <Posenet setPaused={setpaused}></Posenet>
      <Button
        onClick={() => {
          if (!paused) {
            pause();
          } else {
            if(backgroundAudio){
              console.log(backgroundAudio)
              backgroundAudio.autoplay=true;
              backgroundAudio.play();
            }
            requestAnimationFrame(draw);
          }
          setpaused(!paused);
        }}
      >
        {paused ? `开始` : `暂停`}
      </Button>
    
    </div>
  );
}

export default App;
