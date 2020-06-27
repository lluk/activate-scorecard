import React from 'react';
// import logo from './logo.svg';
import store from './app/store';
import { fetchPlayer, clearPlayers } from './features/scores/playersSlice';
import { Players } from './features/scores/Players';
import './App.css';

import queryString from 'query-string';

function App() {
  return (
    <div className="App">
        <PlayersInput />
        <Players />
    </div>
  );
}

class PlayersInput extends React.Component {
  constructor(props) {
    super(props);

    let initialState;
    initialState = initialState ?? queryString.parse(window.location.search).players;
    initialState = initialState ?? localStorage.getItem("players");
    initialState = initialState ?? "";

    this.state = { input: initialState };
  };

  componentDidMount() {
    if(this.state.input.length > 0) {
      this.handleSubmit();
    }
  }

  updateInput = input => {
    this.setState({input});
  };

  handleSubmit = () => {
    store.dispatch(clearPlayers());

    localStorage.setItem("players", this.state.input);

    var players = this.state.input.split(",");
    for(let i=0; i < players.length; i++) {
      let player = players[i];
      console.log(player);
      player = player.trim();
      store.dispatch(fetchPlayer(player));
    }
  };

  render() {
    return(
      <div className="PlayerInput">
        <input 
          value={this.state.input} 
          placeholder={'Enter player name(s), eg. Matrix, TigerFever, LaserBoots'}
          onChange={e => this.updateInput(e.target.value)} 
          onKeyDown={e => {if(e.key === 'Enter') this.handleSubmit()}}
        />
        <button onClick={e => this.handleSubmit()}>View Scorecard</button>
      </div>
    );
  }
}

export default App;
