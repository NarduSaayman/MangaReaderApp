export interface Relationship {
  id: string;
  type: string;
}

interface Attributes {
  description: string;
  volume: string;
  fileName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Data {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

export interface iCover {
  result: string;
  response: string;
  data: Data;
}
