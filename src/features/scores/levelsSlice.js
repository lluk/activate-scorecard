import { createSlice } from '@reduxjs/toolkit';

export const levelsSlice = createSlice({
  name: 'levels',
  initialState: {},
  reducers: {
    loadLevels: (state, action) => {
      for(var key in action.payload)
      {
        state[key] = action.payload[key];
      }
    }
  },
});

export const { loadLevels } = levelsSlice.actions;

export const selectLevels = state => state.levels;

export default levelsSlice.reducer;