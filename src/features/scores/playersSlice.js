import { createSlice } from '@reduxjs/toolkit';
import { getPlayerData } from '../../scores/playerData'
import { loadBadges } from './badgesSlice'
import { loadGames } from './gamesSlice';
import { loadRooms } from './roomsSlice';

export const playerSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    requestPlayer: (state, action) => {
    },
    loadPlayer: (state, action) => {
      state.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.push(action.payload);
    },
    refreshPlayers: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { requestPlayer, loadPlayer, removePlayer, refreshPlayers } = playerSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export function fetchPlayer(name) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestPlayer(name))

    let json = getPlayerData(name);

    let playerData = json.data.player;
    dispatch(loadPlayer(playerData));

    let locationData = json.data.location;
    let badgeData = locationData.badges;
    dispatch(loadBadges(badgeData));

    let roomData = locationData.rooms;
    dispatch(loadRooms(roomData));

    let gameData = roomData.games;
    dispatch(loadGames(gameData));

    // return fetch(proxyurl + `https://scores.activate.ca/api/player/${name}`,
    // {
    //   method: 'GET',
    //   headers: { 
    //     'Content-Type': 'text/plain'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(json => dispatch(recievePlayer(name, json)))
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPlayers = state => state.players;

export default playerSlice.reducer;
