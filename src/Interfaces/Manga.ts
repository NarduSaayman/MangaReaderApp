/* eslint-disable quotes */

interface Title {
  en: string;
}

interface AltTitle {
  en?: string;
  es?: string;
  fr?: string;
  ru?: string;
  id?: string;
  "zh-hk"?: string;
  zh?: string;
  ja?: string;
  ko?: string;
  ar?: string;
}

interface Description {
  en: string;
  ru: string;
}

interface Links {
  al: string;
  ap: string;
  bw: string;
  kt: string;
  mu: string;
  amz: string;
  cdj: string;
  ebj: string;
  mal: string;
  engtl: string;
}

interface Attributes {
  name: Title;
  description: any[];
  group: string;
  version: number;
}

interface Tag {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: any[];
}

interface Attributes2 {
  title: Title;
  altTitles: AltTitle[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year?: any;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
}

interface Relationship {
  id: string;
  type: string;
  related?: string;
}
interface Data {
  id: string;
  type: string;
  attributes: Attributes2;
  relationships: Relationship[];
}

export interface iManga {
  result: string;
  response: string;
  data: Data;
}
