// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice'; 

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store; 

// VVV บรรทัดนี้คือจุดที่สร้าง RootState VVV
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;