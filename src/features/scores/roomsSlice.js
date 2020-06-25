import { createSlice } from '@reduxjs/toolkit';

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: {},
    games: {},
    levels: {},
  },
  reducers: {
    loadRooms: (state, action) => {
      for(let key in action.payload)
      {
        let room = action.payload[key];
        state.rooms[key] = room;

        for(let key in room.games)
        {
          let game = room.games[key];
          state.games[key] = game;

          for(let key in game.levels)
          {
            let level = game.levels[key];
            state.levels[level.id] = level;
          }
        }
      }
    }
  },
});

export const { loadRooms } = roomsSlice.actions;

export const selectRooms = state => state.location.rooms;
export const selectGames = state => state.location.games;
export const selectLevels = state => state.location.levels;


export default roomsSlice.reducer;