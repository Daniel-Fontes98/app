import { configureStore } from "@reduxjs/toolkit";
import certificateSlice from "~/features/certificate/certificateSlice";

export const store = configureStore({
  reducer: {
    certificate: certificateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
