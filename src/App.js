import React from "react";
import "./App.css";
import Editor from './component'

function App() {


  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", paddingTop:100}}>
      <div style={{width:"50%", height:"500px", }}>
        <Editor placeholder="<speak>Your text here</speak>"/>
      </div>
    </div>
  )
  
}

export default App;
