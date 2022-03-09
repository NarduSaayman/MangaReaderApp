/* eslint-disable quotes */
interface Title {
  en: string;
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

interface Relationship {
  id: string;
  type: string;
  related?: string;
}

interface Links {
  al: string;
  ap: string;
  bw?: string;
  kt?: string;
  mu: string;
  amz?: string;
  ebj?: string;
  mal: string;
  engtl: string;
  raw?: string;
  cdj?: string;
}

interface AltTitle {
  ja?: string;
  id?: string;
  ru?: string;
  en?: string;
  "ja-ro"?: string;
  ne?: string;
  uk?: string;
  "zh-hk"?: string;
  "zh-ro"?: string;
  "es-la"?: string;
  ro?: string;
  ar?: string;
  vi?: string;
  fa?: string;
  th?: string;
  zh?: string;
}

interface Description {
  en: string;
  pt?: string;
  ru?: string;
  fr?: string;
  ja?: string;
  "es-la"?: string;
  "pt-br"?: string;
}
interface Attributes2 {
  title: Title;
  altTitles: AltTitle[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume?: string;
  lastChapter: string;
  publicationDemographic: string;
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

interface Datum {
  id: string;
  type: string;
  attributes: Attributes2;
  relationships: Relationship[];
}

export interface iManga {
  result: string;
  response: string;
  data: Datum[];
  limit: number;
  offset: number;
  total: number;
}
