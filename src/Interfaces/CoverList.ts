interface Relationship {
  id: string;
  type: string;
}

interface Attributes {
  description: string;
  volume?: string;
  fileName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface ICoverListDatum {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

export interface ICoverList {
  result: string;
  response: string;
  data: ICoverListDatum[];
  limit: number;
  offset: number;
  total: number;
}
