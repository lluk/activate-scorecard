import { createSlice } from '@reduxjs/toolkit';

export const badgesSlice = createSlice({
  name: 'badges',
  initialState: {},
  reducers: {
    loadBadges: (state, action) => {
      for(var key in action.payload)
      {
        state[key] = action.payload[key];
      }
    }
  },
});

export const { loadBadges } = badgesSlice.actions;

export const selectBadges = state => state.badges;

export default badgesSlice.reducer;