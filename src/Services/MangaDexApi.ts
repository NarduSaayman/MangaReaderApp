import { ICoverData } from "../Interfaces/Cover";
import { ICoverListDatum } from "../Interfaces/CoverList";
import { IMangaData } from "../Interfaces/Manga";
import { IMangaListDatum } from "../Interfaces/MangaList";

export function fetchCoverListPromise(): Promise<ICoverListDatum[]> {
  const response = fetch(`https://api.mangadex.org/cover`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
} // end function

export function fetchMangasPromise(): Promise<IMangaListDatum[]> {
  const response = fetch(`https://api.mangadex.org/manga`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
} // end function

export function fetchMangaByIDPromise(id: string): Promise<IMangaData> {
  const response = fetch(`https://api.mangadex.org/manga/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
} // end function

export function fetchCoverByIDPromise(id: string): Promise<ICoverData> {
  const response = fetch(`https://api.mangadex.org/cover/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
} // end function

export function fetchMangasByTitlePromise(
  title: string,
  amount: number = 4,
): Promise<IMangaListDatum[]> {
  const response = fetch(
    `https://api.mangadex.org/manga?title=${title}&limit=${amount}`,
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
} // end function