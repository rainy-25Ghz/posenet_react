import React, { useState } from "react";
import "./App.css";
import { Posenet } from "./Posenet";
import "antd/dist/antd.css";
function App() {
  const [paused, setpaused] = useState(true);
  return (
    <div className="App">
      <Posenet setPaused={setpaused}></Posenet>
    </div>
  );
}

export default App;
