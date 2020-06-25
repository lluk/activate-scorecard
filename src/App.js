import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { Scores } from './features/scores/Scores';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Scores />
      </header>
    </div>
  );
}

export default App;
