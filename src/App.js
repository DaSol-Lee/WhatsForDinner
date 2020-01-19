import React, { Component } from 'react';
import './App.css';
// import Buttons from './Buttons';
import Inputs from './Inputs'
import logo from './images/stars.gif'


function App() {
  
  return (
    
    <div className="App" >     
    <div className="background">
      <header className="App-header"> 
      <img className="stars" src={logo} /> 
        What's for dinner?
      <img className="stars" src={logo} /> 
      </header>
      <header className="App-header2">
        <h3>
          Prepared by Rose's Kitchen
        </h3>
      </header>

      <Inputs />

    </div>
    </div>
    
  );
}



export default App;
