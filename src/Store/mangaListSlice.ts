import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rtkstore";
import { mangaListManga, mangaListState } from "./types";

const initialState: mangaListManga[] = [];

export const mangaListSlice = createSlice({
  name: `Recently Read Mangas`,
  initialState,
  reducers: {
    addManga: (
      state,
      action: PayloadAction<{ id: string; coverUrl: string }>,
    ) => [
      ...state,
      {
        id: action.payload.id,
        coverUrl: action.payload.coverUrl,
        status: mangaListState.READING,
      },
    ],
    setStatus: (
      state,
      action: PayloadAction<{ id: string; status: mangaListState }>,
    ) => {
      const { id, status } = action.payload;
      // eslint-disable-next-line no-confusing-arrow
      const updateStatus = (
        payloadStatus: mangaListState,
        newStatus: mangaListState,
      ) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        payloadStatus === newStatus ? mangaListState.READING : newStatus;

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

export const { addManga, setStatus } = mangaListSlice.actions;

export const selectedMangas = (state: RootState) => state.mangaListMangas;
export const selectedMangaByID = (state: RootState, id: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  state.mangaListMangas.find((manga: { id: string }) => manga.id === id);

export default mangaListSlice.reducer;
