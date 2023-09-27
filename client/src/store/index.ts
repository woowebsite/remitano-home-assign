import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "@/store/videoSlice";
import userSlice from "@/store/userSlice";
import notifySlice from "./notifySlice";

export const store = configureStore({
  reducer: {
    video: videoSlice,
    user: userSlice,
    notify: notifySlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
