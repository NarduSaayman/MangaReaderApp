import { IMangaChapterData } from "../Interfaces/Chapter";
import { ICoverData } from "../Interfaces/Cover";
import { ICoverListDatum } from "../Interfaces/CoverList";
import { IMangaData } from "../Interfaces/Manga";
import { IMangaVolumes } from "../Interfaces/MangaVolumes";
import { IMangaPagesRoot } from "../Interfaces/Pages";

const MangadexUrl: string = `https://api.mangadex.org/`;

const fetchCreator = (url: string): any => {
  const response = fetch(`${MangadexUrl}${url}`)
    .then((res) => res.json())
    .then((res) => res);
  return response;
};

export const fetchCoverListPromise = (): Promise<ICoverListDatum[]> =>
  fetchCreator(`cover`).then((res: { data: ICoverListDatum[] }) => res.data);

export const fetchMangasPromise = (amount: number): Promise<IMangaData[]> =>
  fetchCreator(`manga?limit=${amount}`).then(
    (res: { data: IMangaData[] }) => res.data,
  );

export const fetchMangaByIDPromise = (id: string): Promise<IMangaData> =>
  fetchCreator(`manga/${id}`).then((res: { data: IMangaData }) => res.data);

export const fetchCoverByIDPromise = (id: string): Promise<ICoverData> =>
  fetchCreator(`cover/${id}`).then((res: { data: ICoverData }) => res.data);

export const fetchMangasByTitlePromise = (
  title: string,
  amount: number = 4,
): Promise<IMangaData[]> =>
  fetchCreator(`manga?title=${title}&limit=${amount}`).then(
    (res: { data: IMangaData[] }) => res.data,
  );

export const fetchMangaByTitlePromise = (
  title: string,
): Promise<IMangaData[]> =>
  fetchCreator(`manga?title=${title}&limit=1`).then(
    (res: { data: IMangaData[] }) => res.data,
  );

export const fetchMangaVolumesByIDPromise = (
  id: string,
): Promise<IMangaVolumes> =>
  fetchCreator(`manga/${id}/aggregate?translatedLanguage[]=en`);

export const fetchChapterByIDPromise = (
  id: string,
): Promise<IMangaChapterData> =>
  fetchCreator(`chapter/${id}`).then(
    (res: { data: IMangaChapterData }) => res.data,
  );

export const fetchChapterPagesByIDPromise = (
  id: string,
): Promise<IMangaPagesRoot> => fetchCreator(`at-home/server/${id}`);
