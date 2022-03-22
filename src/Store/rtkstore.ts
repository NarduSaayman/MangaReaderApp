import { configureStore } from "@reduxjs/toolkit";
import mangaListMangaReducer from "./mangaListSlice";

export const rtkstore = configureStore({
  reducer: {
    mangaListMangas: mangaListMangaReducer,
  },
});

export type AppDispatch = typeof rtkstore.dispatch;
export type RootState = ReturnType<typeof rtkstore.getState>;
