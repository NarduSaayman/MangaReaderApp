/* eslint-disable no-use-before-define */
export interface IMangaChapterRoot {
  result: string;
  response: string;
  data: IMangaChapterData;
}

export interface IMangaChapterData {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

interface Relationship {
  id: string;
  type: string;
}

interface Attributes {
  volume: string;
  chapter: string;
  title: string;
  translatedLanguage: string;
  externalUrl?: any;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}
