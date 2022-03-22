/* eslint-disable no-unused-vars */
export enum mangaListState {
  READING = `Reading`,
  COMPLETED = `Completed`,
  DROPPED = `Not Interested`,
  PLAN_TO_READ = `Plan To Read`,
}

export enum mangaListMangaAction {
  ADD_MANGA = `ADD_MANGA`,
  SET_STATUS = `SET_STATUS`,
}

export type mangaListManga = {
  id: string;
  title: string;
  coverURL: string;
  status: mangaListState;
};

export type ActionTypes =
  | {
      type: typeof mangaListMangaAction.ADD_MANGA;
      payload: {
        id: string;
        title: string;
        coverUrl: string;
        status: mangaListState;
      };
    }
  | {
      type: typeof mangaListMangaAction.SET_STATUS;
      payload: { id: string; status: mangaListState };
    };
