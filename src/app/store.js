import { configureStore } from '@reduxjs/toolkit';
import playersReducer from '../features/scores/playersSlice';
import badgesReducer from '../features/scores/badgesSlice';
import roomsReducer from '../features/scores/roomsSlice';

export default configureStore({
  reducer: {
    players: playersReducer,
    badges: badgesReducer,
    location: roomsReducer,
  },
});
