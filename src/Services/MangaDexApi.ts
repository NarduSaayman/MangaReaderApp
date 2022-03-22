import { IMangaChapterData } from "../Interfaces/Chapter";
import { ICoverData } from "../Interfaces/Cover";
import { ICoverListDatum } from "../Interfaces/CoverList";
import { IMangaData } from "../Interfaces/Manga";
import { IMangaVolumes } from "../Interfaces/MangaVolumes";
import { IMangaListDatum } from "../Interfaces/MangaList";
import { IMangaPagesRoot } from "../Interfaces/Pages";

export const fetchCoverListPromise = (): Promise<ICoverListDatum[]> => {
  const response = fetch(`https://api.mangadex.org/cover`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}; // end function

export const fetchMangasPromise = (): Promise<IMangaListDatum[]> => {
  const response = fetch(`https://api.mangadex.org/manga`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}; // end function

export const fetchMangaByIDPromise = (id: string): Promise<IMangaData> => {
  const response = fetch(`https://api.mangadex.org/manga/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}; // end function

export const fetchCoverByIDPromise = (id: string): Promise<ICoverData> => {
  const response = fetch(`https://api.mangadex.org/cover/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}; // end function

export const fetchMangasByTitlePromise = (
  title: string,
  amount: number = 4,
): Promise<IMangaListDatum[]> => {
  const response = fetch(
    `https://api.mangadex.org/manga?title=${title}&limit=${amount}`,
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}; // end function

export const fetchMangaVolumesByIDPromise = (
  id: string,
): Promise<IMangaVolumes> => {
  const response = fetch(`https://api.mangadex.org/manga/${id}/aggregate?
  translatedLanguage[]=en`)
    .then((res) => res.json())
    .then((res) => res);
  return response;
}; // end function

export const fetchChapterByIDPromise = (
  id: string,
): Promise<IMangaChapterData> => {
  const response = fetch(`https://api.mangadex.org/chapter/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}; // end function

export const fetchChapterPagesByIDPromise = (
  id: string,
): Promise<IMangaPagesRoot> => {
  const response = fetch(`https://api.mangadex.org/at-home/server/${id}`)
    .then((res) => res.json())
    .then((res) => res);
  return response;
}; // end function
