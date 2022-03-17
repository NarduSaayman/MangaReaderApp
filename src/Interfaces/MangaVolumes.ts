/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
export interface IMangaVolumesRoot {
  result: string;
  volumes: IMangaVolumes;
}

export interface IMangaVolumes {
  volumes: IVolume[];
}

export interface IVolume {
  volume: string;
  count: number;
  chapters: IChapter[];
}

export interface IChapter {
  chapter: string;
  id: string;
  others: string[];
  count: number;
}
