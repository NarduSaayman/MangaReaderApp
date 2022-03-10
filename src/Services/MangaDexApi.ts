import { from, Observable } from "rxjs";
import { iCoverList } from "../Interfaces/CoverList";
import { iManga } from "../Interfaces/Manga";

export function fetchCoverList(): Observable<iCoverList> {
  return from(
    fetch(`https://api.mangadex.org/cover`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res?.json() as Promise<iCoverList>;
      })
      .then((data: iCoverList) => data)
      .catch((err) => {
        throw new Error(err.toString());
      }),
  ); // end from
} // end function

export function fetchMangas(): Observable<iManga[]> {
  return from(
    fetch(`https://api.mangadex.org/manga`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res?.json() as Promise<iManga[]>;
      })
      .then((data: iManga[]) => data)
      .catch((err) => {
        throw new Error(err.toString());
      }),
  ); // end from
} // end function

export function fetchMangaByID(id: string): Observable<iManga> {
  return from(
    fetch(`https://api.mangadex.org/manga/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res?.json() as Promise<iManga>;
      })
      .then((data: iManga) => data)
      .catch((err) => {
        throw new Error(err.toString());
      }),
  ); // end from
} // end function

export function fetchMangaByIDPromise(id: string): Promise<Response> {
  return fetch(`https://api.mangadex.org/manga/${id}`);
} // end function

export function fetchMangasByTitle(
  title: string,
  amount: number = 4,
): Observable<iManga[]> {
  return from(
    fetch(`https://api.mangadex.org/manga?title=${title}&limit=${amount}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res?.json() as Promise<iManga[]>;
      })
      .then((data: iManga[]) => data)
      .catch((err) => {
        throw new Error(err.toString());
      }),
  ); // end from
} // end function
