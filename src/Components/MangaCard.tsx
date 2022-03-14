import React, { useEffect, useState, SetStateAction } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { iManga } from "../Interfaces/Manga";
import { fetchMangaByID, fetchMangaByIDPromise } from "../Services/MangaDexApi";

export default function MangaCard() {
  // const [getManga, setManga] = useState<iManga | null>();

  // const manga$ = fetchMangaByID(`32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`);

  // useEffect(() => {
  //   manga$.subscribe((manga: SetStateAction<iManga | null | undefined>) => {
  //     console.log(manga);
  //     console.log(getManga?.data.attributes.title.en);
  //     if (manga !== null && manga !== undefined) {
  //       setManga(manga);
  //     }
  //   });
  // }, []);

  const { status, error, data }: UseQueryResult<iManga, Error> = useQuery<
    iManga,
    Error
  >(`manga`, async () => {
    const res = await fetchMangaByIDPromise(
      `32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`,
    );
    return res?.json() as Promise<iManga>;
  });

  if (status === `loading`) {
    return <div>`Loading...`;</div>;
  }

  if (status === `error`) {
    return <div>{`An error has occurred: ${error?.message}`}</div>;
  }

  return (
    <div>
      <p className="whitespace-pre">{data?.data?.attributes?.title?.en}</p>
    </div>
  );
}
