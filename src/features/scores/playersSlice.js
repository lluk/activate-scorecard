import { createSlice } from '@reduxjs/toolkit';
import { getPlayerData } from '../../scores/playerData'
import { loadBadges } from './badgesSlice'
import { loadRooms } from './roomsSlice';

export const playerSlice = createSlice({
  name: 'players',
  initialState: {},
  reducers: {
    requestPlayer: (state, action) => {
      let key = action.payload.toLowerCase();
      state[key] = { "player_name": action.payload, "isLoading": true };
    },
    loadPlayer: (state, action) => {
      let key = action.payload.player_name.toLowerCase();
      delete state[key];
      state[key] = action.payload;
    },
    clearPlayers: (state, action) => {
      let keys = Object.keys(state);
      for (let i = 0; i < keys.length; i++) {
        delete state[keys[i]];
      }
    },
  },
});

export const { requestPlayer, loadPlayer, clearPlayers } = playerSlice.actions;

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

    // if(json) {
    //   loadPlayerData(dispatch, json);
    //   return;
    // }

    return fetch(`/api/${name}/winnipeg`)
    .then(response => response.json())
    .then(json => {
      loadPlayerData(dispatch, json);
    })
  }
}

function loadPlayerData(dispatch, json) {
  let playerData = json.data.player;
  dispatch(loadPlayer(playerData));

  let badgeData = json.data.location.badges;
  dispatch(loadBadges(badgeData));

  let roomData = json.data.location.rooms;
  dispatch(loadRooms(roomData));
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPlayers = state => state.players;

export default playerSlice.reducer;
