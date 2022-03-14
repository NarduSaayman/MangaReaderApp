import { configureStore } from "@reduxjs/toolkit";
import recentlyReadMangaReducer from "./recentlyreadSlice";

export const rtkstore = configureStore({
  reducer: {
    recentlyReadMangas: recentlyReadMangaReducer,
  },
});

export type AppDispatch = typeof rtkstore.dispatch;
export type RootState = ReturnType<typeof rtkstore.getState>;
