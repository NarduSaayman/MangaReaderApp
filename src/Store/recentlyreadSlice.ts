import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rtkstore";
import { RecentlyReadManga, RecentlyReadState } from "./types";

const initialState: RecentlyReadManga[] = [];

export const recentlyReadMangaSlice = createSlice({
  name: `Recently Read Mangas`,
  initialState,
  reducers: {
    addManga: (
      state,
      action: PayloadAction<{ id: string; coverUrl: string; chapter: string }>,
    ) => [
      ...state,
      {
        id: action.payload.id,
        coverUrl: action.payload.id,
        chapter: action.payload.chapter,
        status: RecentlyReadState.READING,
      },
    ],
    setStatus: (
      state,
      action: PayloadAction<{ id: string; status: RecentlyReadState }>,
    ) => {
      const { id, status } = action.payload;
      // eslint-disable-next-line no-confusing-arrow
      const updateStatus = (
        payloadStatus: RecentlyReadState,
        newStatus: RecentlyReadState,
      ) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        payloadStatus === newStatus ? RecentlyReadState.READING : newStatus;

      return [
        ...state.map(
          // eslint-disable-next-line no-confusing-arrow
          (manga) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            manga.id !== id
              ? manga
              : { ...manga, status: updateStatus(manga.status, status) },
          // eslint-disable-next-line function-paren-newline
        ),
      ];
    },
  },
});

export const { addManga, setStatus } = recentlyReadMangaSlice.actions;

export const selectedMangas = (state: RootState) => state.recentlyReadMangas;
export const selectedMangaByID = (state: RootState, id: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  state.recentlyReadMangas.find((manga: { id: string }) => manga.id === id);

export default recentlyReadMangaSlice.reducer;
