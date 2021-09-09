import { Button } from 'antd';
import React from 'react';
import './App.css';
import { pause } from './Game/Game';
import { Posenet } from './Posenet';
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App">
     <Posenet></Posenet>
     <Button onClick={()=>{
        pause();
      }}>暂停</Button>
     {/* <canvas className="zdog-canvas1" width="320" height="320" style={{backgroundColor:`#fff4e8`}}></canvas>
     <canvas className="zdog-canvas2" width="320" height="320" style={{backgroundColor:`#fff4e8`}}></canvas> */}
    </div>
  );
}

export default App;
