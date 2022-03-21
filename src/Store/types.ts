/* eslint-disable no-unused-vars */
export enum mangaListState {
  READING = `reading`,
  COMPLETED = `completed`,
  DROPPED = `dropped`,
  PLAN_TO_READ = `plan to read`,
}

export enum mangaListMangaAction {
  ADD_MANGA = `ADD_MANGA`,
  SET_STATUS = `SET_STATUS`,
}

export type mangaListManga = {
  id: string;
  coverUrl: string;
  status: mangaListState;
};

export type ActionTypes =
  | {
      type: typeof mangaListMangaAction.ADD_MANGA;
      payload: { id: string; coverUrl: string };
    }
  | {
      type: typeof mangaListMangaAction.SET_STATUS;
      payload: { id: string; status: mangaListState };
    };
