/* eslint-disable quotes */
interface Title {
  en: string;
}

interface AltTitles2 {
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
interface AltTitles3 {
  en?: string;
  vi?: string;
}
interface AltTitles4 {
  en?: string;
  fr?: string;
  ja?: string;
  zh?: string;
  ko?: string;
}

interface AltTitles5 {
  ja?: string;
  en?: string;
}

interface Description2 {
  en: string;
  ru: string;
}

interface Link {
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

interface Links2 {
  al: string;
  ap: string;
  kt: string;
  mu: string;
  ebj: string;
  mal: string;
}

interface Links3 {
  al: string;
  ap: string;
  bw: string;
  kt: string;
  mu: string;
  nu: string;
  amz: string;
  ebj: string;
  mal: string;
}

interface Links5 {
  raw: string;
}

interface Links6 {
  mu: string;
}

interface Links7 {
  al: string;
  ap: string;
  kt: string;
  mu: string;
  mal: string;
}

interface Links8 {
  al: string;
  ap: string;
  kt: string;
  mu: string;
  amz: string;
  mal: string;
}

interface Attributes {
  name: Title;
  description: any[];
  group: string;
  version: number;
}

export interface Tag {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: any[];
}
interface Attributes2 {
  title: Title;
  altTitles: (Title | AltTitles2 | AltTitles3 | AltTitles4 | AltTitles5)[];
  description: Title | Description2 | any[];
  isLocked: boolean;
  links: Link | Links2 | Links3 | any[] | Links5 | Links6 | Links7 | Links8;
  originalLanguage: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: string;
  status: string;
  year?: number;
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

export interface IMangaListDatum {
  id: string;
  type: string;
  attributes: Attributes2;
  relationships: Relationship[];
}

export interface IMangaList {
  result: string;
  response: string;
  data: IMangaListDatum[];
  limit: number;
  offset: number;
  total: number;
}
