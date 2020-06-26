import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { fetchPlayer } from './features/scores/playersSlice';

store.dispatch(fetchPlayer("Matrix"))
store.dispatch(fetchPlayer("TigerFever"))
store.dispatch(fetchPlayer("LaserBoots"))
store.dispatch(fetchPlayer("taisapan"))
store.dispatch(fetchPlayer("KiloRomeoHotel"))
store.dispatch(fetchPlayer("SadPandaEh"))
store.dispatch(fetchPlayer("DoWhileTrue"))
store.dispatch(fetchPlayer("Zorbak"))




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
