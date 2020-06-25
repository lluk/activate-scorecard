import { createSlice } from '@reduxjs/toolkit';

export const gamesSlice = createSlice({
  name: 'games',
  initialState: {},
  reducers: {
    loadGames: (state, action) => {
      for(var key in action.payload)
      {
        state[key] = action.payload[key];
      }
    }
  },
});

export const { loadGames } = gamesSlice.actions;

export const selectGames = state => state.games;

export default gamesSlice.reducer;