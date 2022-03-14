/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
export interface IMangaVolumesRoot {
  result: string;
  volumes: IMangaVolumes;
}

export interface IMangaVolumes {
  volumes: { [key: number]: Volume };
}

interface Volume {
  volume: string;
  count: number;
  chapters: { [key: number]: Chapter };
}

interface Chapter {
  chapter: string;
  id: string;
  others: string[];
  count: number;
}
