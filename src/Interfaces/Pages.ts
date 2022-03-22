/* eslint-disable no-use-before-define */
export interface IMangaPagesRoot {
  result: string;
  baseUrl: string;
  chapter: IChapterPages;
}

export interface IChapterPages {
  hash: string;
  data: string[];
  dataSaver: string[];
}
