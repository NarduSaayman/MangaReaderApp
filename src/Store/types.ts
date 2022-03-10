export enum RecentlyReadState {
  READING = `reading`,
  COMPLETED = `completed`,
  DROPPED = `dropped`,
}

export type RecentlyReadManga = {
  id: string;
  coverUrl: string;
  chapter: string;
  status: RecentlyReadState;
};

export enum RecentlyReadMangaAction {
  ADD_MANGA = `ADD_MANGA`,
  SET_STATUS = `SET_STATUS`,
}

export type ActionTypes =
  | {
      type: typeof RecentlyReadMangaAction.ADD_MANGA;
      payload: { id: string; coverUrl: string; chapter: string };
    }
  | {
      type: typeof RecentlyReadMangaAction.SET_STATUS;
      payload: { id: string; status: RecentlyReadState };
    };
