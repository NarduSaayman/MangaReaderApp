import { from, Observable } from "rxjs";
import { iCoverList } from "../Interfaces/CoverList";
import { iManga } from "../Interfaces/Manga";

export function getCoverList(): Observable<iCoverList> {
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
}

export function getMangas(): Observable<iManga[]> {
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

export function getMangaByID(id: string): Observable<iManga> {
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

export function getMangasByTitle(title: string): Observable<iManga[]> {
  return from(
    fetch(`https://api.mangadex.org/manga?title=${title}`)
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
