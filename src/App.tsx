import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Posenet } from './Posenet';

function App() {
  return (
    <div className="App">
     <Posenet></Posenet>
     {/* <canvas className="zdog-canvas1" width="320" height="320" style={{backgroundColor:`#fff4e8`}}></canvas>
     <canvas className="zdog-canvas2" width="320" height="320" style={{backgroundColor:`#fff4e8`}}></canvas> */}
    </div>
  );
}

export default App;
